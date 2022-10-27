import {gql} from '@apollo/client';

export const LOGIN = gql`
  mutation ($input: LoginUserInput!) {
    login(input: $input) {
      token
      success
      message
      data
    }
  }
`;

export const USER_LIST = gql`
  mutation ($input: UserInput!) {
    users(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data
    }
  }
`;

export const CHECK_EXISTS_USERID = gql`
  mutation ($userId: String!) {
    checkUserExitsUserId(userId: $userId) {
      success
      message
      data
    }
  }
`;

export const CHECK_EXISTS_EMPCODE = gql`
  mutation ($empCode: String!) {
    checkUserByEmpCode(empCode: $empCode) {
      success
      message
    }
  }
`;

export const UPDATE_USER = gql`
  mutation ($input: UpdateUserInput!) {
    updateUser(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_IMAGE = gql`
  mutation ($input: UpdateUserInput!) {
    updateUserImages(input: $input) {
      success
      message
      data
    }
  }
`;

export const REMOVE_USER = gql`
  mutation ($input: RemoveUserInput!) {
    removeUser(input: $input) {
      success
      message
    }
  }
`;

export const CREATE_USER = gql`
  mutation ($input: CreateUserInput!) {
    createUser(input: $input) {
      success
      message
    }
  }
`;

export const PASSWORD_RESEND = gql`
  mutation ($input: UserInput!) {
    reSendUserPassword(input: $input) {
      success
      message
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation ($input: UserInput!) {
    userChnagePassword(input: $input) {
      success
      message
    }
  }
`;

export const CHANGE_PASSWORD_BY_ADMIN = gql`
  mutation ($input: UserInput!) {
    userChnagePasswordByAdmin(input: $input) {
      success
      message
    }
  }
`;

export const SWITCH_ACCESS = gql`
  mutation ($input: UserInput!) {
    userSwitchAccess(input: $input) {
      success
      message
      data
    }
  }
`;

export const FILTER_USERS_BY_KEY = gql`
  mutation ($input: UserInput!) {
    usersFilterByKey(input: $input) {
      success
      message
      data
    }
  }
`;

export const FILTER = gql`
  mutation ($input: UserInput!) {
    filterUsers(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data
    }
  }
`;

export const FILTER_BY_FIELDS = gql`
  mutation ($input: UserInput!) {
    filterByFieldsUser(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data
    }
  }
`;

export const FIND_BY_FIELDS = gql`
  mutation ($input: UserInput!) {
    findByFieldsUser(input: $input) {
      success
      message
      data
    }
  }
`;

export const GENERATEOTP = gql`
  mutation ($input: LoginUserInput!) {
    generateOtpApp(input: $input) {
      success
      message
      data
    }
  }
`;

export const VERIFYOTP = gql`
  mutation ($input: LoginUserInput!) {
    verifyOtpApp(input: $input) {
      success
      message
      data
    }
  }
`;

export const GET_USER_BY_MATCH_USER_ID = gql`
  mutation ($input: UserInput!) {
    getUserByMatchUserId(input: $input) {
      success
      message
      data
    }
  }
`;
