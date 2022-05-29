import { CategoryModel } from "../../categories/entities/category"
import { CRUD } from "../../common/interfaces/crud.interface"
import VenuesDao from "../daos/venues.dao"
import { PutVenueDto } from "../entities/put.venue.dto"
import { SearchVenueQueryDto } from "../entities/search.venue.dto"
import { VenueModel } from "../entities/venue"

class VenuesService implements CRUD {
  async search(searchQuery: SearchVenueQueryDto): Promise<VenueModel[]> {
    return VenuesDao.searchVenue(searchQuery)
  }

  create(data: any): Promise<string> {
    return VenuesDao.createVenue(data)
  }

  async addCategoryToVenueById(venueId: string, categories: string[]): Promise<void> {
    return VenuesDao.addCategoryToVenueById(venueId, categories)
  }

  deleteById(id: string): Promise<void> {
    return VenuesDao.deleteVenueById(id)
  }

  putById(id: string, data: PutVenueDto): Promise<VenueModel | null> {
    return VenuesDao.updateVenue(id, data)
  }

  readById(id: string): Promise<VenueModel | null> {
    return VenuesDao.getVenueById(id)
  }

  async getVenueCategories(id: string): Promise<CategoryModel[]> {
    return VenuesDao.getVenueCategories(id)
  }
}

export default new VenuesService()