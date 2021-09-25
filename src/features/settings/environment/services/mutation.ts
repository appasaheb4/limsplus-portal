import { gql } from "@apollo/client"

export const ADD_ENVIRONMENT = gql`
  mutation($input: EnvironmentInput) {
    addEnvironment(input: $input) {
      success
      message
      id
    }
  }
`

export const DELETE_ENVIRONMENT = gql`
  mutation($input: DelEnvironment) {
    deleteEnvironment(input: $input) {
      success
      message
    }
  }
`

export const UPDATE_SINGEL = gql`
  mutation($input: UpdateEnvironmentRecord) {
    updateSingleFiledEnvironment(input: $input) {
      success
      message
    }
  }
`
