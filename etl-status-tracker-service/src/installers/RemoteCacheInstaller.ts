import { Container, inject, injectable } from "inversify";
import { REDIS_CONFIG } from "../config";
import { IInstaller } from "../contracts/IInstaller";
import { ICacheService, initRedisClient, TempCacheService } from 'isobarot'

@injectable()
export class RemoteCacheInstaller implements IInstaller {

  connectionRertyTimeout = 5000;

  constructor(@inject("AppContainer") private appContainer: Container) { }

  install(): void {
    const redisClient = initRedisClient(REDIS_CONFIG);
    this.appContainer.bind("RedisClient").toConstantValue(redisClient);

    this.appContainer.bind<ICacheService>("TempCacheService").toDynamicValue(() => new TempCacheService({ client: redisClient })).inSingletonScope();
  }

}