import { gql } from "@apollo/client"

export const GET_PRICELIST = gql`
  query($page: Int, $limit: Int, $env: String, $role: String, $lab: String) {
    getAllPriceList(page: $page, limit: $limit, env: $env, role: $role, lab: $lab) {
      data {
        id
      }
      count
    }
  }
`
  
export const ADD_PRICELIST = gql`
  mutation {
    addPriceList(input: { panelCode: "new" }) {
      id
    }
  }
`
