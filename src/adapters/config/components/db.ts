import joi from "joi";

import { DBI } from "../../../contracts/config";

const schema = joi
  .object({
    MONGODB_URL: joi.string().required(),
    REDIS_URL: joi.string().required(),
  })
  .unknown()
  .required();

const { error, value } = schema.validate(process.env);

if (error) throw new Error(`Config validation failed ${error.message}`);

export const db: DBI = {
  mongodbUrl: value.MONGODB_URL,
  redisUrl: value.REDIS_URL,
};
