import { config } from "../../src/adapters/config";

describe("config", () => {
  test("has db object", () => {
    expect(config.db).toBeInstanceOf(Object);
  });
  test("has valid value for db", () => {
    expect(config.db.redisUrl).toEqual(process.env.REDIS_URL);
    expect(config.db.mongodbUrl).toEqual(process.env.MONGODB_URL);
  });

  test("has server object", () => {
    expect(config.db).toBeInstanceOf(Object);
  });

  test("has valid value for server", () => {
    expect(config.server.type).toEqual(process.env.PROCESS_TYPE);
    expect(config.server.port).toEqual(Number(process.env.PORT));
    expect(config.server.env).toEqual(process.env.NODE_ENV);
  });
});
