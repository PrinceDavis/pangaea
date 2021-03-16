import fastify, { FastifyInstance } from "fastify";
import helment from "fastify-helmet";
import cors from "fastify-cors";

import { ConfigI } from "../../contracts/config";
import { diContainer } from "../di-continer";
import { database } from "../../adapters";
import { registerRoutes } from "./routes";

interface ServerI {
  config: ConfigI;
}

export class Server {
  fastify: FastifyInstance;
  config: ConfigI;

  constructor({ config }: ServerI) {
    this.fastify = fastify({});
    this.config = config;
  }

  async configureServer(): Promise<void> {
    this.fastify.register(cors);
    this.fastify.register(helment, { contentSecurityPolicy: false });

    registerRoutes(this.fastify);
    this.fastify.addHook("onRequest", async (req: any) => {
      req.diContainer = diContainer;
    });
    const address = await this.fastify.listen(
      this.config.server.port,
      "0.0.0.0"
    );
    console.log(`server listening on ${address}`);
  }

  async start(): Promise<void> {
    await database.connect();
    await this.configureServer();
  }
}
