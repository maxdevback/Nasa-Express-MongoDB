import { model } from "mongoose";
import { IPlanet } from "./types";
import { planetSchema } from "./schema";

export const PlanetsModel = model<IPlanet>("planet", planetSchema);
