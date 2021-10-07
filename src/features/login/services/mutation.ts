import { gql } from "@apollo/client"

export const LOGIN = gql`
  mutation($input: LoginUserInput!) {
    login(input: $input) {
      token
      success
      message
      data
    }
  }
`

export const STATUS_UPDATE = gql`
  mutation($input: UserInput!) {
    userAccountStatusUpdate(input: $input) {
      success
      message
    }
  }
`
