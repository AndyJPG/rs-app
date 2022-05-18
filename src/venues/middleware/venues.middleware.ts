import express from "express"
import createHttpError from "http-errors"
import { CreateVenueDto } from "../entities/create.venue.dto"
import VenuesService from "../services/venues.service"

class VenuesMiddleware {
  async validateCreateVenueBodyFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const body = req.body as CreateVenueDto
    if (body && body.name && body.slug) {
      next()
    } else {
      next(createHttpError(400, "Missing required fields"))
    }
  }

  async validateExistSlug(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const body = req.body as CreateVenueDto
    if (body && body.slug) {
      const venues = await VenuesService.search({ venueSlug: body.slug })
      if (venues.length > 0) {
        next(createHttpError(400, "Slug exists"))
      } else {
        next()
      }
    } else {
      next()
    }
  }

  async extractTenantId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.body.id = req.params.venueId
    next()
  }
}

export default new VenuesMiddleware()