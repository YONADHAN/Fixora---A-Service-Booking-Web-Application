import { useMutation, useQuery } from '@tanstack/react-query'
import {
  venderProfileInfoUpdate,
  vendorLogout,
  vendorProfileInfo,
} from '@/services/vendor/vendor.service'

export const useVendorLogout = () => {
  return useMutation({
    mutationFn: async () => vendorLogout(),
  })
}

export const useVendorProfileInfo = () => {
  return useQuery({
    queryKey: ['customerProfile'],
    queryFn: async () => vendorProfileInfo(),
  })
}

export const useVenderProfileInfoUpdate = () => {
  return useMutation({
    mutationFn: (data: any) => venderProfileInfoUpdate(data),
  })
}
