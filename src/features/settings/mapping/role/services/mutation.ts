import {gql} from '@apollo/client';

export const LIST = gql`
  mutation ($input: RoleMappingInput!) {
    roleMappings(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        role
        router
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const REMOVE_RECORD = gql`
  mutation ($input: RoleMappingRemoveInput!) {
    removeRoleMapping(input: $input) {
      success
      message
    }
  }
`;

export const CREATE_RECORD = gql`
  mutation ($input: CreateRoleMappingInput!) {
    createRoleMapping(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_RECORD = gql`
  mutation ($input: UpdateRoleMappingInput!) {
    updateRoleMapping(input: $input) {
      success
      message
    }
  }
`;

export const FILTER = gql`
  mutation ($input: RoleMappingInput!) {
    filterRoleMapping(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        role
        router
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
        role
        router
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`;
