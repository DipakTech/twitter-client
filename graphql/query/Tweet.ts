import { graphql } from '@/gql'

export const getAllTweetQuery = graphql(`
  #graphql
  query GetAllTweet {
    getAllTweets {
      id
      content
      imageURL
      author {
        id
        firstName
        lastName
        profileImageURL
      }
    }
  }
`)
