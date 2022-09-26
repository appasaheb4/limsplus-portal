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
        priceGroup
        priceList
        grossAmount
        netAmount
        discountAmount
        discountPer
        miscellaneousCharges
        receivedAmount
        balance
        acClass
        accountType
        customerGroup
        rLab
        allMiscCharges
        discountCharges
        customerName
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
        discountAmount
        discountPer
        miscellaneousCharges
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
