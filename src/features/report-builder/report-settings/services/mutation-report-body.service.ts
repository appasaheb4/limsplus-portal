import {gql} from '@apollo/client';

export const REPORT_BODY_LIST = gql`
  mutation ($input: ReportBodyInput!) {
    reportBodys(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        pageBrandingCode
        reportCode
        reportName
        general
        panel
        test
        analyte
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const CREATE_REPORT_BODY = gql`
  mutation ($input: CreateReportBodyInput!) {
    createReportBody(input: $input) {
      success
      message
    }
  }
`;

export const REMOVE_REPORT_BODY = gql`
  mutation ($input: ReportBodyInput!) {
    removeReportBody(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_REPORT_BODY = gql`
  mutation ($input: UpdateReportBodyInput!) {
    updateReportBody(input: $input) {
      success
      message
    }
  }
`;

export const FILTER = gql`
  mutation ($input: PageBrandingInput!) {
    filterPageBranding(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        pageBrandingCode
        reportCode
        reportName
        general
        panel
        test
        analyte
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const FILTER_BY_FIELDS = gql`
  mutation ($input: PageBrandingInput!) {
    filterByFieldsPageBranding(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        pageBrandingCode
        reportCode
        reportName
        general
        panel
        test
        analyte
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const FIND_BY_FIELDS = gql`
  mutation ($input: ReportBodyInput!) {
    findByFieldsReportBody(input: $input) {
      success
      message
      data {
        _id
        pageBrandingCode
        reportCode
        reportName
        general
        panel
        test
        analyte
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`;
