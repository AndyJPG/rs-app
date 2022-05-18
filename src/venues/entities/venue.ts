export interface VenueModel {
  id: string
  name: string
  slug: string
  banner: string | null
  isClosed: boolean
  location: string | null
  logo: string | null
  phone: string | string[] | null
}