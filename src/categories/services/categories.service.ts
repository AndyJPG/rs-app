import { CRUD } from "../../common/interfaces/crud.interface"
import CategoriesDao from "../daos/categories.dao"
import { CreateCategoryDto } from "../entities/create.category.dto"

class CategoriesService implements CRUD {
  create(data: CreateCategoryDto): Promise<string> {
    return CategoriesDao.createCategory(data)
  }

  deleteById(id: string): Promise<any> {
    return Promise.resolve(undefined)
  }

  putById(id: string, data: any): Promise<any> {
    return Promise.resolve(undefined)
  }

  readById(id: string): Promise<any> {
    return Promise.resolve(undefined)
  }

}

export default new CategoriesService()