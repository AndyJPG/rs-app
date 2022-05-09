import express from "express"
import venuesService from "../services/venues.service"

class VenuesController {
  async searchVenues(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const venues = venuesService.search(req.body)
      res.status(200).send(venues)
    } catch (e) {
      next(e)
    }
  }
}

export default new VenuesController()