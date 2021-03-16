import mongoose from "mongoose";

import { config } from "./config";
import { Logger } from "./logger";

export const database = {
  async connect(): Promise<void> {
    try {
      await mongoose.connect(config.db.mongodbUrl, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      });
    } catch (ex) {
      Logger.warn("failed to connect to database");
      Logger.error(ex);
      process.exit(1);
    }
  },
  async drop(): Promise<void> {
    try {
      const db = await mongoose.connect(config.db.mongodbUrl, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      });
      await db.connection.dropDatabase();
    } catch (ex) {
      Logger.warn("failed to connect to database");
      Logger.error(ex);
      process.exit(1);
    }
  },
};
