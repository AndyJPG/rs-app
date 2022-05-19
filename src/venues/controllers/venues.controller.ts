import express from "express"
import createHttpError from "http-errors"
import VenuesService from "../services/venues.service"

class VenuesController {
  async searchVenues(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const venues = await VenuesService.search(req.body)
      res.status(200)
        .send(venues)
    } catch (e) {
      next(e)
    }
  }

  async createVenue(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const newVenueId = await VenuesService.create(req.body)
      res.status(201)
        .send({ id: newVenueId })
    } catch (e) {
      next(e)
    }
  }

  async updateVenueById(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const newVenue = await VenuesService.putById(req.body.id, req.body)
      if (newVenue) {
        res.status(200).send(newVenue)
      } else {
        next(createHttpError(404, "Venue not found"))
      }
    } catch (e) {
      next(e)
    }
  }

  async deleteVenueById(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      await VenuesService.deleteById(req.body.id)
      res.status(204)
        .send()
    } catch (e) {
      next(e)
    }
  }

  async getVenueCategories(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      await VenuesService.getVenueCategories(req.body.id)
      res.status(200)
        .send()
    } catch (e) {
      next(e)
    }
  }
}

export default new VenuesController()