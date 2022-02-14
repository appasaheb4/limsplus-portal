import { gql } from "@apollo/client"

export const LIST = gql`
  mutation($input: TestPanelMappingInput!) {
    testPanelMappings(input: $input) {
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
        panelCode
        testCode
        testName
        bill
        status
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`

export const REMOVE_RECORD = gql`
  mutation($input: TestPanelMappingRemoveInput!) {
    removeTestPanelMapping(input: $input) {
      success
      message
    }
  }
`

export const CREATE_RECORD = gql`
  mutation($input: CreateTestPanelMappingInput!) {
    createTestPanelMapping(input: $input) {
      success
      message
    }
  }
`

export const VERSION_UPGRADE = gql`
  mutation($input: CreateTestPanelMappingInput!) {
    versionUpgradeTestPanelMappings(input: $input) {
      success
      message
    }
  }
`
    
export const DUPLICATE_RECORD = gql`
  mutation($input: CreateTestPanelMappingInput!) {
    duplicateTestPanelMappings(input: $input) {
      success
      message
    }
  }
`   

export const UPDATE_RECORD = gql`
  mutation($input: UpdateTestPanelMappingInput!) {
    updateTestPanelMapping(input: $input) {
      success
      message
    }
  }
`

export const CHECK_EXISTS_RECORD = gql`
  mutation($input: TestPanelMappingInput!) {
    checkTestPanelMappingsExistsRecord(input: $input) {
      success
      message
    }
  }
`


export const FILTER = gql`
  mutation($input: TestPanelMappingInput!) {
    filterTestPanelMappings(input: $input) {
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
        panelCode
        testCode
        testName
        bill
        status
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`