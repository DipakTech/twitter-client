import { graphql } from '@/gql'

export const getAllTweetQuery = graphql(`
  #graphql
  query GetAllTweet {
    getAllTweets {
      id
      content
      imageURL
      author {
        firstName
        lastName
        profileImageURL
      }
    }
  }
`)
