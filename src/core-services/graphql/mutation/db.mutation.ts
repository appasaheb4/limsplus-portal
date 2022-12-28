import {gql} from '@apollo/client';

export const GET_COLLECTION_FIELDS = gql`
  mutation ($input: SegmentMappingInput!) {
    getCollectionFields(input: $input) {
      success
      message
      result
    }
  }
`;
