import express from "express"
import CategoriesService from "../services/categories.service"

class CategoriesController {
  async searchCategories(req: express.Request, res: express.Response, next: express.NextFunction) {
    res.status(200).send("test categories route")
  }

  async createCategory(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const newCategoryId = await CategoriesService.create(req.body)
      res.status(201).send({ id: newCategoryId })
    } catch (e) {
      next(e)
    }
  }
}

export default new CategoriesController()