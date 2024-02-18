import { graphqqlClient } from '@/clients/api'
import { CreateTweetData } from '@/gql/graphql'
import { createTweetMutation } from '@/graphql/mutation/tweet'
import { getAllTweetQuery } from '@/graphql/query/Tweet'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export const useGetAllTweets = () => {
  const query = useQuery({
    queryKey: ['all-tweets'],
    queryFn: () => graphqqlClient.request(getAllTweetQuery),
  })
  return { ...query, tweets: query.data?.getAllTweets }
}

export const useCreateTweet = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (payload: CreateTweetData) =>
      graphqqlClient.request(createTweetMutation, { payload }),

    onMutate: () => toast.loading('creating tweet...', { id: '1' }),
    onSuccess: async () => {
      await queryClient.invalidateQueries(['all-tweets'])
      toast.success('tweet created', { id: '1' })
    },
  })
  return mutation
}
