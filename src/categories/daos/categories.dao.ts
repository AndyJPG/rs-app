import { Types } from "mongoose"
import MongooseService from "../../common/services/mongoose.service"
import { CategoryModel, CategoryWithMenuSectionsModel } from "../entities/category"
import { CreateCategoryDto } from "../entities/create.category.dto"
import { PutCategoryDto } from "../entities/put.category.dto"
import { SearchCategoryQueryDto } from "../entities/search.category.dto"

interface CategorySchemaModel extends Omit<CategoryModel, "id"> {
  _id: string
  menuSections: string[]
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
    menuSections: [ { type: Types.ObjectId, ref: "Categories" } ]
  }, { id: false, versionKey: false })

  Category = MongooseService.getMongoose()
    .model<CategorySchemaModel>("Categories", this.categorySchema)

  async search(searchQuery: SearchCategoryQueryDto): Promise<CategoryModel[]> {
    const categories = await this.Category.find(searchQuery).exec()
    return categories.map(category => {
      const { _id, menuSections, ...value } = category.toJSON()
      return { id: _id, ...value }
    })
  }

  async getCategoryById(id: string): Promise<CategoryWithMenuSectionsModel | null> {
    const categoryData = await this.Category.findOne({ _id: id })
      .populate<{ menuSections: (Omit<CategoryModel, "id"> & { _id: string })[] }>("menuSections")

    if (categoryData) {
      const { _id, ...values } = categoryData.toJSON()
      const sections = categoryData.menuSections.map(menu => ({
        id: menu._id,
        venueId: menu.venueId,
        parentCategoryId: menu.parentCategoryId,
        name: menu.name,
        slug: menu.slug,
        isClosed: menu.isClosed,
        orderingType: menu.orderingType,
        img: menu.img
      }))
      return { id: _id, ...values, menuSections: sections }
    }

    return null
  }

  async createCategory(data: CreateCategoryDto): Promise<string> {
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
    return savedCategory._id
  }

  async updateCategoryById(id: string, data: PutCategoryDto): Promise<CategoryModel | null> {
    const updatedCategory = await this.Category.findOneAndUpdate({ _id: id }, { $set: data }, { new: true })

    if (updatedCategory) {
      const { _id, ...newCategory } = updatedCategory.toJSON()
      return { id: _id, ...newCategory }
    }

    return null
  }

  async deleteCategoryById(id: string): Promise<void> {
    await this.Category.deleteOne({ _id: id }).exec()
  }
}

export default new CategoriesDao()