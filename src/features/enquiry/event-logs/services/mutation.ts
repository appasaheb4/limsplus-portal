import { gql } from '@apollo/client';

export const LIST = gql`
  mutation ($input: EventLogInput!) {
    eventLogs(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        documents
        pId
        labId
        rLab
        sampleId
        pLab
        oLab
        department
        panelCode
        testCode
        analyteCode
        event
        eventOn
        oldValue
        newValue
        deleteValue
        eventDate
        eventBy
        companyCode
        environment
        comments
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const REMOVE_RECORDS = gql`
  mutation ($input: EventLogRemoveInput!) {
    removeEventLog(input: $input) {
      success
      message
    }
  }
`;

export const CREATE_RECORD = gql`
  mutation ($input: CreateAdministrativeDivisionInput!) {
    createAdministrativeDivision(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_RECORD = gql`
  mutation ($input: UpdateAdministrativeDivisionInput!) {
    updateAdministrativeDivision(input: $input) {
      success
      message
    }
  }
`;

export const FILTER = gql`
  mutation ($input: EventLogInput!) {
    filterEventLog(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        documents
        pId
        labId
        rLab
        sampleId
        pLab
        oLab
        department
        panelCode
        testCode
        analyteCode
        event
        eventOn
        oldValue
        newValue
        deleteValue
        eventDate
        companyCode
        environment
        eventBy
        comments
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const FIND_BY_FIELDS = gql`
  mutation ($input: AdministrativeDevisionInput!) {
    findByFieldsAdministrativeDevision(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        country
        state
        district
        city
        area
        postalCode
        sbu
        zone
        status
        environment
        companyCode
      }
    }
  }
`;
