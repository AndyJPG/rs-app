import { CRUD } from "../../common/interfaces/crud.interface"
import CategoriesDao from "../daos/categories.dao"
import { CategoryModel } from "../entities/category"
import { CreateCategoryDto } from "../entities/create.category.dto"

class CategoriesService implements CRUD {
  search(): Promise<CategoryModel[]> {
    return CategoriesDao.search()
  }

  create(data: CreateCategoryDto): Promise<string> {
    return CategoriesDao.createCategory(data)
  }

  deleteById(id: string): Promise<void> {
    return CategoriesDao.deleteCategoryById(id)
  }

  putById(id: string, data: any): Promise<any> {
    return Promise.resolve(undefined)
  }

  readById(id: string): Promise<any> {
    return Promise.resolve(undefined)
  }

}

export default new CategoriesService()