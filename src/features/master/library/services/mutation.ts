import { gql } from "@apollo/client"

export const LIST = gql`
  mutation($input: LibraryInput!) {
    librarys(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        code
        description
        usageType
        libraryType
        commentType
        lab
        department
        commentsTarget
        details
        parameter
        action
        results
        value
        reflex
        analyte
        rule
        abNormal
        status
        organismGroup
        organismClass
        loAge
        hiAge
        sex
        sexAction
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`

export const REMOVE_RECORDS = gql`
  mutation($input: LibraryRemoveInput!) {
    removeLibrary(input: $input) {
      success
      message
    }
  }
`

export const CREATE_RECORD = gql`
  mutation($input: CreateLibraryInput!) {
    createLibrary(input: $input) {
      success
      message
    }
  }
`

export const UPDATE_RECORD = gql`
  mutation($input: UpdateLibraryInput!) {
    updateLibrary(input: $input) {
      success
      message
    }
  }
`

export const CHECK_EXISTS_RECORD = gql`
  mutation($input: LibraryInput!) {
    checkLibrarysExistsRecord(input: $input) {
      success
      message
    }
  }
`

export const FILTER = gql`
  mutation($input: LibraryInput!) {
    filterLibrarys(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        code
        description
        usageType
        libraryType
        commentType
        lab
        department
        commentsTarget
        details
        parameter
        action
        results
        value
        reflex
        analyte
        rule
        abNormal
        status
        organismGroup
        organismClass
        loAge
        hiAge
        sex
        sexAction
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`
   
export const LIBRARYS_BY_CODE = gql`
  mutation($input: LibraryInput!) {
    librarysByCode(input: $input) {
      success
      message
      data {
        _id
        code
        description
        usageType
        libraryType
        commentType
        lab
        department
        commentsTarget
        details
        parameter
        action
        results
        value
        reflex
        analyte
        rule
        abNormal
        status
        organismGroup
        organismClass
        loAge
        hiAge
        sex
        sexAction
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`
