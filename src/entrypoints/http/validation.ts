export const registerSubscriberSchema = {
  body: {
    type: "object",
    additionalProperties: false,
    properties: {
      url: { type: "string" },
    },
    required: ["url"],
  },
};
