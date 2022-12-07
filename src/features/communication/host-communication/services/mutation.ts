import {gql} from '@apollo/client';

export const CONNECT = gql`
  mutation ($input: HostCommunicationInput!) {
    connectHostCommunication(input: $input) {
      success
      message
    }
  }
`;
