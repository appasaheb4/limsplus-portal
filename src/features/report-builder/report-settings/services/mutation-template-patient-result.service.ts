import {gql} from '@apollo/client';

export const TEMPLATE_PATIENT_RESULT_LIST = gql`
  mutation ($input: TemplatePatientResultInput!) {
    templatePatientResults(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        reportTemplateType
        reportBody
        templateCode
        templateTitle
        reportOrder
        endOfPage
        endOfReport
        departmentHeader
        panelHeader
        testHeader
        patientResultList
        testFooter
        panelFooter
        departmentFooter
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const CREATE_TEMPLATE_PATIENT_RESULT = gql`
  mutation ($input: CreateTemplatePatientResultInput!) {
    createTemplatePatientResult(input: $input) {
      success
      message
    }
  }
`;

export const REMOVE_TEMPLATE_PATIENT_RESULT = gql`
  mutation ($input: TemplatePatientResultInput!) {
    removeTemplatePatientResult(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_TEMPLATE_PATIENT_RESULT = gql`
  mutation ($input: UpdateTemplatePatientResultInput!) {
    updateTemplatePatientResult(input: $input) {
      success
      message
    }
  }
`;

export const FILTER_BY_FIELDS = gql`
  mutation ($input: TemplatePatientResultInput!) {
    filterByFieldsTemplatePatientResult(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        reportTemplateType
        reportBody
        templateCode
        templateTitle
        reportOrder
        endOfPage
        endOfReport
        departmentHeader
        panelHeader
        testHeader
        patientResultList
        testFooter
        panelFooter
        departmentFooter
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const FIND_BY_FIELDS = gql`
  mutation ($input: TemplatePatientResultInput!) {
    findByFieldsTemplatePatientResult(input: $input) {
      success
      message
      data {
        _id
        reportTemplateType
        reportBody
        templateCode
        templateTitle
        reportOrder
        endOfPage
        endOfReport
        departmentHeader
        panelHeader
        testHeader
        patientResultList
        testFooter
        panelFooter
        departmentFooter
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const TEMP_PATIENT_RESULT_BY_TEMP_CODES = gql`
  mutation ($input: TemplatePatientResultInput!) {
    getTempPatientResultListByTempCodes(input: $input) {
      success
      message
      list
    }
  }
`;
