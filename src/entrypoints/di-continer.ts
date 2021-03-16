import { TopicRepository } from "../adapters/repositories";
import { createContainer, asValue, asClass } from "awilix";
import { RegisterSubscriber } from "../usecases";
import { TopicModel } from "../adapters/models";
import { Heimdall } from "./workers/heimdall";
import { config } from "../adapters/config";
import { database } from "../adapters";
import { Server } from "./http/server";
import { PublishToATopic } from "../usecases/publish-to-a-topic";

export const diContainer = createContainer();

diContainer.register({
  registerSubscriber: asClass(RegisterSubscriber).singleton(),
  publishToATopic: asClass(PublishToATopic).singleton(),
  topicRepository: asClass(TopicRepository).singleton(),
  heimdall: asClass(Heimdall).singleton(),
  server: asClass(Server).singleton(),
  topicModel: asValue(TopicModel),
  database: asValue(database),
  config: asValue(config),
});
