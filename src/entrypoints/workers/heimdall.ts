import redis from "redis";

import { redisClientFactory } from "../../adapters/redis-client";
import { Logger } from "../../adapters/logger";

export class Heimdall {
  private redisClient: redis.RedisClient;
  constructor() {
    this.redisClient = redisClientFactory();
    this.redisClient.subscribe("SENDREQUEST");
  }

  async listen(): Promise<void> {
    this.redisClient.on("message", (channel: string, message: string) => {
      Logger.info(`Message from ${channel}`);
      //   this.handler.execute(JSON.parse(message));
    });
  }
}
