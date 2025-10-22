import { useQuery, useMutation } from '@tanstack/react-query'
import { authService } from '@/services/auth/auth.service'

export const useAuth = () => {
  const loginMutation = useMutation({
    mutationFn: authService.login,
  })

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: authService.getProfile,
    enabled: false, // only fetch when logged in
  })

  return { loginMutation, profile, profileLoading }
}
