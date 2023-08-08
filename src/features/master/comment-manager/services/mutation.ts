import {gql} from '@apollo/client';

export const LIST = gql`
  mutation ($input: CommentManagerInput!) {
    commentManagers(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        existsVersionId
        existsRecordId
        code
        libraryCode
        lab
        department
        investigationType
        investigationCode
        investigationName
        species
        sex
        instType
        commentsType
        commentsFor
        ageFrom
        ageFromUnit
        ageTo
        ageToUnit
        low
        high
        alpha
        status
        enteredBy
        dateCreation
        dateActive
        dateExpire
        versions
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const REMOVE_RECORDS = gql`
  mutation ($input: LibraryRemoveInput!) {
    removeLibrary(input: $input) {
      success
      message
    }
  }
`;

export const CREATE_RECORD = gql`
  mutation ($input: CreateCommentManagerInput!) {
    createCommentManager(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_RECORD = gql`
  mutation ($input: UpdateLibraryInput!) {
    updateLibrary(input: $input) {
      success
      message
    }
  }
`;

export const CHECK_EXISTS_RECORD = gql`
  mutation ($input: LibraryInput!) {
    checkLibrarysExistsRecord(input: $input) {
      success
      message
    }
  }
`;

export const FILTER = gql`
  mutation ($input: LibraryInput!) {
    filterLibrarys(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        code
        libraryCode
        lab
        department
        position
        groups
        libraryType
        parameter
        editable
        details
        status
        enteredBy
        dateCreation
        dateActive
        dateExpire
        versions
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const LIBRARYS_BY_CODE = gql`
  mutation ($input: LibraryInput!) {
    librarysByCode(input: $input) {
      success
      message
      data {
        _id
        code
        libraryCode
        lab
        department
        position
        groups
        libraryType
        parameter
        editable
        details
        status
        enteredBy
        dateCreation
        dateActive
        dateExpire
        versions
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const FILTER_BY_FIELDS = gql`
  mutation ($input: LibraryInput!) {
    filterByFieldsLibrarys(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        code
        libraryCode
        lab
        department
        position
        groups
        libraryType
        parameter
        editable
        details
        status
        enteredBy
        dateCreation
        dateActive
        dateExpire
        versions
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const FIND_BY_FIELDS = gql`
  mutation ($input: LibraryInput!) {
    findByFieldsLibrarys(input: $input) {
      success
      message
      data {
        _id
        code
        libraryCode
        lab
        department
        position
        groups
        libraryType
        parameter
        editable
        details
        status
        enteredBy
        dateCreation
        dateActive
        dateExpire
        versions
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`;
