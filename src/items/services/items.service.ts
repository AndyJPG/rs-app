import { CRUD } from "../../common/interfaces/crud.interface"
import ItemsDao from "../daos/items.dao"
import { ItemCreateDto } from "../entities/item.create.dto"

class ItemsService implements CRUD {
  create(data: ItemCreateDto, categories?: string[]): Promise<string> {
    return ItemsDao.createItem(data, categories)
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