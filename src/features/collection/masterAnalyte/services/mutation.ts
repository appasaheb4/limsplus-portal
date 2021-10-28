import { gql } from "@apollo/client"

export const LIST = gql`
  mutation($input: AnalyteMasterInput!) {
    analyteMasters(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data{
          _id
          existsVersionId
          existsRecordId
          dateCreation
          dateActiveFrom
          dateActiveTo
          version
          enteredBy
          lab
          analyteCode
          analyteName
          description
          shortName
          bill
          price
          schedule
          autoRelease
          holdOOS
          instantResult
          tubeGroups
          pageBreak
          method
          analyteMethod
          workflow
          sampleType
          display
          calculationFlag
          calcyName
          high
          low
          repetition
          picture
          units
          usage
          cptCode
          resultType
          analyteType
          status  
          environment
          dateOfEntry
          lastUpdated
      }
    }
  }
`

export const REMOVE_RECORD = gql`
  mutation($input: AnalyteMasterRemoveInput!) {
    removeAnalyteMaster(input: $input) {
      success
      message
    }
  }
`

export const CREATE_RECORD = gql`
  mutation($input: CreateLabInput!) {
    createLab(input: $input) {
      success
      message
    }
  }
`

export const UPDATE_RECORD = gql`
  mutation($input: UpdateLabInput!) {
    updateLab(input: $input) {
      success
      message
    }
  }
`

export const CHECK_EXISTS_RECORD = gql`
  mutation($input: LabInput!) {
    checkLabExitsEnvCode(input: $input) {
      success
      message
    }
  }
`
