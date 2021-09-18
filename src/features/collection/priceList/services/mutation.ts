import { gql } from "@apollo/client"

export const ADD_PRICELIST = gql`
  mutation AddPriceList($input: PriceListInput!) {
    addPriceList(input: $input) {
      success
      message
      id
    }
  }
`

export const VERSION_UPGRADE = gql`
  mutation($input: PriceListInput!) {
    versionUpgrade(input: $input) {
      success
      message
    }
  }
`

export const DELETE_RECORD = gql`
  mutation($input: DelRecord!) {
    deleteRecord(input: $input) {
      success
      message
    }
  }
`

export const DUPLICATE_RECORD = gql`
  mutation($input: PriceListInput) {
    duplicateRecord(input: $input) {
      success
      message
      id
    }
  }
`
  
export const UPDATE_SINGE_FILED = gql`
  mutation($input: UpdateRecord) {
    updateSingleFiled(input: $input) {
      success
      message
    }
  }
`

export const CHECKEXITS_PRICEG_ENV_LAB_CODE = gql`
mutation($input: PriceListInput) {
  checkExitsPriceGEnvLabCode(input: $input) {
      success
      message
    }
  }
`;
