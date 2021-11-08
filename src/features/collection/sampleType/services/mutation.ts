import { gql } from "@apollo/client"

export const LIST = gql`
  mutation($input: SampleTypeInput!) {
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
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`

export const CREATE_RECORD = gql`
  mutation($input: CreateSampleTypeInput!) {
    createSampleType(input: $input) {
      success
      message
    }
  }
`

export const REMOVE_RECORDS = gql`
  mutation($input: SampleContainerRemoveInput!) {
    removeSampleType(input: $input) {
      success
      message
    }
  }
`
  
export const UPDATE_RECORD = gql`
  mutation($input: UpdateSampleTypeInput!) {
    updateSampleType(input: $input) {
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
  mutation($input: SampleTypeInput!) {
    checkSampleTypeExistsRecord(input: $input) {
      success
      message
    }
  }
`
