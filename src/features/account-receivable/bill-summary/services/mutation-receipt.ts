import { gql } from '@apollo/client';

export const BILL_SUMMARY_LIST = gql`
  mutation ($input: BillSummaryInput!) {
    billSummary(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        billNo
        billDate
        corporateCode
        corporateName
        invoiceAc
        clientName
        clientContactNo
        billingFrequency
        billForm
        billTo
        accountType
        customerGroup
        billingOn
        grossAmount
        netAmount
        discountAmount
        discountPer
        miscellaneousCharges
        allMiscCharges
        discountCharges
        receivedAmount
        balance
        status
        enteredBy
        companyCode
        environment
        createdAt
        updatedAt
      }
    }
  }
`;

export const GENERATE_BILL = gql`
  mutation ($input: BillSummaryInput!) {
    generateBillSummary(input: $input) {
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
