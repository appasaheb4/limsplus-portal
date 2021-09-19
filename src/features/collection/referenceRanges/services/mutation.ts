import { gql } from "@apollo/client"

export const ADD_REFERENCERANGES = gql`
  mutation($input: ReferenceRangesInput!) {
    addReferenceRanges(input: $input) {
      success
      message
      id
    }
  }
`
   
export const VERSION_UPGRADE = gql`
  mutation($input: PriceListInput!) {
    versionUpgradeReferenceRanges(input: $input) {
      success
      message
    }
  }
`

export const DELETE_RECORD = gql`
  mutation($input: DelRecord!) {
    deleteReferenceRanges(input: $input) {
      success
      message
    }
  }
`

export const DUPLICATE_RECORD = gql`
  mutation($input: PriceListInput) {
    duplicateReferenceRanges(input: $input) {
      success
      message
      id
    }
  }
`

export const UPDATE_SINGE_FILED = gql`
  mutation($input: UpdateRecord) {
    updateSingleFiledReferenceRanges(input: $input) {
      success
      message
    }
  }
`

export const CHECKEXITS_PRICEG_ENV_LAB_CODE = gql`
  mutation($input: PriceListInput) {
    checkExitsPriceGEnvLabCodeReferenceRanges(input: $input) {
      success
      message
    }
  }
`
