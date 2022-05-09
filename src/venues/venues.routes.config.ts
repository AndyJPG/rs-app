import express from "express"
import { CommonRoutesConfig } from "../common/common.routes.config"
import VenuesController from "./controllers/venues.controller"

export default class VenuesRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "VenuesRoutes")
  }

  configureRoutes(): express.Application {
    this.app.route("/venue/search").post(VenuesController.searchVenues)

    return this.app
  }
}