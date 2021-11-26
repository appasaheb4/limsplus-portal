import { gql } from "@apollo/client"

export const LIST = gql`
  mutation($input: LoginActivityInput!) {
    loginActivitys(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        user
        systemInfo
        dateOfEntry
        lastUpdated
      }
    }
  }
`

export const REMOVE_RECORD = gql`
  mutation($input: SalemTeamsRemoveInput!) {
    removeSalesTeam(input: $input) {
      success
      message
    }
  }
`

export const CREATE_RECORD = gql`
  mutation($input: CreateSalesTeamInput!) {
    createSalesTeam(input: $input) {
      success
      message
    }
  }
`

export const UPDATE_RECORD = gql`
  mutation($input: UpdateSalesTeamInput!) {
    updateSalesTeam(input: $input) {
      success
      message
    }
  }
`

export const EXISTS_RECORD = gql`
  mutation($input: SalemTeamsInput!) {
    checkSalesTeamsExistsRecord(input: $input) {
      success
      message
    }
  }
`

export const FILTER = gql`
  mutation($input: LoginActivityInput!) {
    filterLoginActivitys(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data{
        _id
        user
        systemInfo
        dateOfEntry
        lastUpdated
      }
    }
  }
`