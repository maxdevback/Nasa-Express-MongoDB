const request = require("supertest");
import { App } from "../../App";

describe("Launches", () => {
  test("Get all", async () => {
    await request(App).get("/api/launches").expect(200);
  });
  const completeLaunchData = {
    mission: "USS Enterprise",
    rocket: "NCC 1701-D",
    target: "Kepler-62 f",
    launchDate: "January 4, 2028",
  };

  const launchDataWithoutDate = {
    mission: "USS Enterprise",
    rocket: "NCC 1701-D",
    target: "Kepler-62 f",
  };

  const launchDataWithInvalidDate = {
    mission: "USS Enterprise",
    rocket: "NCC 1701-D",
    target: "Kepler-62 f",
    launchDate: "zoot",
  };
  test("Valid creation", async () => {
    await request(App)
      .post("/api/launches")
      .send(completeLaunchData)
      .expect(201);
  });
  test("Absent part of data", async () => {
    await request(App)
      .post("/api/launches")
      .send(launchDataWithoutDate)
      .expect(400);
  });
  test("Invalid data", async () => {
    await request(App)
      .post("/api/launches")
      .send(launchDataWithInvalidDate)
      .expect(422);
  });
});
