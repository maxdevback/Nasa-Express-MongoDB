import { model } from "mongoose";
import { ILaunch } from "./types";
import { launchSchema } from "./schema";

export const LaunchModel = model<ILaunch>("launch", launchSchema);
