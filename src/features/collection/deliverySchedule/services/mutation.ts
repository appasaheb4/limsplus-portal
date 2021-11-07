import { gql } from "@apollo/client"

export const LIST = gql`
  mutation($input: DeliverySchduleInput!) {
    deliverySchdules(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        schCode
        sundayProcessing
        holidayProcessing
        sundayReporting
        holidayReporting
        pStartTime
        pEndTime
        cutofTime
        secoundCutofTime
        processingType
        schFrequency
        reportOn
        dynamicRT
        dynamicTU
        fixedRT
        onTime
        schForDept
        schForPat
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`

export const REMOVE_RECORD = gql`
  mutation($input: DeliverySchduleRemoveInput!) {
    removeDeliverySchdule(input: $input) {
      success
      message
    }
  }
`

export const CREATE_RECORD = gql`
  mutation($input: CreateDeliverySchduleInput!) {
    createDeliverySchdule(input: $input) {
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
  mutation($input: UpdateDeliverySchduleInput!) {
    updateDeliverySchdule(input: $input) {
      success
      message
    }
  }
`

export const CHECK_EXISTS_RECORD = gql`
  mutation($input: MethodsInput!) {
    checkMethodsExistsRecord(input: $input) {
      success
      message
    }
  }
`
