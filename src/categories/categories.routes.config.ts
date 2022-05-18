import express from "express"
import { CommonRoutesConfig } from "../common/common.routes.config"
import CategoriesController from "./controllers/categories.controller"

export default class CategoriesRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "CategoriesRoutes")
  }

  configureRoutes(): express.Application {
    this.app.route("/category").get(CategoriesController.searchCategories)
    return this.app
  }
}