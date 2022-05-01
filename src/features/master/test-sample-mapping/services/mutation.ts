import {gql} from '@apollo/client';

export const LIST = gql`
  mutation ($input: TestSampleMappingInput!) {
    testSampleMappings(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        testCode
        testName
        sampleCode
        sampleType
        sampleGroup
        collContainerCode
        collContainerName
        testContainerCode
        testContainerName
        primaryContainer
        uniqueContainer
        centerIfuge
        aliquot
        labSpecfic
        departmentSpecfic
        sharedSample
        minDrawVol
        minDrawVolUnit
        minTestVol
        minTestVolUnit
        condition
        repentionPeriod
        repentionUnits
        labelInst
        printLabels
        info
        departments
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const CREATE_RECORD = gql`
  mutation ($input: CreateTestSampleMappingInput!) {
    createTestSampleMapping(input: $input) {
      success
      message
    }
  }
`;

export const REMOVE_RECORDS = gql`
  mutation ($input: TestSampleMappingRemoveInput!) {
    removeTestSampleMapping(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_RECORD = gql`
  mutation ($input: UpdateTestSampleMappingInput!) {
    updateTestSampleMapping(input: $input) {
      success
      message
    }
  }
`;

export const CHECK_EXISTS_RECORD = gql`
  mutation ($input: TestSampleMappingInput!) {
    checkTestSampleMappingsExistsRecord(input: $input) {
      success
      message
    }
  }
`;

export const FILTER = gql`
  mutation ($input: TestSampleMappingInput!) {
    filterTestSampleMappings(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        testCode
        testName
        sampleCode
        sampleType
        sampleGroup
        collContainerCode
        collContainerName
        testContainerCode
        testContainerName
        primaryContainer
        uniqueContainer
        centerIfuge
        aliquot
        labSpecfic
        departmentSpecfic
        sharedSample
        minDrawVol
        minDrawVolUnit
        minTestVol
        minTestVolUnit
        condition
        repentionPeriod
        repentionUnits
        labelInst
        printLabels
        info
        departments
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`;
