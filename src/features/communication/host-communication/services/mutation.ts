import {gql} from '@apollo/client';

export const CONNECT = gql`
  mutation ($input: HostCommunicationInput!) {
    connectHostCommunication(input: $input) {
      success
      message
    }
  }
`;

export const CREATE_TRANSMITTED_MESSAGE = gql`
  mutation ($input: TransmittedMessageInput!) {
    createTransmittedMessage(input: $input) {
      success
      message
    }
  }
`;
