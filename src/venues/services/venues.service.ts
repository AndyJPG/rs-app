import { CRUD } from "../../common/interfaces/crud.interface"
import VenuesDao from "../daos/venues.dao"
import { SearchVenueQueryDto } from "../entities/search.venue.dto"
import { VenueModel } from "../entities/venue"

class VenuesService implements CRUD {
  async search(searchQuery: SearchVenueQueryDto): Promise<VenueModel[]> {
    return VenuesDao.searchVenue(searchQuery)
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