import { gql } from "@apollo/client"

export const LIST = gql`
  mutation($input: SalemTeamsInput!) {
    salesTeams(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        salesHierarchy
        salesTerritory
        empCode
        empName
        reportingTo
        environment
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
  mutation($input: SalemTeamsInput!) {
    filterSalesTeams(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data{
        _id
        salesHierarchy
        salesTerritory
        empCode
        empName
        reportingTo
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`

export const FILTER_BY_FIELDS = gql`
  mutation($input: SalemTeamsInput!) {
    filterByFieldsSalesTeams(input: $input) {
      paginatorInfo {
        count
      }  
      success
      message
      data {
        _id
        salesHierarchy
        salesTerritory
        empCode
        empName
        reportingTo
        environment
        dateOfEntry
        lastUpdated
      }   
    }
  }
`