import { gql } from "@apollo/client"
  
export const LIST_PATIENT_TEST = gql`
  mutation($input: PatientTestInput!) {
    patientTests(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        orderId
        labId
        patientName
        testId
        panelCode
        panelList
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`
  
export const CREATE_PATIENT_TEST = gql`
  mutation($input: CreatePatientTestInput!) {
    createPatientTest(input: $input) {
      success
      message
    }
  }
`

export const REMOVE_PATIENT_ORDER = gql`
  mutation($input: PatientOrderRemoveInput!) {
    removePatientOrder(input: $input) {
      success
      message
    }
  }
`

export const UPDATE_PATIENT_VISIT = gql`
  mutation($input: UpdatePatientVisitInput!) {
    updatePatientVisit(input: $input) {
      success
      message
    }
  }
`

export const FILTER_PATIENT_ORDER = gql`
  mutation($input: PatientOrderInput!) {
    filterPatientOrder(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        orderId
        labId
        patientName
        testId
        panelCode
        panelList
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`

export const SEQUENCING_PATIENT_TEST_TESTID = gql`
  mutation($input: SequencingInput!) {
    sequencing(input: $input) {
      message
      success
      data
    }
  }
`

export const CHECK_EXISTS_PATIENT = gql`
  mutation($input: PatientManagerInput!) {
    checkExistsPatientManager(input: $input) {
      success
      message
    }
  }
`

export const FILTER_BY_FIELDS_PATIENT_TEST = gql`
  mutation($input: PatientManagerInput!) {
    filterByFieldsPatientManager(input: $input) {
      paginatorInfo {
        count
      }  
      success
      message
      data {
        _id
        orderId
        labId
        patientName
        testId
        panelCode
        panelList
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`

export const GET_PANEL_LIST = gql`
  mutation($input: PatientTestInput!) {
    getPatientTestPanelListByPanelCodes(input: $input) {
      success
      message
      panelList
    }
  }
`
