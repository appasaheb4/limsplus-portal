import { gql } from "@apollo/client"

export const ADD_PRICELIST = gql`
  mutation($input: PriceListInput!) {
    addPriceList(input: $input) {
      success
      message
      id
    }
  }
`   

export const VERSION_UPGRADE = gql`
  mutation($input: PriceListInput!) {
    versionUpgradePriceList(input: $input) {
      success
      message
    }
  }
`

export const DELETE_RECORD = gql`
  mutation($input: DelRecord!) {
    deletePriceList(input: $input) {
      success
      message
    }
  }
`

export const DUPLICATE_RECORD = gql`
  mutation($input: PriceListInput) {
    duplicatePriceList(input: $input) {
      success
      message
      id
    }
  }
`
  
export const UPDATE_SINGE_FILED = gql`
  mutation($input: UpdateRecord) {
    updateSingleFiledPriceList(input: $input) {
      success
      message
    }
  }
`
  
export const CHECKEXITS_PRICEG_ENV_LAB_CODE = gql`
mutation($input: PriceListInput) {
  checkExitsPriceGEnvLabCodePriceList(input: $input) {
      success
      message
    }
  }
`;
