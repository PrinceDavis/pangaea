import { FastifyInstance } from "fastify";
import HttpStatus from "http-status";

import { registerSubscriberSchema } from "./validation";
import { RegisterSubscriber } from "../../usecases";
import { PublishToATopic } from "../../usecases/publish-to-a-topic";

async function publish(req: any, reply: any): Promise<void> {
  const handler = <PublishToATopic>req.diContainer.resolve("publishToATopic");

  const { DATABASE_ERROR, SUCCESS, ERROR } = handler.events;
  handler.on(SUCCESS, () =>
    reply.send({ message: "message in flight to subscribers" })
  );
  handler.on(DATABASE_ERROR, (ex) =>
    reply.code(HttpStatus.NOT_FOUND).send({
      error: "DatabaseError",
      message: "The provided topic has no subscribers",
    })
  );
  handler.on(ERROR, () =>
    reply.code(HttpStatus.INTERNAL_SERVER_ERROR).send({
      error: "Internal Server Error",
      message: "The server is unable to handle this request",
    })
  );
  handler.execute({ topic: req.params.topic, body: req.body });
}

async function create(req: any, reply: any): Promise<void> {
  const handler = <RegisterSubscriber>(
    req.diContainer.resolve("registerSubscriber")
  );

  const { DATABASE_ERROR, SUCCESS, ERROR } = handler.events;
  handler.on(SUCCESS, (res) => reply.send(res));
  handler.on(DATABASE_ERROR, (ex) =>
    reply.code(HttpStatus.BAD_REQUEST).send({
      error: "DatabaseError",
      message: ex,
    })
  );
  handler.on(ERROR, () =>
    reply.code(HttpStatus.INTERNAL_SERVER_ERROR).send({
      error: "Internal Server Error",
      message: "The server is unable to handle this request",
    })
  );
  handler.execute({ name: req.params.topic, subscriber: req.body });
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
    fastify.post("/publish/:topic", publish);
    done();
  },
};
