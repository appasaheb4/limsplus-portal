import { gql } from '@apollo/client';

export const LIST = gql`
  mutation ($input: InstrumentResultMappingInput!) {
    instrumentResultMappings(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        index
        key
        pLab
        testCode
        testName
        department
        instType
        instId
        analyteCode
        analyteName
        assayCode
        instTest
        environment
        companyCode
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const REMOVE_RECORD = gql`
  mutation ($input: InstrumentResultMappingRemoveInput!) {
    removeInstrumentResultMapping(input: $input) {
      success
      message
    }
  }
`;

export const CREATE_RECORD = gql`
  mutation ($input: InstrumentResultMappingInput!) {
    createInstrumentResultMapping(input: $input) {
      success
      message
    }
  }
`;

export const IMPORT_RECORDS = gql`
  mutation ($input: CreateSegmentMappingInput!) {
    importSegmentMapping(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_RECORD = gql`
  mutation ($input: UpdateInstrumentResultMappingInput!) {
    updateInstrumentResultMapping(input: $input) {
      success
      message
    }
  }
`;

export const CHECK_EXISTS_RECORD = gql`
  mutation ($input: RoleInput!) {
    checkRoleExistsEnvCode(input: $input) {
      success
      message
    }
  }
`;

export const FILTER = gql`
  mutation ($input: InstrumentResultMappingInput!) {
    filterInstrumentResultMappings(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        index
        key
        pLab
        testCode
        testName
        department
        instType
        instId
        analyteCode
        analyteName
        assayCode
        instTest
        companyCode
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const FIND_BY_FIELDS = gql`
  mutation ($input: SegmentMappingInput!) {
    findByFieldsSegmentMapping(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        index
        key
        pLab
        testCode
        testName
        department
        instType
        instId
        analyteCode
        analyteName
        assayCode
        instTest
        companyCode
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const FETCH_KEYS_VALUE = gql`
  mutation ($input: InstrumentResultMappingInput!) {
    fetchKeysValueInstResultMapping(input: $input) {
      success
      message
      result
    }
  }
`;
