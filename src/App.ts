import { config } from "dotenv";
import { connect } from "mongoose";
import express from "express";
import routes from "./routes";
import LaunchDB from "./models/DB/logic/launches";
import PlanetDB from "./models/DB/logic/planets";
import path from "path";
config();

export const App = express();
App.use("/", express.static(path.join(__dirname, "..", "public")));
App.use(express.json());
App.use("/api", routes);
App.use("*", (req, res) => {
  res.redirect("/");
});

const start = async () => {
  if (!process.env.MONGODB_LINK) throw "Incorrect env. Mongodb link";
  if (!process.env.PORT) throw "Incorrect enb. Port";
  await connect(process.env.MONGODB_LINK);
  await PlanetDB.insert();
  await LaunchDB.loadLaunchData();
  App.listen(process.env.PORT, () => {
    console.log(`Server has been started at ${process.env.PORT} port`);
  });
};

start();
