export interface ItemCreateDto {
  name: string
  slug: string
  venueId: string
  description?: string
  dietaryTags?: string[]
  img?: string
  isAvailable?: boolean
  isPopular?: boolean
  displayPrice?: string
  priceInCent: number
}