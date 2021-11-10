import { gql } from "@apollo/client"

export const LIST = gql`
  mutation($input: DataConversationInput!) {
    dataConversations(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        hexadecimal
        binary
        ascii
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`

export const REMOVE_RECORD = gql`
  mutation($input: DataConversationRemoveInput!) {
    removeDataConversation(input: $input) {
      success
      message
    }
  }
`

export const CREATE_RECORD = gql`
  mutation($input: CreateDataConversationInput!) {
    createDataConversation(input: $input) {
      success
      message
    }
  }
`

export const UPDATE_RECORD = gql`
  mutation($input: UpdateDataConversationInput!) {
    updateDataConversation(input: $input) {
      success
      message
    }
  }
`

export const CHECK_EXISTS_RECORD = gql`
  mutation($input: RoleInput!) {
    checkRoleExistsEnvCode(input: $input) {
      success
      message
    }
  }
`
