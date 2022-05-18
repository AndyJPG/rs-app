import { v4 as uuidv4 } from "uuid"
import MongooseService from "../../common/services/mongoose.service"
import { CreateVenueDto } from "../entities/create.venue.dto"
import { SearchVenueQueryDto } from "../entities/search.venue.dto"
import { VenueModel } from "../entities/venue"

interface VenueSchemaModel extends VenueModel {
  _id: string
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
    phone: String
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

  async deleteVenueById(venueId: string): Promise<void> {
    await this.Venue.deleteOne({ id: venueId }).exec()
  }
}

export default new VenuesDao()