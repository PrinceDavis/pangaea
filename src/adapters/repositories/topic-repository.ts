import { TopicDocument, TopicI, TopicModel } from "../models";

export class TopicRepository {
  private model: typeof TopicModel;

  constructor({ topicModel }: { topicModel: typeof TopicModel }) {
    this.model = topicModel;
  }

  async add(input: TopicI): Promise<TopicDocument> {
    try {
      const topic = await this.model.create(input);
      return topic;
    } catch (ex) {
      ex.type = "DatabaseError";
      throw ex;
    }
  }
}
