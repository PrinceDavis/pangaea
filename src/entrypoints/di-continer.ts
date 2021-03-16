import { TopicRepository } from "../adapters/repositories";
import { createContainer, asValue, asClass } from "awilix";
import { RegisterSubscriber } from "../usecases";
import { TopicModel } from "../adapters/models";
import { config } from "../adapters/config";
import { database } from "../adapters";

export const diContainer = createContainer();

diContainer.register({
  registerSubscriber: asClass(RegisterSubscriber).singleton(),
  topicRepository: asClass(TopicRepository).singleton(),
  topicModel: asValue(TopicModel),
  database: asValue(database),
  config: asValue(config),
});