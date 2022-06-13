import CategoriesService from "../../categories/services/categories.service"
import { CRUD } from "../../common/interfaces/crud.interface"
import ItemsDao from "../daos/items.dao"
import { ItemModel } from "../entities/item"
import { CreateItemDto } from "../entities/create.item.dto"
import { SearchItemDto } from "../entities/search.item.dto"

class ItemsService implements CRUD {
  async search(searchQuery: SearchItemDto): Promise<ItemModel[]> {
    return ItemsDao.searchItem(searchQuery)
  }

  async create(data: CreateItemDto, categories?: string[]): Promise<ItemModel> {
    const newItem = await ItemsDao.createItem(data)

    if (categories) {
      const categoryIds = [ ...new Set(categories) ]
      for (const categoryId of categoryIds) {
        await CategoriesService.addItemToCategoryById(categoryId, [ newItem.id ])
      }
    }

    return newItem
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

export default new ItemsService()