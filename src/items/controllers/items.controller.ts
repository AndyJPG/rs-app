import express from "express"
import ItemsService from "../services/items.service"

class ItemsController {
  async searchItem(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const items = await ItemsService.search(req.body)
      res.status(200).send(items)
    } catch (e) {
      next(e)
    }
  }

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