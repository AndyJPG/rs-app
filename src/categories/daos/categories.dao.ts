import { Types } from "mongoose"
import MongooseService from "../../common/services/mongoose.service"
import { CategoryModel } from "../entities/category"
import { CreateCategoryDto } from "../entities/create.category.dto"
import { PutCategoryDto } from "../entities/put.category.dto"

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

  async search(): Promise<CategoryModel[]> {
    const categories = await this.Category.find().exec()
    return categories.map(category => {
      const { _id, ...value } = category.toJSON()
      return { id: _id, ...value }
    })
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