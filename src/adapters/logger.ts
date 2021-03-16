import { configure, getLogger } from "log4js";

configure({
  appenders: {
    console: { type: "console" },
    everything: { type: "file", filename: "./error.log" },
  },
  categories: {
    default: { appenders: ["everything", "console"], level: "debug" },
  },
});

export const Logger = getLogger();
