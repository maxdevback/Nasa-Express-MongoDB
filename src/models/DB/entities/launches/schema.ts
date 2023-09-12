import { Schema } from "mongoose";
import { ILaunch } from "./types";

export const launchSchema = new Schema<ILaunch>({
  flightNumber: { type: Number, required: true },
  launchDate: { type: Date, required: true },
  mission: { type: String, required: true },
  rocket: { type: String, required: true },
  target: { type: String },
  customers: [String],
  upcoming: { type: Boolean, required: true },
  success: { type: Boolean, required: true, default: true },
});
