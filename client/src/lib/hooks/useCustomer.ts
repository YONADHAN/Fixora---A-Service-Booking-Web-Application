import { useMutation, useQuery } from '@tanstack/react-query'
import {
  customerLogout,
  customerProfileInfo,
  customerProfileInfoUpdate,
} from '@/services/customer/customer.service'

export const useCustomerLogout = () => {
  return useMutation({
    mutationFn: async () => customerLogout(),
  })
}
export const useCustomerProfileInfo = () => {
  return useQuery({
    queryKey: ['customerProfile'],
    queryFn: async () => customerProfileInfo(),
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    staleTime: 0,
    gcTime: 0,
  })
}

export const useCustomerProfileInfoUpdate = () => {
  return useMutation({
    mutationFn: (data: any) => customerProfileInfoUpdate(data),
  })
}
