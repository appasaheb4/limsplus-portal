import { gql } from '@apollo/client';

export const LIST = gql`
  mutation ($input: SampleTypeInput!) {
    sampleTypes(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        sampleCode
        sampleType
        descriptions
        sampleGroup
        companyCode
        status
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const CREATE_RECORD = gql`
  mutation ($input: CreateSampleTypeInput!) {
    createSampleType(input: $input) {
      success
      message
    }
  }
`;

export const REMOVE_RECORDS = gql`
  mutation ($input: SampleContainerRemoveInput!) {
    removeSampleType(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_RECORD = gql`
  mutation ($input: UpdateSampleTypeInput!) {
    updateSampleType(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_IMAGE = gql`
  mutation ($input: UpdateSampleContainerInput!) {
    updateSampleContainersImage(input: $input) {
      success
      message
    }
  }
`;

export const CHECK_EXISTS_RECORD = gql`
  mutation ($input: SampleTypeInput!) {
    checkSampleTypeExistsRecord(input: $input) {
      success
      message
    }
  }
`;

export const FILTER = gql`
  mutation ($input: SampleTypeInput!) {
    filterSampleTypes(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        sampleCode
        sampleType
        descriptions
        sampleGroup
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
  mutation ($input: SampleTypeInput!) {
    filterByFieldsSampleTypes(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        sampleCode
        sampleType
        descriptions
        sampleGroup
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
  mutation ($input: SampleTypeInput!) {
    findByFieldsSampleTypes(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        sampleCode
        sampleType
        descriptions
        sampleGroup
        companyCode
        status
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`;
