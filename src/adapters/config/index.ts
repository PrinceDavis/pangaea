import { ConfigI } from "../../contracts/config";
import { db, server } from "./components";

export const config: ConfigI = {
  server,
  db,
};
