import { gql } from '@apollo/client';

export const LIST = gql`
  mutation ($input: SalemTeamsInput!) {
    salesTeams(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        salesTerritory
        description
        empCode
        reportingTo
        empName
        salesHierarchy
        targets
        enteredBy
        dateCreation
        dateActive
        dateExpire
        version
        companyCode
        status
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const REMOVE_RECORD = gql`
  mutation ($input: SalemTeamsRemoveInput!) {
    removeSalesTeam(input: $input) {
      success
      message
    }
  }
`;

export const CREATE_RECORD = gql`
  mutation ($input: CreateSalesTeamInput!) {
    createSalesTeam(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_RECORD = gql`
  mutation ($input: UpdateSalesTeamInput!) {
    updateSalesTeam(input: $input) {
      success
      message
    }
  }
`;

export const EXISTS_RECORD = gql`
  mutation ($input: SalemTeamsInput!) {
    checkSalesTeamsExistsRecord(input: $input) {
      success
      message
    }
  }
`;

export const FILTER = gql`
  mutation ($input: SalemTeamsInput!) {
    filterSalesTeams(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        salesTerritory
        description
        empCode
        reportingTo
        empName
        salesHierarchy
        targets
        enteredBy
        dateCreation
        dateActive
        dateExpire
        version
        companyCode
        status
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const FILTER_BY_FIELDS = gql`
  mutation ($input: SalemTeamsInput!) {
    filterByFieldsSalesTeams(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        salesTerritory
        description
        empCode
        reportingTo
        empName
        salesHierarchy
        targets
        enteredBy
        dateCreation
        dateActive
        dateExpire
        version
        companyCode
        status
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const FIND_BY_FIELDS = gql`
  mutation ($input: SalemTeamsInput!) {
    findByFieldsSalesTeams(input: $input) {
      success
      message
      data {
        _id
        salesTerritory
        description
        empCode
        reportingTo
        empName
        salesHierarchy
        targets
        enteredBy
        dateCreation
        dateActive
        dateExpire
        version
        companyCode
        status
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const GET_SALES_HIERARCHYLIST = gql`
  mutation ($input: SalemTeamsInput!) {
    getSalesHierarchyList(input: $input) {
      success
      message
      list
    }
  }
`;
