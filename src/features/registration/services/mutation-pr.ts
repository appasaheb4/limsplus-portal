import {gql} from '@apollo/client';

export const LIST_PATIENT_RESULT = gql`
  mutation ($input: PatientResultInput!) {
    patientResults(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      patientResultList
    }
  }
`;

export const LIST_PATIENT_RESULT_WITH_LABID = gql`
  mutation ($input: PatientResultInput!) {
    patientResultsWithLabId(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      patientResultList
    }
  }
`;

export const FILTER_PATIENT_RESULT = gql`
  mutation ($input: PatientResultInput!) {
    filterPatientResult(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      patientResultList
    }
  }
`;

export const FILTER_BY_FIELDS = gql`
  mutation ($input: PatientResultInput!) {
    filterByFieldsPatientResult(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      patientResultList
    }
  }
`;

export const FILTER_PATIENT_RESULT_WITH_LABID = gql`
  mutation ($input: PatientResultInput!) {
    filterPatientResultWithLabId(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      patientResultList
    }
  }
`;
