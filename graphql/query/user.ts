import { graphql } from '../../gql'

export const verifyUserGoogleTokenQuery = graphql(
  `
    #graphql
    query VerifyUserGoogleToken($token: String!) {
      verifyGoogleToken(token: $token)
    }
  `
)

export const getCurrentUserQuery = graphql(
  `
    query GetCurrentUser {
      getCurrentUser {
        id
        firstName
        lastName
        profileImageURL
        tweets {
          id
          content

          author {
            firstName
            lastName
            profileImageURL
          }
        }
      }
    }
  `
)

export const getUserByIdQuery = graphql(
  `
    query GetUserById($id: ID!) {
      getUserById(id: $id) {
        id
        firstName
        lastName
        profileImageURL

        tweets {
          id
          content
          author {
            id
            firstName
            lastName
            profileImageURL
          }
        }
      }
    }
  `
)
