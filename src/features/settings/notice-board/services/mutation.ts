import { gql } from '@apollo/client';

export const LIST = gql`
  mutation ($input: NoticeBoardInput!) {
    noticeBoards(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        lab
        header
        message
        action
        companyCode
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const REMOVE_RECORD = gql`
  mutation ($input: NoticeBoardRemoveInput!) {
    removeNoticeBoard(input: $input) {
      success
      message
    }
  }
`;

export const CREATE_RECORD = gql`
  mutation ($input: CreateNoticeBoardInput!) {
    createNoticeBoard(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_RECORD = gql`
  mutation ($input: UpdateNoticeBoardInput!) {
    updateNoticeBoard(input: $input) {
      success
      message
    }
  }
`;

export const FILTER = gql`
  mutation ($input: NoticeBoardInput!) {
    filterNoticeBoard(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        lab
        header
        message
        action
        companyCode
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const FIND_BY_FIELDS = gql`
  mutation ($input: NoticeBoardInput!) {
    findByFieldsNoticeBoard(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        lab
        header
        message
        action
        companyCode
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`;
