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
        rangeSetOn
        equipmentType
        lab
        rangeType
        sex
        ageFrom
        ageTo
        ageUnit
        low
        high
        alpha
        deltaType
        deltaInterval
        intervalUnit
        colorLo
        colorHi
        colorNormal
        version
        dateCreation
        dateActive
        dateExpire
        enterBy
        status
        environment
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
  mutation($input: ReferenceRangeInput!) {
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
      data {
        _id
        existsVersionId
        existsRecordId
        analyteCode
        analyteName
        department
        species
        rangeSetOn
        equipmentType
        lab
        rangeType
        sex
        ageFrom
        ageTo
        ageUnit
        low
        high
        alpha
        deltaType
        deltaInterval
        intervalUnit
        colorLo
        colorHi
        colorNormal
        version
        dateCreation
        dateActive
        dateExpire
        enterBy
        status
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`

export const FILTER_BY_FIELDS = gql`
  mutation($input: ReferenceRangeInput!) {
    filterByFieldsReferenceRanges(input: $input) {
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
        rangeSetOn
        equipmentType
        lab
        rangeType
        sex
        ageFrom
        ageTo
        ageUnit
        low
        high
        alpha
        deltaType
        deltaInterval
        intervalUnit
        colorLo
        colorHi
        colorNormal
        version
        dateCreation
        dateActive
        dateExpire
        enterBy
        status
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`
