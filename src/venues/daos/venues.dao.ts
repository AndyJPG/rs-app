import { Types } from "mongoose"
import { CategoryModel } from "../../categories/entities/category"
import MongooseService from "../../common/services/mongoose.service"
import { CreateVenueDto } from "../entities/create.venue.dto"
import { PutVenueDto } from "../entities/put.venue.dto"
import { SearchVenueQueryDto } from "../entities/search.venue.dto"
import { VenueModel } from "../entities/venue"

interface VenueSchemaModel extends Omit<VenueModel, "id"> {
  _id: string,
  categories: [ { type: string, ref: string } ]
}

class VenuesDao {
  Schema = MongooseService.getMongoose().Schema

  venueSchema = new this.Schema<VenueSchemaModel>({
    name: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    banner: String,
    isClosed: Boolean,
    location: String,
    logo: String,
    phone: String,
    categories: [ { type: Types.ObjectId, ref: "Categories" } ]
  }, { id: false, versionKey: false })

  Venue = MongooseService.getMongoose().model<VenueSchemaModel>("Venues", this.venueSchema)

  async searchVenue(searchQuery: SearchVenueQueryDto): Promise<VenueModel[]> {
    const { venueSlug } = searchQuery
    const query: { [key: string]: any } = {}

    if (venueSlug) {
      query.slug = venueSlug
    }

    const venuesData = await this.Venue.find(query).exec()
    return venuesData.map(venue => {
      const { _id, ...values } = venue.toJSON()
      return { id: _id, ...values }
    })
  }

  async createVenue(venue: CreateVenueDto): Promise<string> {
    const newVenue: Omit<VenueModel, "id"> = {
      name: venue.name,
      slug: venue.slug,
      banner: venue.banner || null,
      isClosed: false,
      location: venue.location || null,
      logo: venue.logo || null,
      phone: venue.phone || null
    }
    const mongoVenue = new this.Venue(newVenue)
    const savedVenue = await mongoVenue.save()
    return savedVenue._id
  }

  async updateVenue(venueId: string, venue: PutVenueDto): Promise<VenueModel | null> {
    const updateFields = [ "name", "slug", "banner", "location", "logo", "phone", "categories" ]
    for (const key in venue) {
      if (!updateFields.includes(key)) {
        delete venue[key]
      }
    }

    const updatedVenue = await this.Venue.findOneAndUpdate({ id: venueId }, { $set: venue }, { new: true })

    if (updatedVenue) {
      const { _id, ...newVenue } = updatedVenue.toJSON()
      return { id: _id, ...newVenue }
    }

    return null
  }

  async deleteVenueById(venueId: string): Promise<void> {
    await this.Venue.deleteOne({ _id: venueId }).exec()
  }

  async getVenueCategories(venueId: string): Promise<CategoryModel[]> {
    const venue = await this.Venue.findOne({ _id: venueId })
      .populate<{ categories: (Omit<CategoryModel, "id"> & { _id: string })[] }>("categories")

    if (venue) {
      return venue.categories.map(category => {
        return {
          id: category._id,
          venueId: category.venueId,
          parentCategoryId: category.parentCategoryId,
          name: category.name,
          slug: category.slug,
          isClosed: category.isClosed,
          orderingType: category.orderingType,
          img: category.img
        }
      })
    }
    return []
  }
}

export default new VenuesDao()