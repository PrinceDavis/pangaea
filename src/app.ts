import { config } from "./adapters/config";
import pkg from "../package.json";
import semver from "semver";

const runtime = {
  expected: <string>semver.validRange(pkg.engines.node),
  actual: <string>semver.valid(process.version),
};

const valid = semver.satisfies(runtime.actual, runtime.expected);
if (!valid) {
  throw new Error(
    `Expected Nodejs version ${runtime.expected}, but found
    ${runtime.actual}. Please update or change your runtime`
  );
}

if (config.server.type === "web") {
  require("./entrypoints/http");
} else if (config.server.type === "worker") {
  require("./entrypoints/worker");
} else {
  throw new Error(`${config.server.type} is not supported.`);
}
