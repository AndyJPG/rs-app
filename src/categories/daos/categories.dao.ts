import { v4 as uuidv4 } from "uuid"
import MongooseService from "../../common/services/mongoose.service"
import { CategoryModel } from "../entities/category"
import { CreateCategoryDto } from "../entities/create.category.dto"

interface CategorySchemaModel extends CategoryModel {
  _id: string
}

class CategoriesDao {
  Schema = MongooseService.getMongoose().Schema

  categorySchema = new this.Schema<CategorySchemaModel>({
    id: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    venueId: String,
    parentCategoryId: String,
    isClosed: Boolean,
    orderingType: [ String ],
    img: String
  }, { id: false, versionKey: false })

  Category = MongooseService.getMongoose()
    .model<CategorySchemaModel>("Categories", this.categorySchema)

  async createCategory(data: CreateCategoryDto) {
    const newCategory: CategoryModel = {
      id: uuidv4(),
      name: data.name,
      slug: data.slug,
      venueId: data.venueId || null,
      parentCategoryId: data.parentCategoryId || null,
      isClosed: data.isClosed || null,
      orderingType: data.orderingType || null,
      img: data.img || null
    }
    const mongoCategory = new this.Category(newCategory)
    await mongoCategory.save()
    return newCategory.id
  }
}

export default new CategoriesDao()