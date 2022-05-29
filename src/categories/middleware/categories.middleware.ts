import express from "express"

class CategoriesMiddleware {
  async extractCategoryId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.body.id = req.params.categoryId
    next()
  }
}

export default new CategoriesMiddleware()