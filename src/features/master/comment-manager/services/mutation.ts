import { gql } from '@apollo/client';

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
        companyCode
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
  mutation ($input: CommentManagerRemoveInput!) {
    removeCommentManager(input: $input) {
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
  mutation ($input: UpdateCommentManagerInput!) {
    updateCommentManager(input: $input) {
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
  mutation ($input: CommentManagerInput!) {
    filterCommentManager(input: $input) {
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
        companyCode
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
        companyCode
      }
    }
  }
`;

export const FIND_BY_FIELDS = gql`
  mutation ($input: CommentManagerInput!) {
    findByFieldsCommentManger(input: $input) {
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
        companyCode
      }
    }
  }
`;
