import { v4 as uuidv4 } from "uuid"
import { CategoryModel } from "../../categories/entities/category"
import MongooseService from "../../common/services/mongoose.service"
import { CreateVenueDto } from "../entities/create.venue.dto"
import { PutVenueDto } from "../entities/put.venue.dto"
import { SearchVenueQueryDto } from "../entities/search.venue.dto"
import { VenueModel } from "../entities/venue"

interface VenueSchemaModel extends VenueModel {
  _id: string,
  categories: [ { type: string, ref: string } ]
}

class VenuesDao {
  Schema = MongooseService.getMongoose().Schema

  venueSchema = new this.Schema<VenueSchemaModel>({
    id: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    banner: String,
    isClosed: Boolean,
    location: String,
    logo: String,
    phone: String,
    categories: [ { type: String, ref: "Categories" } ]
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
      return values
    })
  }

  async createVenue(venue: CreateVenueDto): Promise<string> {
    const newVenue: VenueModel = {
      id: uuidv4(),
      name: venue.name,
      slug: venue.slug,
      banner: venue.banner || null,
      isClosed: false,
      location: venue.location || null,
      logo: venue.logo || null,
      phone: venue.phone || null
    }
    const mongoVenue = new this.Venue(newVenue)
    await mongoVenue.save()
    return newVenue.id
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
      return newVenue
    }

    return null
  }

  async deleteVenueById(venueId: string): Promise<void> {
    await this.Venue.deleteOne({ id: venueId }).exec()
  }

  async getVenueCategories(venueId: string): Promise<CategoryModel[]> {
    try {
      const categories = await this.Venue.findOne({ id: venueId }).populate("categories")
      console.log(categories)
    } catch (e) {
      console.log(e)
    }
    return []
  }
}

export default new VenuesDao()