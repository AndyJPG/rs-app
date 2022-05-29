import { Types } from "mongoose"
import MongooseService from "../../common/services/mongoose.service"
import { ItemModel } from "../../items/entities/item"
import { CategoryModel, CategoryWithMenuSectionsModel } from "../entities/category"
import { CreateCategoryDto } from "../entities/create.category.dto"
import { PutCategoryDto } from "../entities/put.category.dto"
import { SearchCategoryQueryDto } from "../entities/search.category.dto"

interface CategorySchemaModel extends Omit<CategoryModel, "id"> {
  _id: string
  menuSections: string[]
  menuItems: string[]
}

class CategoriesDao {
  Schema = MongooseService.getMongoose().Schema

  categorySchema = new this.Schema<CategorySchemaModel>({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    venueId: String,
    parentCategoryId: String,
    isClosed: Boolean,
    orderingType: [ String ],
    img: String,
    menuSections: [ { type: Types.ObjectId, ref: "Categories" } ],
    menuItems: [ { type: Types.ObjectId, ref: "Items" } ]
  }, { id: false, versionKey: false })

  Category = MongooseService.getMongoose()
    .model<CategorySchemaModel>("Categories", this.categorySchema)

  async search(searchQuery: SearchCategoryQueryDto): Promise<CategoryModel[]> {
    const categories = await this.Category.find(searchQuery).exec()
    return categories.map(category => {
      const { _id, menuSections, menuItems, ...value } = category.toJSON()
      return { id: _id, ...value }
    })
  }

  async getCategoryById(id: string): Promise<CategoryWithMenuSectionsModel | null> {
    const categoryData = await this.Category.findOne({ _id: id })
      .populate<{ menuSections: (Omit<CategoryModel, "id"> & { _id: string })[] }>("menuSections")

    if (categoryData) {
      const { _id, menuItems, ...values } = categoryData.toJSON()
      const sections = categoryData.menuSections.map(menu => ({
        id: menu._id,
        venueId: menu.venueId,
        parentCategoryId: menu.parentCategoryId,
        name: menu.name,
        slug: menu.slug,
        isClosed: menu.isClosed,
        orderingType: menu.orderingType,
        img: menu.img,
        menuItems: []
      }))
      return { id: _id, ...values, menuSections: sections }
    }

    return null
  }

  async getCategoryWithItemsById(id: string): Promise<CategoryWithMenuSectionsModel> {
    const categoryData = await this.Category.findOne({ _id: id })
      .populate<{ menuSections: (Omit<CategoryModel, "id"> & { _id: string, menuItems: (Omit<ItemModel, "id"> & { _id: string })[] })[] }>({
        path: "menuSections",
        populate: { path: "menuItems" }
      })


    if (categoryData) {
      const { _id, menuItems, ...values } = categoryData.toJSON()
      const sections = categoryData.menuSections.map(menu => ({
        id: menu._id,
        venueId: menu.venueId,
        parentCategoryId: menu.parentCategoryId,
        name: menu.name,
        slug: menu.slug,
        isClosed: menu.isClosed,
        orderingType: menu.orderingType,
        img: menu.img,
        menuItems: menu.menuItems.map(item => ({
          id: item._id,
          name: item.name,
          slug: item.slug,
          venueId: item.venueId,
          description: item.description,
          dietaryTags: item.dietaryTags,
          img: item.img,
          isAvailable: item.isAvailable,
          isPopular: item.isPopular,
          priceData: item.priceData
        }))
      }))
      return { id: _id, ...values, menuSections: sections }
    }

    return {
      id: "",
      img: null,
      isClosed: null,
      menuSections: [],
      name: "",
      orderingType: null,
      parentCategoryId: null,
      slug: "",
      venueId: null
    }
  }

  async createCategory(data: CreateCategoryDto): Promise<CategoryModel> {
    const newCategory: Omit<CategoryModel, "id"> = {
      name: data.name,
      slug: data.slug,
      venueId: data.venueId || null,
      parentCategoryId: data.parentCategoryId || null,
      isClosed: data.isClosed || null,
      orderingType: data.orderingType || null,
      img: data.img || null
    }
    const mongoCategory = new this.Category(newCategory)
    const savedCategory = await mongoCategory.save()
    const { _id, ...values } = savedCategory
    return { id: _id, ...values }
  }

  async addMenuSectionToCategoryById(id: string, categories: string[]): Promise<void> {
    await this.Category.findOneAndUpdate({ _id: id }, { $push: { menuSections: [ ...categories ] } })
  }

  async updateCategoryById(id: string, data: PutCategoryDto): Promise<CategoryModel | null> {
    const updatedCategory = await this.Category.findOneAndUpdate({ _id: id }, { $set: data }, { new: true })

    if (updatedCategory) {
      const { _id, ...newCategory } = updatedCategory.toJSON()
      return { id: _id, ...newCategory }
    }

    return null
  }

  async addItemToCategoryById(id: string, items: string[]): Promise<void> {
    await this.Category.findOneAndUpdate({ _id: id }, { $push: { menuItems: [ ...items ] } })
  }

  async deleteCategoryById(id: string): Promise<void> {
    await this.Category.deleteOne({ _id: id }).exec()
  }
}

export default new CategoriesDao()