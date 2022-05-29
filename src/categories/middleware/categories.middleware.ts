import express from "express"
import createHttpError from "http-errors"
import VenuesService from "../../venues/services/venues.service"
import CategoriesService from "../services/categories.service"

class CategoriesMiddleware {
  async extractCategoryId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.body.id = req.params.categoryId
    next()
  }

  async categoryExist(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const id = req.params.categoryId
    try {
      if (!id) {
        next(createHttpError(400, "Missing category id"))
      }

      const category = await CategoriesService.readById(id)
      if (!category) {
        next(createHttpError(400, "Category not exist"))
      }

      next()
    } catch (e) {
      next(createHttpError(400, "Invalid category id"))
    }
  }

  async validateCreateCategory(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const { venueId, parentCategoryId } = req.body
    try {
      if (venueId) {
        const venue = await VenuesService.readById(venueId)
        if (!venue) {
          next(createHttpError(400, "Venue doesn't exist"))
        }
      }

      if (parentCategoryId) {
        const category = await CategoriesService.readById(parentCategoryId)
        if (!category) {
          next(createHttpError(400, "Category doesn't exist"))
        }
      }

      next()
    } catch (e) {
      next(createHttpError(400, "Invalid data"))
    }
  }
}

export default new CategoriesMiddleware()