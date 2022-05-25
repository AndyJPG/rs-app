import express from "express"
import { CommonRoutesConfig } from "../common/common.routes.config"

export default class ItemsRoutesConfig extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "ItemsRoutes")
  }

  configureRoutes(): express.Application {
    return this.app
  }
}