import { FastifyInstance } from "fastify";
import HttpStatus from "http-status";

import { registerSubscriberSchema } from "./validation";
import { RegisterSubscriber } from "../../usecases";
import { Logger } from "../../adapters/logger";

async function create(req: any, reply: any): Promise<void> {
  const handler = <RegisterSubscriber>(
    req.diContainer.resolve("registerSubscriber")
  );

  const { DATABASE_ERROR, SUCCESS, ERROR } = handler.events;
  handler.on(SUCCESS, (res) => reply.send(res));
  handler.on(DATABASE_ERROR, (ex) => {
    Logger.error(ex);
    reply.code(HttpStatus.BAD_REQUEST).send({
      error: "DatabaseError",
      message: ex,
    });
  });
  handler.on(ERROR, (ex) => {
    Logger.error(ex);
    reply.code(HttpStatus.INTERNAL_SERVER_ERROR).send({
      error: "Internal Server Error",
      message: "The server is unable to handle this request",
    });
  });
  handler.execute({ name: req.params.topic, subscriber: req.body.url });
}

export const TopicController = {
  routes(fastify: FastifyInstance, _: any, done: any): void {
    fastify.post(
      "/subscribe/:topic",
      {
        schema: registerSubscriberSchema,
      },
      create
    );
    done();
  },
};