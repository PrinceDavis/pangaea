import { Logger } from "../../adapters/logger";
import { diContainer } from "../di-continer";
import { Server } from "./server";

const server = <Server>diContainer.resolve("server");

async function start(): Promise<void> {
  try {
    await server.start();
  } catch (ex) {
    console.log("Could not start server");
    // log exception
    Logger.error(ex);
    process.exit(1);
  }
}

start();
