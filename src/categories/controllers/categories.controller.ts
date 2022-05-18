import express from "express"

class CategoriesController {
  async searchCategories(req: express.Request, res: express.Response, next: express.NextFunction) {
    res.status(200).send("test categories route")
  }
}

export default new CategoriesController()