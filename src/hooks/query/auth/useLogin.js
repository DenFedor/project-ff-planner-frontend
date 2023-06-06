import { useMutation } from '@tanstack/react-query'
import { login } from '../../../api'
import { queryKeys } from '../queryKeys'

export const useLogin = () => {
  const { mutate, isLoading } = useMutation({
    mutationKey: [queryKeys.login],
    mutationFn: login,
    onError: () => {
      // Add error function if it will be needed
    },
    onSuccess: () => {
      // Add error function if it will be needed
    },
  })

  return {
    login: ({ password, name }) => mutate({ password, name }),
    isLoading,
  }
}
