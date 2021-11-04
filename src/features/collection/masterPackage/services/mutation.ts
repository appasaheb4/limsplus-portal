import { gql } from "@apollo/client"

export const LIST = gql`
  mutation($input: PackageMasterInput!) {
    packageMasters(input: $input) {
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
        packageCode
        packageName
        panelCode
        panelName
        bill
        status
        serviceType
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`

export const REMOVE_RECORD = gql`
  mutation($input: PackageMasterRemoveInput!) {
    removePackageMaster(input: $input) {
      success
      message
    }
  }
`

export const CREATE_RECORD = gql`
  mutation($input: CreatePackageMasterInput!) {
    createPackageMaster(input: $input) {
      success
      message
    }
  }
`

export const VERSION_UPGRADE = gql`
  mutation($input: CreatePackageMasterInput!) {
    versionUpgradePackageMaster(input: $input) {
      success
      message
    }
  }
`
   
export const DUPLICATE_RECORD = gql`
  mutation($input: CreatePackageMasterInput!) {
    duplicatePackageMaster(input: $input) {
      success
      message
    }
  }
`
   
export const UPDATE_RECORD = gql`
  mutation($input: UpdatePackageMasterInput!) {
    updatePackageMaster(input: $input) {
      success
      message
    }
  }
`

export const CHECK_EXISTS_RECORD = gql`
  mutation($input: PackageMasterInput!) {
    checkPackageMasterExistsRecord(input: $input) {
      success
      message
    }
  }
`
