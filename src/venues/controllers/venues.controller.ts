import express from "express"
import VenuesService from "../services/venues.service"

class VenuesController {
  async searchVenues(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const venues = await VenuesService.search(req.body)
      res.status(200).send(venues)
    } catch (e) {
      next(e)
    }
  }

  async createVenue(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const newVenueId = await VenuesService.create(req.body)
      res.status(200).send({ id: newVenueId })
    } catch (e) {
      console.log(e)
      next(e)
    }
  }
}

export default new VenuesController()