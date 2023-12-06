import { gql } from '@apollo/client';

export const LIST = gql`
  mutation ($input: AdministrativeDevisionInput!) {
    administrativeDivisions(input: $input) {
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
        companyCode
        status
        environment
      }
    }
  }
`;

export const REMOVE_RECORDS = gql`
  mutation ($input: AdministrativeDevisionRemoveInput!) {
    removeAdministrativeDivision(input: $input) {
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
  mutation ($input: AdministrativeDevisionInput!) {
    filterAdministrativeDivisions(input: $input) {
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
      }
    }
  }
`;
