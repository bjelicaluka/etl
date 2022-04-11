import { Server } from 'http';
import { IInstaller } from "./contracts/IInstaller";
import { AppContainer } from "./AppContainer";
import { LOGGING } from "./config";

const PORT = 80;

main();

async function main() {
  startApplication();
}

function startApplication(): void {
  installMiddleware();
  startServer();
}

function installMiddleware() {
  const installers: IInstaller[] = AppContainer.getAll<IInstaller>("IInstaller");
  installers.forEach(i => i.install());
}

function startServer(): void {
  const httpServer = AppContainer.get<Server>(Server);
  httpServer.listen(PORT);
  
  LOGGING && console.log(`Server is listening on port ${PORT}.`);
}