import { Model, FilterQuery } from 'mongoose'
import { IBaseRepository } from '../../domain/repositoryInterfaces/base_repository.interface'

export class BaseRepository<T> implements IBaseRepository<T> {
  constructor(protected model: Model<T>) {}

  async findOne(filter: FilterQuery<T>) {
    return this.model.findOne(filter).lean() as Promise<T>
  }

  async save(data: Partial<T>) {
    return this.model.create(data)
  }

  async delete(filter: FilterQuery<T>) {
    return this.model.findOneAndDelete(filter).lean() as Promise<T>
  }

  async update(filter: FilterQuery<T>, updateData: Partial<T>) {
    return this.model
      .findOneAndUpdate(filter, { $set: updateData }, { new: true })
      .lean() as Promise<T>
  }
}
