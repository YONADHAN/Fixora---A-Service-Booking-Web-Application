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

  async findAll(
    page: number,
    limit: number,
    search: string = ''
  ): Promise<T[]> {
    const filter: FilterQuery<T> = search
      ? ({
          name: { $regex: search, $options: 'i' },
        } as FilterQuery<T>)
      : {}

    const results = await this.model
      .find(filter)
      .limit(limit)
      .skip((page - 1) * limit)
      .lean()

    return results as unknown as T[]
  }
}
