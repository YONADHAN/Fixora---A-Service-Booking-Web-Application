import { useMutation, useQuery } from '@tanstack/react-query'
import {
  adminLogout,
  changeMyUserBlockStatus,
  getAllCustomers,
  getAllVendors,
} from '@/services/admin/admin.service'

export const useAdminLogout = () => {
  return useMutation({
    mutationFn: async () => adminLogout(),
  })
}

export const useGetAllCustomers = ({
  page,
  limit,
  search,
  role,
}: {
  page: number
  limit: number
  search: string
  role: string
}) => {
  return useQuery({
    queryKey: ['admin-customers', page, limit, search, role],
    queryFn: () => getAllCustomers({ page, limit, search, role }),
  })
}

export const useGetAllVendors = ({
  page,
  limit,
  search,
}: {
  page: number
  limit: number
  search: string
}) => {
  return useQuery({
    queryKey: ['admin-vendors', page, limit, search],
    queryFn: () => getAllVendors({ page, limit, search }),
  })
}

export const useChangeMyUserBlockStatus = ({
  role,
  userId,
  status,
}: {
  role: string
  userId: string
  status: string
}) => {
  return useMutation({
    mutationFn: async () => changeMyUserBlockStatus({ role, userId, status }),
  })
}
