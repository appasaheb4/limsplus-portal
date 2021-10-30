import { gql } from "@apollo/client"
   
export const LIST = gql`
  mutation($input: SectionInput!) {
    sections(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        departmentCode
        code
        name
        shortName
        sectionInCharge
        mobieNo
        contactNo
        fyiLine
        workLine
        status
        environment
        dateOfEntry
        lastUpdated  
      }
    }
  }
`

export const REMOVE_RECORD = gql`
  mutation($input: TestAnalyteMappingRemoveInput!) {
    removeTestAnalyteMapping(input: $input) {
      success
      message
    }
  }
`

export const CREATE_RECORD = gql`
  mutation($input: CreateAnalyteMasterInput!) {
    createAnalyteMaster(input: $input) {
      success
      message
    }
  }
`

export const VERSION_UPGRADE = gql`
  mutation($input: CreateAnalyteMasterInput!) {
    versionUpgradeAnalyteMaster(input: $input) {
      success
      message
    }
  }
`

export const DUPLICATE_RECORD = gql`
  mutation($input: CreateAnalyteMasterInput!) {
    duplicateAnalyteMaster(input: $input) {
      success
      message
    }
  }
`

export const UPDATE_RECORD = gql`
  mutation($input: UpdateAnalyteMasterInput!) {
    updateAnalyteMaster(input: $input) {
      success
      message
    }
  }
`

export const CHECK_EXISTS_RECORD = gql`
  mutation($input: AnalyteMasterInput!) {
    checkAnalyteMasterExistsRecord(input: $input) {
      success
      message
    }
  }
`
