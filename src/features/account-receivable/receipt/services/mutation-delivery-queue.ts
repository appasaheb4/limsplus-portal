import {gql} from '@apollo/client';

export const DELIVERY_QUEUE_LIST = gql`
  mutation ($input: DeliveryQueueInput!) {
    deliveryQueues(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        labId
        deliveryId
        deliveryDate
        reportDate
        deliveryStatus
        reportType
        deliveryMode
        destination
        comments
        startDate
        endDate
        errorMsg
        clientCode
        clientName
        qrCode
        pdf
        enteredBy
        userComments
        orderId
        panelCode
        panelName
        testCode
        testName
        analyteCode
        analyteName
        rep
        delivered
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const CREATE_DELIVERY_QUEUE = gql`
  mutation ($input: CreateGeneralSettingInput!) {
    createGeneralSetting(input: $input) {
      success
      message
    }
  }
`;

export const REMOVE_DELIVERY_QUEUE = gql`
  mutation ($input: GeneralSettingInput!) {
    removeGeneralSetting(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_DELIVERY_QUEUE = gql`
  mutation ($input: UpdateDeliveryQueueInput!) {
    updateDeliveryQueue(input: $input) {
      success
      message
    }
  }
`;

export const FILTER = gql`
  mutation ($input: BannerInput!) {
    filterBanners(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        labId
        deliveryId
        deliveryDate
        reportDate
        deliveryStatus
        reportType
        deliveryMode
        destination
        comments
        startDate
        endDate
        errorMsg
        clientCode
        clientName
        qrCode
        pdf
        enteredBy
        userComments
        orderId
        panelCode
        panelName
        testCode
        testName
        analyteCode
        analyteName
        rep
        delivered
        documentType
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
        labId
        deliveryId
        deliveryDate
        reportDate
        deliveryStatus
        reportType
        deliveryMode
        destination
        comments
        startDate
        endDate
        errorMsg
        clientCode
        clientName
        qrCode
        pdf
        enteredBy
        userComments
        orderId
        panelCode
        panelName
        testCode
        testName
        analyteCode
        analyteName
        rep
        delivered
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`;
