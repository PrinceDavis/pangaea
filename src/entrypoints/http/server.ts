import fastify, { FastifyInstance } from "fastify";
import helment from "fastify-helmet";
import cors from "fastify-cors";

import { ConfigI } from "../../contracts/config";
import { Heimdall } from "../workers/heimdall";
import { diContainer } from "../di-continer";
import { database } from "../../adapters";
import { registerRoutes } from "./routes";

interface ServerI {
  heimdall: Heimdall;
  config: ConfigI;
}

export class Server {
  fastify: FastifyInstance;
  heimdall: Heimdall;
  config: ConfigI;

  constructor({ config, heimdall }: ServerI) {
    this.fastify = fastify({});
    this.heimdall = heimdall;
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
    await this.heimdall.listen();
  }

  async start(): Promise<void> {
    await database.connect();
    await this.configureServer();
  }
}
