export interface CreateCategoryDto {
  venueId?: string
  parentCategoryId?: string
  name: string
  slug: string
  isClosed?: boolean
  orderingType?: string[]
  img?: string
}