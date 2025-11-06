import { UpdateResult } from 'mongoose'

export interface IBaseRepository<T> {
  findOne(filter: any): Promise<T | null>
  save(data: Partial<T>): Promise<T>
  delete(filter: any): Promise<T | null>
  update(filter: any, updateData: Partial<T>): Promise<T>
  findAll(page: number, limit: number, search?: string): Promise<T[]>
}
