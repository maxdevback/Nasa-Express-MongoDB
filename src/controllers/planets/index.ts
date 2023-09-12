import { Request, Response } from "express";
import PlanetDB from "../../models/DB/logic/planets";

class PlanetsController {
  async getAll(req: Request, res: Response) {
    try {
      res.send(await PlanetDB.getAll());
    } catch (err) {
      res.status(500);
      res.send(err);
    }
  }
}

export default new PlanetsController();
