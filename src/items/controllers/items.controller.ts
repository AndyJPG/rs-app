import express from "express"
import ItemsService from "../services/items.service"

class ItemsController {
  async createItem(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const { categories, ...value } = req.body
      const newItemId = await ItemsService.create(value, categories)
      res.status(201).send({ id: newItemId })
    } catch (e) {
      next(e)
    }
  }
}

export default new ItemsController()