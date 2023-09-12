import { Schema } from "mongoose";
import { IPlanet } from "./types";

export const planetSchema = new Schema<IPlanet>({
  keplerName: { type: String, required: true },
});
