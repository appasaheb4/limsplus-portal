import { gql } from "@apollo/client"

export const LABS_LIST = gql`
mutation($input: LabInput!) {
    labs(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        name
        code
      }
    }
  }
`;