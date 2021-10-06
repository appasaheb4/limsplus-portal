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
