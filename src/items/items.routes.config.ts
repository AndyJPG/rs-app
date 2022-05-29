import express from "express"
import { CommonRoutesConfig } from "../common/common.routes.config"
import ItemsController from "./controllers/items.controller"

export default class ItemsRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "ItemsRoutes")
  }

  configureRoutes(): express.Application {
    this.app.route("/item").post(ItemsController.createItem)
    return this.app
  }
}