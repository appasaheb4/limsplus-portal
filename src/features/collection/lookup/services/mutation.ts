import { gql } from "@apollo/client"

export const LOOKUPITEM_BY_PATH = gql`
  mutation($path: String!) {
    lookupItemsByPath(path: $path) {
      success
      message
      data
    }
  }
`
