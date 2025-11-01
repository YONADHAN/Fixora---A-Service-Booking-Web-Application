import { useMutation } from '@tanstack/react-query'
import { vendorLogout } from '@/services/vendor/vendor.service'

export const useVendorLogout = () => {
  return useMutation({
    mutationFn: async () => vendorLogout(),
  })
}
