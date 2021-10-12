import { gql } from "@apollo/client"

export const LABS_LIST = gql`
mutation($input: LabInput!) {
    labs(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data 
    }
  }
`;

export const REMOVE_LABS = gql`
mutation($input: RemoveLabInput!) {
  removeLab(input: $input) {
      success
      message
    }
  }
`;