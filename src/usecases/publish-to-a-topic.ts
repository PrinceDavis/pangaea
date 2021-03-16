import redis from "redis";

import { redisClientFactory } from "../adapters/redis-client";
import { TopicRepositoryI } from "../adapters/repositories";
import { Logger } from "../adapters/logger";
import { UseCase } from "./usecase";

interface ArgI {
  topicRepository: TopicRepositoryI;
}

interface ExecI {
  body: { [key: string]: any };
  topic: string;
}
export class PublishToATopic extends UseCase {
  private redisClient: redis.RedisClient;
  private repository: TopicRepositoryI;

  constructor({ topicRepository }: ArgI) {
    super();
    this.redisClient = redisClientFactory();
    this.repository = topicRepository;
  }

  async execute({ topic, body }: ExecI): Promise<void> {
    const { SUCCESS, ERROR, DATABASE_ERROR } = this.events;
    try {
      const subscribes = await this.repository.fetchSubscribers(topic);
      if (!subscribes?.length) {
        this.emit(DATABASE_ERROR);
        return;
      }
      this.redisClient.publish(
        "SENDREQUEST",
        JSON.stringify({ subscribes, body })
      );
      this.emit(SUCCESS);
    } catch (ex) {
      Logger.error(ex);
      this.emit(ERROR, ex);
    }
  }
}

PublishToATopic.setEvents(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
