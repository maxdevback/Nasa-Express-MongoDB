import { Request, Response } from "express";
import Utils from "../utils";
import LaunchDB from "../../models/DB/logic/launches";
import { IPostLaunchBody } from "./types";

class LaunchesController {
  async getAll(req: Request, res: Response) {
    try {
      const { skip, limit } = Utils.getQuery(req.query);
      res.send(await LaunchDB.getAll(skip, limit));
    } catch (err) {
      res.status(500);
      res.send(err);
    }
  }
  async addNew(req: Request<{}, {}, IPostLaunchBody>, res: Response) {
    try {
      if (
        !req.body.mission ||
        !req.body.rocket ||
        !req.body.launchDate ||
        !req.body.target
      ) {
        res.status(400);
        res.send({
          error: "One of required fields is absent",
        });
      } else if (
        typeof req.body.mission !== "string" ||
        typeof req.body.rocket !== "string" ||
        new Date(req.body.launchDate).toString() === "Invalid Date" ||
        typeof req.body.target !== "string"
      ) {
        res.status(422);
        res.send({
          error: "One of field have wrong type",
        });
      } else {
        const response = await LaunchDB.addNew(req.body);
        if (response?.error) {
          res.status(response.status);
          res.send({
            error: response.error,
          });
        } else {
          res.status(201);
          res.send(response);
        }
      }
    } catch (err) {
      res.status(500);
      res.send(err);
    }
  }
  async abort(req: Request<{ id: string }>, res: Response) {
    try {
      const response = await LaunchDB.abort(req.params.id);
      if (response?.error) {
        res.status(response.status);
        res.send({
          error: response.error,
        });
      } else {
        res.send(response);
      }
    } catch (err) {
      res.status(500);
      res.send(err);
    }
  }
}

export default new LaunchesController();
