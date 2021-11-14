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

export const LOGOUT = gql`
  mutation($input: UserInput!) {
    logout(input: $input) {
      success
      message
    }
  }
`
  

export const FORGOT_PASSWORD = gql`
  mutation($input: UserInput!) {
    userForgotPassword(input: $input) {
      success
      message
    }
  }
`

export const SESSION_ALLOWED_LOGOUT = gql`
  mutation($input: UserInput!) {
    usersSessionAllowedLogout(input: $input) {
      success
      message
      data
    }
  }
`