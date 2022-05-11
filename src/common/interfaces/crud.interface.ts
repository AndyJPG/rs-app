export interface CRUD {
  create: (data: any) => Promise<any>
  readById: (id: string) => Promise<any>
  putById: (id: string, data: any) => Promise<any>
  deleteById: (id: string) => Promise<any>
}