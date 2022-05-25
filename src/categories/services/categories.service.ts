import { CRUD } from "../../common/interfaces/crud.interface"
import CategoriesDao from "../daos/categories.dao"
import { CategoryModel, CategoryWithMenuSectionsModel } from "../entities/category"
import { CreateCategoryDto } from "../entities/create.category.dto"
import { PutCategoryDto } from "../entities/put.category.dto"
import { SearchCategoryQueryDto } from "../entities/search.category.dto"

class CategoriesService implements CRUD {
  search(searchCategoryQuery: SearchCategoryQueryDto): Promise<CategoryModel[]> {
    return CategoriesDao.search(searchCategoryQuery)
  }

  create(data: CreateCategoryDto): Promise<string> {
    return CategoriesDao.createCategory(data)
  }

  deleteById(id: string): Promise<void> {
    return CategoriesDao.deleteCategoryById(id)
  }

  putById(id: string, data: PutCategoryDto): Promise<any> {
    return CategoriesDao.updateCategoryById(id, data)
  }

  readById(id: string): Promise<CategoryWithMenuSectionsModel | null> {
    return CategoriesDao.getCategoryById(id)
  }

}

export default new CategoriesService()