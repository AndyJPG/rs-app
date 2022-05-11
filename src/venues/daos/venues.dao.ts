import { v4 as uuidv4 } from "uuid"
import { CreateVenueDto } from "../entities/create.venue.dto"

class VenuesDao {
  async createVenue(venue: CreateVenueDto): Promise<string> {
    venue.id = uuidv4()
    console.log(venue)
    return venue.id
  }
}

export default new VenuesDao()