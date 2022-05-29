import express from "express"
import ItemsService from "../services/items.service"

class ItemsController {
  async createItem(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const { categories, ...value } = req.body
      const newItem = await ItemsService.create(value, categories)
      res.status(201).send({ id: newItem.id })
    } catch (e) {
      next(e)
    }
  }
}

export default new ItemsController()