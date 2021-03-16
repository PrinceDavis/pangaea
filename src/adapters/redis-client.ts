import redis from "redis";

import { config } from "./config";

export function redisClientFactory() {
  return redis.createClient({ url: config.db.redisUrl });
}
