import { gql } from "@apollo/client"

export const LIST = gql`
  mutation($input: InterfaceManagerInput!) {
    interfaceManagers(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        interfaceType
        instrumentType
        instrumentName
        dataFlowFrom
        communicationProtocol
        blockStart
        blockEnd
        filed
        value
        fileds
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`

export const REMOVE_RECORD = gql`
  mutation($input: InterfaceManagerRemoveInput!) {
    removeInterfaceManager(input: $input) {
      success
      message
    }
  }
`

export const CREATE_RECORD = gql`
  mutation($input: CreateInterfaceManagerInput!) {
    createInterfaceManager(input: $input) {
      success
      message
    }
  }
`

export const UPDATE_RECORD = gql`
  mutation($input: UpdateInterfaceManagerInput!) {
    updateInterfaceManager(input: $input) {
      success
      message
    }
  }
`

export const CHECK_EXISTS_RECORD = gql`
  mutation($input: RoleInput!) {
    checkRoleExistsEnvCode(input: $input) {
      success
      message
    }
  }
`

export const FILTER = gql`
  mutation($input: InterfaceManagerInput!) {
    filterInterfaceManagers(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data{
        _id
        interfaceType
        instrumentType
        instrumentName
        dataFlowFrom
        communicationProtocol
        blockStart
        blockEnd
        filed
        value
        fileds
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`


export const FILTER_BY_FIELDS = gql`
  mutation($input: InterfaceManagerInput!) {
    filterByFieldsInterfaceManagers(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        interfaceType
        instrumentType
        instrumentName
        dataFlowFrom
        communicationProtocol
        blockStart
        blockEnd
        filed
        value
        fileds
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`