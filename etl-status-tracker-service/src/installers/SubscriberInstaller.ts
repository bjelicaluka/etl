import { Container, inject, injectable } from "inversify";
import { IInstaller } from "../contracts/IInstaller";
import { PubSubProvider, INamespaceProvider } from "isobarot";
import { AMQP_CONFIG } from "../config";
import { ETL_STATUS_EXCHANGE } from "./PublisherInstaller";

type State = {
  publishedCount: number,
  processedCount: number,
}

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

    const states: { [key: string]: State } = {};

    const createStateIfNotExists = (transformationId: string) => {
      if (!states[transformationId]) {
        states[transformationId] = {
          publishedCount: 0,
          processedCount: 0,
        }
      }
    }

    const eventHandlers = {
      "Liveness": (namespaceProvider: INamespaceProvider, data: any) => {
        namespaceProvider.getNamespace('etl-events').emit('liveness', JSON.stringify(data));
        console.log("Liveness", data);
      },
      "StreamPublished": (namespaceProvider: INamespaceProvider, data: any) => {
        createStateIfNotExists(data.transformationId);
        states[data.transformationId].publishedCount += 1; 

        namespaceProvider.getNamespace('etl-events').emit('process-status', JSON.stringify(states[data.transformationId]));
        console.log("StreamPublished", data);
      },
      "StreamProcessed": (namespaceProvider: INamespaceProvider, data: any) => {
        createStateIfNotExists(data.transformationId);
        states[data.transformationId].processedCount += 1; 

        namespaceProvider.getNamespace('etl-events').emit('process-status', JSON.stringify(states[data.transformationId]));
        console.log("StreamProcessed", data);
      },
      "ProcessDone": (namespaceProvider: INamespaceProvider, data: any) => {
        delete states[data.transformationId];
        namespaceProvider.getNamespace('etl-events').emit('process-done', JSON.stringify(data));
        console.log("ProcessDone", data);
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