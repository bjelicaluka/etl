import { Server } from "http";
import { Container, inject, injectable } from "inversify";
import { IEventDispatcher, IEventHandler, INamespaceProvider, Publisher, SocketIOServer } from "isobarot";
import { IInstaller } from "../contracts/IInstaller";
import { TransformationStateHandler } from "../TransformationStateHandler";
import { ETL_STATUS_EXCHANGE } from "./PublisherInstaller";

@injectable()
export class WsEventsInstaller implements IInstaller {

  connectionRertyTimeout = 5000;

  constructor(@inject("AppContainer") private appContainer: Container) { }

  install(): void {
    
    const redisClient = this.appContainer.get("RedisClient") as any;
    const server = this.appContainer.get<Server>(Server);

    this.appContainer.bind<SocketIOServer>(SocketIOServer).toConstantValue(new SocketIOServer(server, { client: redisClient }));
    const socketIoServerInstance = this.appContainer.get(SocketIOServer);

    this.appContainer.bind<IEventDispatcher>("IEventDispatcher").toConstantValue(socketIoServerInstance);
    this.appContainer.bind<IEventHandler>("IEventHandler").toConstantValue(socketIoServerInstance);
    this.appContainer.bind<INamespaceProvider>("INamespaceProvider").toConstantValue(socketIoServerInstance);

    socketIoServerInstance.createNamespaceIfNotExists('etl-events');
    const etlCommandsNamespace = socketIoServerInstance.createNamespaceIfNotExists('etl-commands');

    etlCommandsNamespace.on('connection', s => {
      s.on('process-start', transformationId => {
        TransformationStateHandler.setInitialState(transformationId);
        const pub = this.appContainer.get<Publisher>("Publisher");
        pub.publish(ETL_STATUS_EXCHANGE, '', JSON.stringify({type: "ProcessStart", transformationId}));
      });
    });
  }

}