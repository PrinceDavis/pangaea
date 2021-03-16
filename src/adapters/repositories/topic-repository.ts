import { TopicDocument, TopicI, TopicModel } from "../models";

export interface TopicRepositoryI {
  add(input: TopicI): Promise<TopicDocument>;
}
export class TopicRepository implements TopicRepositoryI {
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
