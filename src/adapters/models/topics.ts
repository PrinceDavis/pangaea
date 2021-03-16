import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  subscriptions: [{ url: { type: String, require: true } }],
  created: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
});

export const TopicModel = mongoose.model("topics", schema);
