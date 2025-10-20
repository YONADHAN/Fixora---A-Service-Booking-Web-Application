export interface ICloudinaryService {
  uploadDocument(
    filePath: string,
    folder: string
  ): Promise<{
    url: string
    public_id: string
    [key: string]: any
  }>
}
