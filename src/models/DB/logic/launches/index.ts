import axios from "axios";
import { LaunchModel } from "../../entities/launches/model";
import PlanetDB from "../planets/index";

class LaunchDB {
  async populateLaunches() {
    const response = await axios.post(
      "https://api.spacexdata.com/v4/launches/query",
      {
        query: {},
        options: {
          pagination: false,
          populate: [
            {
              path: "rocket",
              select: {
                name: 1,
              },
            },
            {
              path: "payloads",
              select: {
                customers: 1,
              },
            },
          ],
        },
      }
    );
    if (response.status !== 200) {
      throw new Error(`Error in populateLaunches ${response}`);
    }
    const launchDocs = response.data.docs;
    const launches = [];
    for (const launchDoc of launchDocs) {
      const payloads = launchDoc["payloads"];
      const customers = payloads.flatMap((payload: any) => {
        return payload["customers"];
      });

      const launch = {
        flightNumber: launchDoc["flight_number"],
        mission: launchDoc["name"],
        rocket: launchDoc["rocket"]["name"],
        launchDate: launchDoc["date_local"],
        upcoming: launchDoc["upcoming"],
        success: launchDoc["success"] || false,
        customers,
      };

      console.log(launch);

      launches.push(launch);
    }
    await LaunchModel.insertMany(launches);
  }
  async loadLaunchData() {
    const firstLaunch = await LaunchModel.findOne({
      flightNumber: 1,
      rocket: "Falcon 1",
      mission: "FalconSat",
    });
    if (firstLaunch) {
      console.log("Launch data already loaded!");
    } else {
      await this.populateLaunches();
    }
  }
  async existsLaunchWithId(id: number) {
    return await LaunchModel.findOne({
      flightNumber: id,
    });
  }
  async getAll(skip: number, limit: number) {
    return await LaunchModel.find({})
      .sort({ flightNumber: 1 })
      .skip(skip)
      .limit(limit);
  }
  async addNew(launch: any) {
    const planet = await PlanetDB.findByName(launch.target);
    if (!planet) return { error: "Planet not found", status: 404 };
    const newFlightNumber = (await this.getLatestFlightNumber()) + 1;
    const newLaunch = Object.assign(launch, {
      success: true,
      upcoming: true,
      customers: ["NASA"],
      flightNumber: newFlightNumber,
    });
    const Launch = new LaunchModel(newLaunch);
    await Launch.save();
  }
  async getLatestFlightNumber() {
    const latestLaunch = await LaunchModel.findOne().sort("-flightNumber");

    if (!latestLaunch) {
      return 100;
    }

    return latestLaunch.flightNumber;
  }
  async abort(id: string) {
    const launch = await LaunchModel.findOne({ flightNumber: id });
    if (!launch)
      return { error: "Launch with that id doesn't exist", status: 404 };
    launch.upcoming = false;
    launch.success = false;
    await launch.save();
  }
}

export default new LaunchDB();
