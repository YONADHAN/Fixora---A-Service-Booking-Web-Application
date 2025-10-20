import { v2 as cloudinary } from 'cloudinary'
import { injectable } from 'tsyringe'
import { ICloudinaryService } from '../../domain/serviceInterfaces/cloudinary_service_interface'
import { config } from '../../shared/config'

@injectable()
export class CloudinaryService implements ICloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: config.cloudinary.CLOUDINARY_CLOUD_NAME,
      api_key: config.cloudinary.CLOUDINARY_API_KEY,
      api_secret: config.cloudinary.CLOUDINARY_API_SECRET,
    })
  }

  async uploadDocument(filePath: string, folder: string) {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: 'auto',
    })
    return result
  }
}
