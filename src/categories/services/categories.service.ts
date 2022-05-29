import { CRUD } from "../../common/interfaces/crud.interface"
import VenuesService from "../../venues/services/venues.service"
import CategoriesDao from "../daos/categories.dao"
import { CategoryModel, CategoryWithMenuSectionsModel } from "../entities/category"
import { CreateCategoryDto } from "../entities/create.category.dto"
import { PutCategoryDto } from "../entities/put.category.dto"
import { SearchCategoryQueryDto } from "../entities/search.category.dto"

class CategoriesService implements CRUD {
  search(searchCategoryQuery: SearchCategoryQueryDto): Promise<CategoryModel[]> {
    return CategoriesDao.search(searchCategoryQuery)
  }

  async create(data: CreateCategoryDto): Promise<CategoryModel> {
    const newCategory = await CategoriesDao.createCategory(data)
    if (data.venueId) {
      await VenuesService.addCategoryToVenueById(data.venueId, [ newCategory.id ])
    }
    return newCategory
  }

  deleteById(id: string): Promise<void> {
    return CategoriesDao.deleteCategoryById(id)
  }

  async getCategoriesWithItemsById(id: string): Promise<CategoryWithMenuSectionsModel> {
    return CategoriesDao.getCategoryWithItemsById(id)
  }

  putById(id: string, data: PutCategoryDto): Promise<any> {
    return CategoriesDao.updateCategoryById(id, data)
  }

  async addItemToCategoryById(id: string, items: string[]): Promise<void> {
    return CategoriesDao.addItemToCategoryById(id, items)
  }

  readById(id: string): Promise<CategoryWithMenuSectionsModel | null> {
    return CategoriesDao.getCategoryById(id)
  }

}

export default new CategoriesService()