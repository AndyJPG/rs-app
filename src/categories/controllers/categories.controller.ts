import express from "express"
import CategoriesService from "../services/categories.service"

class CategoriesController {
  async searchCategories(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const categories = await CategoriesService.search(req.body)
      res.status(200).send(categories)
    } catch (e) {
      next(e)
    }
  }

  async getCategoryById(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const categoryWithMenuSections = await CategoriesService.readById(req.body.id)
      res.status(200).send(categoryWithMenuSections)
    } catch (e) {
      next(e)
    }
  }

  async getCategoriesWithItemsByID(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const categoriesWithItems = await CategoriesService.getCategoriesWithItemsById(req.body.id)
      res.status(200).send(categoriesWithItems)
    } catch (e) {
      next(e)
    }
  }

  async createCategory(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const newCategoryId = await CategoriesService.create(req.body)
      res.status(201).send({ id: newCategoryId })
    } catch (e) {
      next(e)
    }
  }

  async updateCategory(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const newUpdatedCategory = await CategoriesService.putById(req.body.id, req.body)
      res.status(200).send(newUpdatedCategory)
    } catch (e) {
      next(e)
    }
  }

  async deleteCategoryById(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      await CategoriesService.deleteById(req.body.id)
      res.status(204).send()
    } catch (e) {
      next(e)
    }
  }
}

export default new CategoriesController()