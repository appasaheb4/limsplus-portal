import { gql } from "@apollo/client"

export const CHECK_EXISTS_USERID = gql`
  mutation($userId: String!) {
    checkUserExitsUserId(userId: $userId) {
      success
      message
      data
    }
  }
`
