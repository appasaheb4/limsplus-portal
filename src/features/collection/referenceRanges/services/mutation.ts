import { gql } from "@apollo/client"

export const LIST = gql`
  mutation($input: ReferenceRangeInput!) {
    referenceRanges(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {  
        _id
        existsVersionId
        existsRecordId
        analyteCode
        analyteName
        department
        species
        sex
        rangeSetOn
        eqType
        lab
        rangType
        age
        ageUnit
        low
        high
        alpha
        enteredBy
        status
        environment
        dateCreation
        dateActive
        dateExpire
        version
        deltarang_tetype
        deltaInterval
        intervalUnit
        formatResultScript
        reportDefault
        dateOfEntry
        lastUpdated
      }
    }
  }
`

export const REMOVE_RECORD = gql`
  mutation($input: ReferenceRangeRemoveInput!) {
    removeReferenceRange(input: $input) {
      success
      message
    }
  }
`

export const CREATE_RECORD = gql`
  mutation($input: CreateReferenceRangeInput!) {
    createReferenceRange(input: $input) {
      success
      message
    }
  }
`

export const VERSION_UPGRADE = gql`
  mutation($input: CreateReferenceRangeInput!) {
    versionUpgradeReferenceRange(input: $input) {
      success
      message
    }
  }
`

export const DUPLICATE_RECORD = gql`
  mutation($input: CreateReferenceRangeInput!) {
    duplicateReferenceRange(input: $input) {
      success
      message
    }
  }
`

export const UPDATE_RECORD = gql`
  mutation($input: UpdateReferenceRangeInput!) {
    updateReferenceRange(input: $input) {
      success
      message
    }
  }
`

export const CHECK_EXISTS_RECORD = gql`
  mutation($input: ReferenceRangeInput!) {
    checkReferenceRangeExistsRecord(input: $input) {
      success
      message
    }
  }
`

export const FILTER = gql`
  mutation($input: ReferenceRangeInput!) {
    filterReferenceRange(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data{
        _id
        existsVersionId
        existsRecordId
        analyteCode
        analyteName
        department
        species
        sex
        rangeSetOn
        eqType
        lab
        rangType
        age
        ageUnit
        low
        high
        alpha
        enteredBy
        status
        environment
        dateCreation
        dateActive
        dateExpire
        version
        deltarang_tetype
        deltaInterval
        intervalUnit
        formatResultScript
        reportDefault
        dateOfEntry
        lastUpdated
      }
    }
  }
`