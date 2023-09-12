import { PlanetsModel } from "../../entities/planets/model";
import { parse } from "csv-parse";
import path from "path";
import fs from "fs";

class PlanetDB {
  async findByName(name: string) {
    return await PlanetsModel.findOne({ keplerName: name });
  }
  async getAll() {
    return await PlanetsModel.find();
  }
  _isHabitablePlanet(planet: any) {
    return (
      planet["koi_disposition"] === "CONFIRMED" &&
      planet["koi_insol"] > 0.36 &&
      planet["koi_insol"] < 1.11 &&
      planet["koi_prad"] < 1.6
    );
  }
  async insert() {
    if ((await PlanetsModel.count()) > 0) return console.log("Already");
    let planets: any[] = [];
    return new Promise((resolve, reject) => {
      fs.createReadStream(
        path.join(
          __dirname,
          "..",
          "..",
          "..",
          "..",
          "..",
          "data",
          "kepler_data.csv"
        )
      )
        .pipe(
          parse({
            comment: "#",
            columns: true,
          })
        )
        .on("data", async (data) => {
          if (this._isHabitablePlanet(data)) {
            planets.push({ keplerName: data.kepler_name });
          }
        })
        .on("error", (err) => {
          console.log(err);
          reject(err);
        })
        .on("end", async () => {
          console.log(planets);
          await PlanetsModel.insertMany(planets);
          console.log(`${planets.length} habitable planets found!`);
          resolve("");
        });
    });
  }
}

export default new PlanetDB();
