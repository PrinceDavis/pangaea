import nodeFetch from "node-fetch";
import { Logger } from "../adapters/logger";

interface ArgI {
  payload: { [key: string]: string };
  addresses: string[];
}
export async function sendRequest({ addresses, payload }: ArgI): Promise<void> {
  const requests = addresses.map((url) => postData(url, payload));
  Logger.info("sending messege to subscribers");
  try {
    await Promise.all(requests);
    Logger.info("message delivered to all subscriber");
  } catch (ex) {
    Logger.info("Message to subscribers failed");
    Logger.error(ex);
  }
}

function postData(url = "", data = {}) {
  // Default options are marked with *
  return nodeFetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify(data),
  });
}
