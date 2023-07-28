import {gql} from '@apollo/client';

export const PATIENT_REPORT_LIST = gql`
  mutation ($input: GenerateReportsInput!) {
    getPatientReports(input: $input) {
      success
      message
      data
    }
  }
`;

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
        name
        patientResultId
        index
        labId
        externalLabId
        employeeCode
        visitId
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
        registrationLocation
        registrationLocationCode
        doctorCode
        doctorName
        qrCode
        pdf
        enteredBy
        userComments
        orderId
        resultType
        panelCode
        panelName
        testCode
        testName
        analyteCode
        analyteName
        rep
        delivered
        reportPriority
        approvalDate
        reportTemplate
        colorScheme
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

export const UPDATE_DELIVERY_QUEUE_BY_VISIT_IDS = gql`
  mutation ($input: DeliveryQueueInput!) {
    updateByVisitIdsDeliveryQueue(input: $input) {
      success
      message
    }
  }
`;

export const FILTER = gql`
  mutation ($input: DeliveryQueueInput!) {
    filterDeliveryQueue(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        name
        patientResultId
        index
        labId
        externalLabId
        employeeCode
        visitId
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
        registrationLocation
        registrationLocationCode
        doctorCode
        doctorName
        qrCode
        pdf
        enteredBy
        userComments
        orderId
        resultType
        panelCode
        panelName
        testCode
        testName
        analyteCode
        analyteName
        rep
        delivered
        reportPriority
        approvalDate
        reportTemplate
        colorScheme
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const FIND_BY_FIELDS = gql`
  mutation ($input: DeliveryQueueInput!) {
    findByFieldsDeliveryQueue(input: $input) {
      success
      message
      data {
        _id
        name
        patientResultId
        index
        labId
        externalLabId
        employeeCode
        visitId
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
        registrationLocation
        registrationLocationCode
        doctorCode
        doctorName
        qrCode
        pdf
        enteredBy
        userComments
        orderId
        resultType
        panelCode
        panelName
        testCode
        testName
        analyteCode
        analyteName
        rep
        delivered
        reportPriority
        approvalDate
        reportTemplate
        colorScheme
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const MEDICAL_REPORT = gql`
  mutation ($input: DeliveryQueueInput!) {
    getMedicalReportDetailsForDeliveryQueue(input: $input) {
      success
      message
      resultMedicalReport
    }
  }
`;
