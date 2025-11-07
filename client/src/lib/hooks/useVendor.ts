import { useMutation, useQuery } from '@tanstack/react-query'
import {
  uploadVerificationDocuments,
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
    queryKey: ['vendorProfile'],
    queryFn: async () => vendorProfileInfo(),
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    staleTime: 0,
    gcTime: 0,
  })
}

export const useVenderProfileInfoUpdate = () => {
  return useMutation({
    mutationFn: (data: any) => venderProfileInfoUpdate(data),
  })
}

export const useUploadVendorDocuments = () => {
  return useMutation({
    mutationFn: (files: File[]) => uploadVerificationDocuments(files),
  })
}
