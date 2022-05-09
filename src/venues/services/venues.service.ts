import { SearchVenueDto } from "../entities/search.venue.dto"
import { VenueModel } from "../entities/venue"

class VenuesService {
  async search(searchVenue?: SearchVenueDto): Promise<VenueModel[]> {
    return []
  }
}

export default new VenuesService()