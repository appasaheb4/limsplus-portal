import { gql } from "@apollo/client"

export const LIST = gql`
  mutation($input: EnviromentInput!) {
    enviroments(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        lab
        user
        department
        variable
        value
        descriptions
        environment
        environmentVariable
        category
        enteredBy
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`

export const REMOVE_RECORD = gql`
  mutation($input: EnviromentRemoveInput!) {
    removeEnviroment(input: $input) {
      success
      message
    }
  }
`

export const CREATE_RECORD = gql`
  mutation($input: CreateEnviromentInput!) {
    createEnviroment(input: $input) {
      success
      message
    }
  }
`

export const UPDATE_RECORD = gql`
  mutation($input: UpdateEnviromentInput!) {
    updateEnviroment(input: $input) {
      success
      message
    }
  }
`

export const FILTER = gql`
  mutation($input: EnviromentInput!) {
    filterEnviroment(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        lab
        user
        department
        variable
        value
        descriptions
        environment
        environmentVariable
        category
        enteredBy
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`
  
export const FILTER_BY_FIELDS = gql`
  mutation($input: EnviromentInput!) {
    filterByFieldsEnviroment(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        lab
        user
        department
        variable
        value
        descriptions
        environment
        environmentVariable
        category
        enteredBy
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`
