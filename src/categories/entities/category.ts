import { ItemModel } from "../../items/entities/item"

export interface CategoryModel {
  id: string
  venueId: string | null
  parentCategoryId: string | null
  name: string
  slug: string
  isClosed: boolean | null
  orderingType: string[] | null
  img: string | null
}

export interface CategoryWithMenuSectionsModel extends CategoryModel {
  menuSections: CategoryWithMenuItemsModel[]
}

export interface CategoryWithMenuItemsModel extends CategoryModel {
  menuItems: ItemModel[]
}