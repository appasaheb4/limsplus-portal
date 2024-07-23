import { gql } from '@apollo/client';

export const PAYMENT_LIST = gql`
  mutation ($input: PaymentInput!) {
    payments(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        pId
        labId
        rLab
        invoiceAC
        customerName
        customerGroup
        acClass
        acType
        discountCharges
        invoiceDate
        grossAmount
        netAmount
        discountAmount
        discountPer
        miscellaneousCharges
        allMiscCharges
        amountPayable
        receivedAmount
        balance
        modeOfPayment
        paymentRemark
        companyCode
        environment
        status
        enteredBy
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const CREATE_PAYMENT = gql`
  mutation ($input: CreatePaymentInput!) {
    createPayment(input: $input) {
      success
      message
      result
    }
  }
`;

export const REMOVE_PAYMENT = gql`
  mutation ($input: GeneralSettingInput!) {
    removeGeneralSetting(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_PAYMENT = gql`
  mutation ($input: UpdateDeliveryQueueInput!) {
    updateDeliveryQueue(input: $input) {
      success
      message
    }
  }
`;

export const FILTER = gql`
  mutation ($input: PaymentInput!) {
    filterPayment(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        pId
        labId
        rLab
        invoiceAC
        customerName
        customerGroup
        acClass
        acType
        discountCharges
        invoiceDate
        grossAmount
        netAmount
        discountAmount
        discountPer
        miscellaneousCharges
        allMiscCharges
        amountPayable
        receivedAmount
        balance
        modeOfPayment
        paymentRemark
        companyCode
        environment
        status
        enteredBy
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const FILTER_BY_FILTER = gql`
  mutation ($input: PaymentInput!) {
    filterByFieldsPayment(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        pId
        labId
        rLab
        invoiceAC
        customerName
        customerGroup
        acClass
        acType
        discountCharges
        invoiceDate
        grossAmount
        netAmount
        discountAmount
        discountPer
        miscellaneousCharges
        allMiscCharges
        amountPayable
        receivedAmount
        balance
        modeOfPayment
        paymentRemark
        companyCode
        environment
        status
        enteredBy
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const FIND_BY_FIELDS = gql`
  mutation ($input: GeneralSettingInput!) {
    findByFieldsGeneralSetting(input: $input) {
      success
      message
      data {
        _id
        pId
        labId
        rLab
        invoiceAC
        customerName
        customerGroup
        acClass
        acType
        discountCharges
        invoiceDate
        grossAmount
        netAmount
        discountAmount
        discountPer
        miscellaneousCharges
        allMiscCharges
        amountPayable
        receivedAmount
        balance
        modeOfPayment
        paymentRemark
        status
        companyCode
        environment
        enteredBy
        dateOfEntry
        lastUpdated
      }
    }
  }
`;
