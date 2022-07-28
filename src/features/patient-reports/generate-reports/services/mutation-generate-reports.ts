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
