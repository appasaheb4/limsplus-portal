import {gql} from '@apollo/client';

export const LIST = gql`
  mutation ($input: TransmittedMessageInput!) {
    transmittedMessages(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        instType
        instId
        protocol
        segmentMessage
        segmentOrder
        segmentArray
        status
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const REMOVE_RECORD = gql`
  mutation ($input: TransmittedMessageRemoveInput!) {
    removeTransmittedMessage(input: $input) {
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
  mutation ($input: TransmittedMessageInput!) {
    filterTransmittedMessage(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        instType
        instId
        protocol
        segmentMessage
        segmentOrder
        segmentArray
        status
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
