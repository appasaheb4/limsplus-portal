import {gql} from '@apollo/client';

export const LIST = gql`
  mutation ($input: SegmentMappingInput!) {
    segmentMappings(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        index
        instType
        dataFlow
        protocol
        segments
        segmentOrder
        segmentRequired
        elementNo
        elementName
        elementRequired
        elementSequence
        transmittedData
        defaultValue
        fieldArray
        repeatDelimiter
        fieldType
        fieldLength
        requiredForLims
        limsTables
        limsFields
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const REMOVE_RECORD = gql`
  mutation ($input: SegmentMappingRemoveInput!) {
    removeSegmentMapping(input: $input) {
      success
      message
    }
  }
`;

export const CREATE_RECORD = gql`
  mutation ($input: SegmentMappingInput!) {
    createSegmentMapping(input: $input) {
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
  mutation ($input: UpdateSegmentMappingInput!) {
    updateSegmentMapping(input: $input) {
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
  mutation ($input: SegmentMappingInput!) {
    filterSegmentMappings(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        index
        instType
        dataFlow
        protocol
        segments
        segmentOrder
        segmentRequired
        elementNo
        elementName
        elementRequired
        elementSequence
        transmittedData
        defaultValue
        fieldArray
        repeatDelimiter
        fieldType
        fieldLength
        requiredForLims
        limsTables
        limsFields
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
        instType
        dataFlow
        protocol
        segments
        segmentOrder
        segmentRequired
        elementNo
        elementName
        elementRequired
        elementSequence
        transmittedData
        defaultValue
        fieldArray
        repeatDelimiter
        fieldType
        fieldLength
        requiredForLims
        limsTables
        limsFields
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`;
