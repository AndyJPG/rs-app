import MongooseService from "../../common/services/mongoose.service"
import { ItemModel } from "../entities/item"
import { CreateItemDto } from "../entities/create.item.dto"
import { SearchItemDto } from "../entities/search.item.dto"

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

  async searchItem(searchQuery: SearchItemDto): Promise<ItemModel[]> {
    const { itemSlug } = searchQuery
    const query: { [key: string]: any } = {}

    if (itemSlug) {
      query.slug = itemSlug
    }

    const itemsData = await this.Item.find(query).exec()

    return itemsData.map(item => {
      const { _id, ...values } = item.toJSON()
      return { id: _id, ...values }
    })
  }

  async createItem(data: CreateItemDto): Promise<ItemModel> {
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
    const { _id, ...values } = savedItem
    return { id: _id, ...values }
  }
}

export default new ItemsDao()