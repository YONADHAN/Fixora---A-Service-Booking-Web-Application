import { useMutation } from '@tanstack/react-query'
import { adminLogout } from '@/services/admin/admin.service'

export const useAdminLogout = () => {
  return useMutation({
    mutationFn: async () => adminLogout(),
  })
}
