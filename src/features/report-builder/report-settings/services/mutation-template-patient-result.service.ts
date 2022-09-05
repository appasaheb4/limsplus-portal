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
        pageBranding
        templateCode
        templateTitle
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
  mutation ($input: UpdateTemplateSettingInput!) {
    updateTemplateSetting(input: $input) {
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
        reportTemplateType
        pageBranding
        templateCode
        templateTitle
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
        pageBranding
        templateCode
        templateTitle
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
