import { gql } from "@apollo/client"

export const LIST = gql`
  mutation($input: PossibleResultInput!) {
    possibleResults(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        analyteCode
        analyteName
        result
        possibleValue
        abNormal
        critical
        conclusionResult {
          result
          possibleValue
          abNormal
          critical
        }
        defaultConclusion
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`

export const REMOVE_RECORDS = gql`
  mutation($input: PossibleResultRemoveInput!) {
    removePossibleResult(input: $input) {
      success
      message
    }
  }
`

export const CREATE_RECORD = gql`
  mutation($input: CreatePossibleResultInput!) {
    createPossibleResult(input: $input) {
      success
      message
    }
  }
`

export const UPDATE_RECORD = gql`
  mutation($input: UpdatePossibleResultInput!) {
    updatePossibleResult(input: $input) {
      success
      message
    }
  }
`


export const CHECK_EXISTS_RECORD = gql`
  mutation($input: PossibleResultInput!) {
    checkPossibleResultExistsRecord(input: $input) {
      success
      message
    }
  }
`
