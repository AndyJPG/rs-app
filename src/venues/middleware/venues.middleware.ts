import express from "express"
import createHttpError from "http-errors"
import { CreateVenueDto } from "../entities/create.venue.dto"

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
}

export default new VenuesMiddleware()