import { gql } from "@apollo/client"


export const USER_LIST = gql `
 mutation($input: UserInput!) {
  users(input:$input){
    paginatorInfo{
      count
    }
    success
    message
    data
  }
 }
`;


export const CHECK_EXISTS_USERID = gql`
  mutation($userId: String!) {
    checkUserExitsUserId(userId: $userId) {
      success
      message
      data
    }
  }
`
