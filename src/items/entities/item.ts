export interface ItemModel {
  id: string
  name: string
  slug: string
  venueId: string
  description: string | null
  dietaryTags: string[]
  img: string | null
  isAvailable: boolean
  isPopular: boolean
  priceData: {
    displayPrice: string | null
    priceInCent: number
  }
}