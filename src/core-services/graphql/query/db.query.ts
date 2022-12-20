import {gql} from '@apollo/client';

export const GET_COLLECTION_LIST = gql`
  query {
    getCollectionList {
      success
      message
      list
    }
  }
`;
