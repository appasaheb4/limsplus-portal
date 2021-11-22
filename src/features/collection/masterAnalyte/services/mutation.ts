import { gql } from "@apollo/client"

export const LIST = gql`
  mutation($input: AnalyteMasterInput!) {
    analyteMasters(input: $input) {
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

export const FILTER = gql`
  mutation($input: AnalyteMasterInput!) {
    filterAnalyteMaster(input: $input) {
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
