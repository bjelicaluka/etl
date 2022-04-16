import { Container, inject, injectable } from "inversify";
import { IInstaller } from "../contracts/IInstaller";
import { PubSubProvider, INamespaceProvider } from "isobarot";
import { AMQP_CONFIG } from "../config";
import { ETL_STATUS_EXCHANGE } from "./PublisherInstaller";
import { TransformationStateHandler } from "../TransformationStateHandler";

@injectable()
export class SubscriberInstaller implements IInstaller {

  constructor(@inject("AppContainer") private appContainer: Container) { }

  async install(): Promise<void> {
    const pubSubProvider = new PubSubProvider(AMQP_CONFIG);
    const queue = 'etl-status-queue';
    const exchange = ETL_STATUS_EXCHANGE;
    
    const subscriber = await pubSubProvider.initSubscriber();

    await subscriber.assertExchange(exchange, 'fanout', true);
    await subscriber.assertQueue(queue, true);
    await subscriber.bindQueue(queue, exchange, '');

    const eventHandlers = {
      "Liveness": (namespaceProvider: INamespaceProvider, data: any) => {
        if(TransformationStateHandler.states[data.transformationId])
          TransformationStateHandler.states[data.transformationId].totalCount = data.totalCount;
        namespaceProvider.getNamespace('etl-events').emit('liveness', JSON.stringify(data));
        console.log("Liveness", data);
      },
      "StreamPublished": (namespaceProvider: INamespaceProvider, data: any) => {
        TransformationStateHandler.createStateIfNotExists(data.transformationId);
        TransformationStateHandler.states[data.transformationId].publishedCount += 1; 
        TransformationStateHandler.states[data.transformationId].totalPublishTime += data.time; 

        namespaceProvider.getNamespace('etl-events').emit('process-status', JSON.stringify({
          transformationId: data.transformationId,
          stream: data.stream,
          status: TransformationStateHandler.states[data.transformationId]
        }));
        console.log("StreamPublished", data);
      },
      "StreamProcessed": (namespaceProvider: INamespaceProvider, data: any) => {
        TransformationStateHandler.createStateIfNotExists(data.transformationId);
        TransformationStateHandler.states[data.transformationId].processedCount += 1;
        TransformationStateHandler.states[data.transformationId].totalProcessTime += data.time; 

        namespaceProvider.getNamespace('etl-events').emit('process-status', JSON.stringify({
          transformationId: data.transformationId,
          results: data.results,
          status: TransformationStateHandler.states[data.transformationId]
        }));
        console.log("StreamProcessed", data);
      },
    }

    subscriber.consume(queue, (messageString: string) => {
      try {
        const namespaceProvider = this.appContainer.get<INamespaceProvider>("INamespaceProvider");
        const event = JSON.parse(messageString);
        if (!Object.keys(eventHandlers).includes(event.type)) return;
  
        eventHandlers[event.type](namespaceProvider, event);
      } catch (error) {
        console.log(`Error when consuming a message in Subscriber.`, error);        
      }
    }, true);
  }

}