import {gql} from '@apollo/client';

export const TRANSACTION_HEADER_LIST = gql`
  mutation ($input: TransactionHeaderInput!) {
    transactionHeaders(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        headerId
        collectionCenter
        corporateCode
        labId
        invoiceAc
        invoiceDate
        actionDate
        registrationDate
        dueDate
        reportingDate
        doctorId
        pId
        priceList
        grossAmount
        netAmount
        discount
        receivedAmount
        balance
        acClass
        accountType
        customerGroup
        status
        enteredBy
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const FIND_BY_FIELDS_TRANSACTION_LINE = gql`
  mutation ($input: TransactionLineInput!) {
    findByFieldsTransactionLine(input: $input) {
      success
      message
      data {
        _id
        headerId
        lineId
        rLab
        pLab
        collectionCenter
        collectionCenterName
        corporateCode
        invoiceAC
        invoiceDate
        actionDate
        receipt
        pId
        labId
        acSub
        department
        serviceType
        panelCode
        panelName
        priceGroup
        priceList
        grossAmount
        netAmount
        discount
        miscCharges
        transaction
        acClass
        accountType
        customerGroup
        status
        enteredBy
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`;
