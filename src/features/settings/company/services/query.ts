import {gql} from '@apollo/client';

export const GET_BANNER_LIST_ALL = gql`
  query {
    bannersListAll {
      success
      message
      data {
        image
      }
    }
  }
`;
