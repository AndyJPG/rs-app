import { CRUD } from "../../common/interfaces/crud.interface"
import VenuesDao from "../daos/venues.dao"
import { SearchVenueDto } from "../entities/search.venue.dto"
import { VenueModel } from "../entities/venue"

class VenuesService implements CRUD {
  async search(searchVenue?: SearchVenueDto): Promise<VenueModel[]> {
    return []
  }

  create(data: any): Promise<string> {
    return VenuesDao.createVenue(data)
  }

  deleteById(id: string): Promise<any> {
    return Promise.resolve(undefined)
  }

  putById(id: string, data: any): Promise<any> {
    return Promise.resolve(undefined)
  }

  readById(id: string): Promise<any> {
    return Promise.resolve(undefined)
  }
}

export default new VenuesService()