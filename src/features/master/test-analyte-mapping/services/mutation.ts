import {gql} from '@apollo/client';

export const LIST = gql`
  mutation ($input: TestAnalyteMappingInput!) {
    testAnalyteMappings(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        existsVersionId
        existsRecordId
        dateCreation
        dateActive
        dateExpire
        version
        enteredBy
        lab
        analyteCode
        analyteName
        testCode
        testName
        bill
        testMethod
        analyteMethod
        resultOrder
        reportOrder
        status
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const REMOVE_RECORD = gql`
  mutation ($input: TestAnalyteMappingRemoveInput!) {
    removeTestAnalyteMapping(input: $input) {
      success
      message
    }
  }
`;

export const CREATE_RECORD = gql`
  mutation ($input: CreateTestAnalyteMappingInput!) {
    createTestAnalyteMapping(input: $input) {
      success
      message
    }
  }
`;

export const VERSION_UPGRADE = gql`
  mutation ($input: CreateTestAnalyteMappingInput!) {
    versionUpgradeTestAnalyteMappings(input: $input) {
      success
      message
    }
  }
`;

export const DUPLICATE_RECORD = gql`
  mutation ($input: CreateTestAnalyteMappingInput!) {
    duplicateTestAnalyteMappings(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_RECORD = gql`
  mutation ($input: UpdateTestAnalyteMappingInput!) {
    updateTestAnalyteMapping(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_ORDER_SEQ_RECORD = gql`
  mutation ($input: UpdateTestAnalyteMappingInput!) {
    updateRROTestAnalyteMapping(input: $input) {
      success
      message
    }
  }
`;

export const CHECK_EXISTS_RECORD = gql`
  mutation ($input: TestAnalyteMappingInput!) {
    checkTestAnalyteMappingsExistsRecord(input: $input) {
      success
      message
    }
  }
`;

export const FILTER = gql`
  mutation ($input: TestAnalyteMappingInput!) {
    filterTestAnalyteMappings(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        existsVersionId
        existsRecordId
        dateCreation
        dateActive
        dateExpire
        version
        enteredBy
        lab
        analyteCode
        analyteName
        testCode
        testName
        bill
        testMethod
        analyteMethod
        resultOrder
        reportOrder
        status
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const FIND_BY_FILEDS = gql`
  mutation ($input: TestAnalyteMappingInput!) {
    findByFiledsTestAnalyteMappings(input: $input) {
      success
      message
      data {
        _id
        existsVersionId
        existsRecordId
        dateCreation
        dateActive
        dateExpire
        version
        enteredBy
        lab
        analyteCode
        analyteName
        testCode
        testName
        bill
        testMethod
        analyteMethod
        resultOrder
        reportOrder
        status
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`;
