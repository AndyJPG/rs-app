export interface CreateVenueDto {
  name: string
  slug: string
  banner?: string
  location?: string
  locationLink?: string
  logo?: string
  phone?: string | string[]
}