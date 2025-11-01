import { useMutation } from '@tanstack/react-query'
import { customerLogout } from '@/services/customer/customer.service'

export const useCustomerLogout = () => {
  return useMutation({
    mutationFn: async () => customerLogout(),
  })
}
