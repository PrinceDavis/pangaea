import { model, Schema, Model, Document } from "mongoose";

export interface TopicI {
  name: string;
  subscriptions: { url: string }[];
}

const schema: Schema = new Schema({
  name: { type: String, required: true },
  subscriptions: [{ url: { type: String, require: true } }],
  created: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
});

export interface TopicDocument extends TopicI, Document {}

export const TopicModel: Model<TopicDocument> = model("topics", schema);
