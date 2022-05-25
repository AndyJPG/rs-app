import { CreateVenueDto } from "./create.venue.dto"

export interface PutVenueDto extends Partial<CreateVenueDto> {
  [key: string]: any
}