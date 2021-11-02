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
`

export const REMOVE_LABS = gql`
  mutation($input: RemoveLabInput!) {
    removeLab(input: $input) {
      success
      message
    }
  }
`

export const CREATE_LAB = gql`
  mutation($input: CreateLabInput!) {
    createLab(input: $input) {
      success
      message
    }
  }
`

export const UPDATE_LAB = gql`
  mutation($input: UpdateLabInput!) {
    updateLab(input: $input) {
      success
      message
    }
  }
`

export const UPDATE_LAB_IMAGE = gql`
  mutation($input: UpdateLabInput!) {
    updateLabImages(input: $input) {
      success
      message
    }
  }
`

export const CHECK_EXISTS_RECORD = gql`
  mutation($input: LabInput!) {
    checkLabExitsEnvCode(input: $input) {
      success
      message
    }
  }
`
