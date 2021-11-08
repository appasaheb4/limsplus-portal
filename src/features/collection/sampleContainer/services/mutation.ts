import { gql } from "@apollo/client"

export const LIST = gql`
  mutation($input: SampleContainerInput!) {
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
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`

export const CREATE_RECORD = gql`
  mutation($input: CreateSampleContainerInput!) {
    createSampleContainer(input: $input) {
      success
      message
    }
  }
`

export const REMOVE_RECORDS = gql`
  mutation($input: SampleContainerRemoveInput!) {
    removeSampleContainer(input: $input) {
      success
      message
    }
  }
`

export const UPDATE_RECORD = gql`
  mutation($input: UpdateSampleContainerInput!) {
    updateSampleContainer(input: $input) {
      success
      message
    }
  }
`

export const UPDATE_IMAGE = gql`
  mutation($input: UpdateSampleContainerInput!) {
    updateSampleContainersImage(input: $input) {
      success
      message
    }
  }
`

 

export const CHECK_EXISTS_RECORD = gql`
  mutation($input: SampleContainerInput!) {
    checkSampleContainersExistsRecord(input: $input) {
      success
      message
    }
  }
`
