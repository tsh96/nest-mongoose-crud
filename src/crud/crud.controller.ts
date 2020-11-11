import { CrudService } from "./crud.service";


export class CrudController<Service extends CrudService, FilterQuery> {
  constructor(protected readonly service: Service) { }

  async createMany(bodies: any[]) {
    return this.service.createMany(bodies)
  }

  async findById(id: string) {
    return this.service.findById(id)
  }

  async findMany(filter: FilterQuery, limit: number, skip: number, sort: string[], select: string[]) {
    return this.service.findMany(filter, limit, skip, sort, select)
  }

  async updateOne(id: string, body: any) {
    return this.service.updateOne(id, body)
  }

  async updateMany(filter: FilterQuery, bodies: any[]) {
    return this.service.updateMany(filter, bodies)
  }

  async deleteById(id: string) {
    return this.service.deleteById(id)
  }

  async deleteMany(ids: string[]) {
    return this.service.deleteMany(ids)
  }
}

