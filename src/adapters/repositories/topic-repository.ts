import { TopicDocument, TopicI, TopicModel } from "../models";

export interface TopicRepositoryI {
  add(input: TopicI): Promise<TopicDocument>;
  fetchSubscribers(topicName: string): Promise<string[] | undefined>;
}
export class TopicRepository implements TopicRepositoryI {
  private model: typeof TopicModel;

  constructor({ topicModel }: { topicModel: typeof TopicModel }) {
    this.model = topicModel;
  }

  async add(input: TopicI): Promise<TopicDocument> {
    try {
      let topic = await this.model.findOne({ name: input.name });
      if (topic) {
        topic.subscriptions = topic.subscriptions.concat(input.subscriptions);
        await topic.save();
      } else {
        topic = await this.model.create(input);
      }
      return topic;
    } catch (ex) {
      ex.type = "DatabaseError";
      throw ex;
    }
  }

  async fetchSubscribers(topicName: string): Promise<string[] | undefined> {
    const topic = await this.model.findOne({ name: topicName });
    return topic?.subscriptions.map((subscriber) => subscriber.url);
  }
}
