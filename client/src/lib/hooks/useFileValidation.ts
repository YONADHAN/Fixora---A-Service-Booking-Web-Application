import { toast } from 'sonner'
import {
  ALLOWED_FILE_TYPES,
  MAX_FILE_SIZE_MB,
  MAX_FILE_COUNT,
} from '@/utils/constants/upload.constants'

export const useFileValidation = () => {
  const validateFiles = (files: File[]) => {
    if (files.length > MAX_FILE_COUNT) {
      toast.error(`You can upload a maximum of ${MAX_FILE_COUNT} files.`)
      return []
    }

    const validFiles: File[] = []
    const errors: string[] = []

    for (const file of files) {
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        errors.push(`${file.name} - Invalid type`)
        continue
      }

      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        errors.push(`${file.name} - Exceeds ${MAX_FILE_SIZE_MB}MB`)
        continue
      }
      validFiles.push(file)
    }
    if (errors.length) toast.error(errors.join('\n'))
    return validFiles
  }

  return { validateFiles }
}
