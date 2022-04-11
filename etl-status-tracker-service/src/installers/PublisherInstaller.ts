import { Container, inject, injectable } from "inversify";
import { IInstaller } from "../contracts/IInstaller";
import { Publisher, PubSubProvider } from "isobarot";
import { AMQP_CONFIG } from "../config";

export const ETL_STATUS_EXCHANGE = 'etl-status-stream';

@injectable()
export class PublisherInstaller implements IInstaller {

  constructor(@inject("AppContainer") private appContainer: Container) { }

  async install(): Promise<void> {
    const pubSubProvider = new PubSubProvider(AMQP_CONFIG);
    
    const publisher = await pubSubProvider.initPublisher();

    await publisher.assertExchange(ETL_STATUS_EXCHANGE, 'fanout', true);

    this.appContainer.bind<Publisher>('Publisher').toConstantValue(publisher);
  }

}