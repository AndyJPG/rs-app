import express from "express"
import { CommonRoutesConfig } from "../common/common.routes.config"
import VenuesController from "./controllers/venues.controller"
import VenuesMiddleware from "./middleware/venues.middleware"

export default class VenuesRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "VenuesRoutes")
  }

  configureRoutes(): express.Application {
    this.app.route("/venue/search")
      .post(VenuesController.searchVenues)

    this.app.route("/venue")
      .post(VenuesMiddleware.validateCreateVenueBodyFields, VenuesController.createVenue)

    this.app.route("/venue/:venueId")
      .put(VenuesMiddleware.extractTenantId, VenuesController.updateVenueById)
      .delete(VenuesMiddleware.extractTenantId, VenuesController.deleteVenueById)

    this.app.route("/venue/:venueId/categories")
      .get(VenuesMiddleware.extractTenantId, VenuesController.getVenueCategories)

    return this.app
  }
}