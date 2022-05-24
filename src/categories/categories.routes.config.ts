import express from "express"
import { CommonRoutesConfig } from "../common/common.routes.config"
import CategoriesController from "./controllers/categories.controller"
import CategoriesMiddleware from "./middleware/categories.middleware"

export default class CategoriesRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "CategoriesRoutes")
  }

  configureRoutes(): express.Application {
    this.app.route("/category")
      .post(CategoriesController.createCategory)

    this.app.route("/category/search")
      .post(CategoriesController.searchCategories)

    this.app.route("/category/:categoryId")
      .all(CategoriesMiddleware.extractCategoryId)
      .put(CategoriesController.updateCategory)
      .delete(CategoriesController.deleteCategoryById)

    return this.app
  }
}