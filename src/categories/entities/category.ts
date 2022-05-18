export interface CategoryModel {
  id: string
  venueId: string | null
  parentCategoryId: string | null
  name: string
  slug: string
  isClosed: boolean | null
  orderingType: string[] | null
  img: string | null
}