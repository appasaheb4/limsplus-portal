import { gql } from '@apollo/client';

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
        customerName
        grossAmount
        netAmount
        discount
        receivedAmount
        balance
        acClass
        invoiceAc
        enteredBy
        companyCode
        environment
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const RECEIPTS = gql`
  mutation ($input: ReceiptInput!) {
    generatePaymentReceipt(input: $input) {
      success
      message
      receiptData
    }
  }
`;

export const PAYMENT_RECEIPT_UPLOAD = gql`
  mutation ($input: ReceiptInput!) {
    paymentReceiptUpload(input: $input) {
      success
      message
      receiptPath
    }
  }
`;

export const SEND_SMS = gql`
  mutation ($input: ServiceInput!) {
    sendMessageService(input: $input) {
      success
      message
    }
  }
`;

export const FILTER = gql`
  mutation ($input: ReceiptInput!) {
    filterReceipt(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        headerId
        labId
        customerName
        grossAmount
        netAmount
        discount
        receivedAmount
        balance
        acClass
        invoiceAc
        enteredBy
        companyCode
        environment
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`;
