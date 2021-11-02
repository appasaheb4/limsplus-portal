import { gql } from "@apollo/client"

export const LIST = gql`
  mutation($input: DesignationInput!) {
    designations(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        code
        description
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`

export const REMOVE_RECORDS = gql`
  mutation($input: DesignationRemoveInput!) {
    removeDesignation(input: $input) {
      success
      message
    }
  }
`

export const CREATE_RECORD = gql`
  mutation($input: CreateDesignationInput!) {
    createDesignation(input: $input) {
      success
      message
    }
  }
`

export const UPDATE_RECORD = gql`
  mutation($input: UpdateDesignationInput!) {
    updateDesignation(input: $input) {
      success
      message
    }
  }
`

export const EXISTS_RECORD = gql`
  mutation($input: DesignationInput!) {
    checkDesignationsExistsRecord(input: $input) {
      success
      message
    }
  }
`
