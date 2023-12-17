import { gql } from '@apollo/client';

export const LIST = gql`
  mutation ($input: RoleInput!) {
    roles(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        code
        description
        status
        companyCode
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const REMOVE_RECORD = gql`
  mutation ($input: RoleRemoveInput!) {
    removeRole(input: $input) {
      success
      message
    }
  }
`;

export const CREATE_RECORD = gql`
  mutation ($input: CreateRoleInput!) {
    createRole(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_RECORD = gql`
  mutation ($input: UpdateRoleInput!) {
    updateRole(input: $input) {
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
  mutation ($input: RoleInput!) {
    filterRoles(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        code
        description
        status
        companyCode
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const FILTER_BY_FIELDS = gql`
  mutation ($input: RoleInput!) {
    filterByFieldsRoles(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        code
        description
        status
        companyCode
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const FIND_BY_FIELDS = gql`
  mutation ($input: RoleMappingInput!) {
    findByFieldsRoleMapping(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        code
        description
        status
        companyCode
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`;
