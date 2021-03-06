import redis from "redis";

import { redisClientFactory } from "../../adapters/redis-client";
import { Logger } from "../../adapters/logger";
import { sendRequest } from "../../services";

export class Heimdall {
  private redisClient: redis.RedisClient;
  constructor() {
    this.redisClient = redisClientFactory();
    this.redisClient.subscribe("SENDREQUEST");
  }

  async listen(): Promise<void> {
    this.redisClient.on("message", (channel: string, message: string) => {
      Logger.info(`Message from ${channel}`);
      const data = JSON.parse(message);
      sendRequest({ addresses: data.subscribers, payload: data.body });
    });
  }
}
