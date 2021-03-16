import { TopicRepositoryI } from "../adapters/repositories/topic-repository";
import { UseCase } from "./usecase";

interface ExecI {
  subscriber: string;
  name: string;
}

export class RegisterSubscriber extends UseCase {
  private repository: TopicRepositoryI;

  constructor({ topicRepository }: { topicRepository: TopicRepositoryI }) {
    super();
    this.repository = topicRepository;
  }

  async execute({ name, subscriber }: ExecI): Promise<void> {
    const { SUCCESS, ERROR, DATABASE_ERROR } = this.events;
    try {
      const topic = await this.repository.add({
        name,
        subscriptions: [{ url: subscriber }],
      });
      this.emit(SUCCESS, {
        topic: topic.name,
        url: topic.subscriptions[0].url,
      });
    } catch (ex) {
      if (ex.type === "DatabaseError") {
        this.emit(DATABASE_ERROR, ex);
      } else {
        console.log(ex);
        this.emit(ERROR, ex);
      }
    }
  }
}

RegisterSubscriber.setEvents([
  "DATABASE_ERROR",
  "BAD_PARAMETERS",
  "SUCCESS",
  "ERROR",
]);
