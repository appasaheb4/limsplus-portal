import {gql} from '@apollo/client';

export const RECEIPTS_LIST = gql`
  mutation ($input: ReceiptInput!) {
    receipts(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        headerId
        labId
        grossAmount
        netAmount
        discount
        receivedAmount
        balance
        acClass
        enteredBy
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`;
