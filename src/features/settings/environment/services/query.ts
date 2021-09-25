import { gql } from "@apollo/client"

export const GET_ALL_ENVIRONMENT = gql`
  query($filter: FilterInput, $page: Int, $limit: Int) {
    getAllEnvironment(filter: $filter, page: $page, limit: $limit) {
        success
        message
      data {
        _id
        environmentVariable
        category
        descriptions
        enteredBy
        dateOfEntry
        lastUpdated
      }
      count
    }
  }
`
