import { gql } from '@apollo/client';

export const LIST = gql`
  mutation ($input: MethodsInput!) {
    methods(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        methodsCode
        methodsName
        description
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
  mutation ($input: MethodsRemoveInput!) {
    removeMethod(input: $input) {
      success
      message
    }
  }
`;

export const CREATE_RECORD = gql`
  mutation ($input: CreateMethodInput!) {
    createMethod(input: $input) {
      success
      message
    }
  }
`;

export const VERSION_UPGRADE = gql`
  mutation ($input: CreateAnalyteMasterInput!) {
    versionUpgradeAnalyteMaster(input: $input) {
      success
      message
    }
  }
`;

export const DUPLICATE_RECORD = gql`
  mutation ($input: CreateAnalyteMasterInput!) {
    duplicateAnalyteMaster(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_RECORD = gql`
  mutation ($input: UpdateMethodInput!) {
    updateMethod(input: $input) {
      success
      message
    }
  }
`;

export const CHECK_EXISTS_RECORD = gql`
  mutation ($input: MethodsInput!) {
    checkMethodsExistsRecord(input: $input) {
      success
      message
    }
  }
`;

export const FILTER = gql`
  mutation ($input: MethodsInput!) {
    filterMethods(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        methodsCode
        methodsName
        description
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
  mutation ($input: MethodsInput!) {
    filterByFieldsMethods(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        methodsCode
        methodsName
        description
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
  mutation ($input: MethodsInput!) {
    findByFieldsMethod(input: $input) {
      success
      message
      data {
        _id
        methodsCode
        methodsName
        description
        companyCode
        status
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`;
