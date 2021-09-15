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
