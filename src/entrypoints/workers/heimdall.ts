import redis from "redis";
import { config } from "../../adapters/config";
import { Logger } from "../../adapters/logger";

export class Heimdall {
  private redisClient: redis.RedisClient;
  constructor() {
    this.redisClient = redis.createClient({ url: config.db.redisUrl });
    this.redisClient.subscribe("SENDREQUEST");
  }

  async listen(): Promise<void> {
    this.redisClient.on("message", (channel: string, message: string) => {
      Logger.info(`Message from ${channel}`);
      //   this.handler.execute(JSON.parse(message));
    });
  }
}
