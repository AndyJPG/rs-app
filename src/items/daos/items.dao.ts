import CategoriesService from "../../categories/services/categories.service"
import MongooseService from "../../common/services/mongoose.service"
import { ItemModel } from "../entities/item"
import { ItemCreateDto } from "../entities/item.create.dto"

interface ItemSchemaModel extends Omit<ItemModel, "id"> {
  _id: string
}

class ItemsDao {
  Schema = MongooseService.getMongoose().Schema

  itemSchema = new this.Schema<ItemSchemaModel>({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    venueId: { type: String, required: true },
    description: String,
    dietaryTags: [ String ],
    img: String,
    isAvailable: Boolean,
    isPopular: Boolean,
    priceData: {
      displayPrice: String,
      priceInCent: { type: Number, required: true }
    }
  }, { id: false, versionKey: false })

  Item = MongooseService.getMongoose().model<ItemSchemaModel>("Items", this.itemSchema)

  async createItem(data: ItemCreateDto, categories?: string[]): Promise<string> {
    const newItem: Omit<ItemModel, "id"> = {
      name: data.name,
      slug: data.slug,
      venueId: data.venueId,
      description: data.description || null,
      dietaryTags: data.dietaryTags || [],
      img: data.img || null,
      isAvailable: data.isAvailable || true,
      isPopular: data.isPopular || false,
      priceData: {
        displayPrice: data.displayPrice || null,
        priceInCent: data.priceInCent
      }
    }
    const mongoItem = new this.Item(newItem)
    const savedItem = await mongoItem.save()

    if (categories) {
      const categoryIds = [ ...new Set(categories) ]
      for (const categoryId of categoryIds) {
        await CategoriesService.addItemToCategoryById(categoryId, [ savedItem._id ])
      }
    }

    return savedItem._id
  }
}

export default new ItemsDao()