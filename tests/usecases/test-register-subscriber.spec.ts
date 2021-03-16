import { EventEmitter } from "events";
import { TopicModel } from "../../src/adapters/models";

import { TopicRepository } from "../../src/adapters/repositories";
import { RegisterSubscriber } from "../../src/usecases";
import { database } from "../../src/adapters";

describe("ScheduleNotification", () => {
  const topicRepository = new TopicRepository({
    topicModel: TopicModel,
  });

  const registerSubscriber = new RegisterSubscriber({
    topicRepository,
  });

  test("It is an event emitter", () => {
    expect(registerSubscriber).toBeInstanceOf(EventEmitter);
  });

  test("It has SUCCESS, ERROR,and DATABASE_ERROR event types", () => {
    const { SUCCESS, ERROR, DATABASE_ERROR } = registerSubscriber.events;
    expect(DATABASE_ERROR).toBe("DATABASE_ERROR");
    expect(SUCCESS).toBe("SUCCESS");
    expect(ERROR).toBe("ERROR");
  });

  test("It emit SUCCESS event", async (done) => {
    const options = {
      name: "topic1",
      subscriber: "www.example.com",
    };
    await database.connect();
    const { SUCCESS } = registerSubscriber.events;
    const mockCallback = jest.fn();

    registerSubscriber.on(SUCCESS, mockCallback);
    await registerSubscriber.execute(options);

    expect(mockCallback.mock.calls[0][0].url).toEqual(options.subscriber);
    expect(mockCallback.mock.calls[0][0].topic).toEqual(options.name);
    await database.drop();
    done();
  });
});
