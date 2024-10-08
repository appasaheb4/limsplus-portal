import { gql } from '@apollo/client';

export const LIST = gql`
  mutation ($input: SampleContainerInput!) {
    sampleContainers(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        containerCode
        containerName
        description
        image
        companyCode
        status
        environment
        tubeName
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const CREATE_RECORD = gql`
  mutation ($input: CreateSampleContainerInput!) {
    createSampleContainer(input: $input) {
      success
      message
    }
  }
`;

export const REMOVE_RECORDS = gql`
  mutation ($input: SampleContainerRemoveInput!) {
    removeSampleContainer(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_RECORD = gql`
  mutation ($input: UpdateSampleContainerInput!) {
    updateSampleContainer(input: $input) {
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
  mutation ($input: SampleContainerInput!) {
    checkSampleContainersExistsRecord(input: $input) {
      success
      message
    }
  }
`;

export const FILTER = gql`
  mutation ($input: SampleContainerInput!) {
    filterSampleContainers(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        containerCode
        containerName
        description
        image
        tubeName
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
  mutation ($input: SampleContainerInput!) {
    filterByFieldsSampleContainers(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        containerCode
        containerName
        description
        image
        companyCode
        tubeName
        status
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const FIND_BY_FIELDS = gql`
  mutation ($input: SampleContainerInput!) {
    findByFieldsSampleContainers(input: $input) {
      success
      message
      data {
        _id
        containerCode
        containerName
        description
        image
        tubeName
        companyCode
        status
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`;
