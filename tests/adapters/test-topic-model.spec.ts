import { TopicModel } from "../../src/adapters/models";
import { database } from "../../src/adapters";

describe("TopicModel", () => {
  beforeAll(async (done) => {
    await database.connect();
    done();
  });

  afterAll(async (done) => {
    await database.drop();
    done();
  });

  test("It can create record in the db", async (done) => {
    const topic = await TopicModel.create({
      name: "topic1",
      subscriptions: [
        {
          url: "https://wwww.example.com",
        },
      ],
    });
    const result = await TopicModel.findOne({ name: "topic1" });
    expect(topic.subscriptions[0].url).toEqual(result.subscriptions[0].url);
    expect(topic.name).toBe(result.name);
    done();
  });
});
