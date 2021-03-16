import { FastifyInstance } from "fastify";

import { TopicController } from "./topic-controller";

export const registerRoutes = (fastify: FastifyInstance): void => {
  fastify.register(TopicController.routes);
};
