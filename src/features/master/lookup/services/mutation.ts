import { gql } from "@apollo/client"

export const LOOKUPITEM_BY_PATH = gql`
  mutation($path: String!) {
    lookupItemsByPath(path: $path) {
      success
      message
      data {
        _id
        defaultItem {
          code
          value
        }
        documentName {
          name
          title
          path
          children
        }
        fieldName
        arrValue {
          code
          value
        }
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`

export const LOOKUPITEM_BY_PATH_N_FIELD = gql`
  mutation($input: LookupInput!) {
    lookupItemsByPathNField(input: $input) {
      success
      message
      data {
        _id
        defaultItem {
          code
          value
        }
        documentName {
          name
          title
          path
          children
        }
        fieldName
        arrValue {
          code
          value
        }
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`

export const LIST = gql`
  mutation($input: LookupInput!) {
    lookups(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        defaultItem {
          code
          value
        }
        documentName {
          name
          title
          path
          children
        }
        fieldName
        arrValue {
          code
          value
        }
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`

export const CREATE_DOCUMENT_RECORD = gql`
  mutation($input: CreateLookupInput!) {
    createLookup(input: $input) {
      success
      message
    }
  }
`

export const REMOVE_DOCUMENT_RECORD = gql`
  mutation($input: LookupRemoveInput!) {
    removeLookup(input: $input) {
      success
      message
    }
  }
`

export const UPDATE_RECORD = gql`
  mutation($input: UpdateLookupInput!) {
    updateLookup(input: $input) {
      success
      message
    }
  }
`
  
export const GENERAL_SETTINGS_UPDATE = gql`
  mutation($input: CreateLookupInput!) {
    lookupGeneralSettingsUpdate(input: $input) {
      success
      message
    }
  }
`

export const FILTER = gql`
  mutation($input: LookupInput!) {
    filterLookups(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data{
        _id
        defaultItem {
          code
          value
        }
        documentName {
          name
          title
          path
          children
        }
        fieldName
        arrValue {
          code
          value
        }
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`
