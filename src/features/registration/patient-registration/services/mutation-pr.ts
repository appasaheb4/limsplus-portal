import { gql } from '@apollo/client';

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

export const PATIENT_RESULT_RECORDS = gql`
  mutation ($input: PatientResultInput!) {
    patientResultRecordsForGRE(input: $input) {
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

export const PATIENT_LIST_FOR_GENERAL_RES_ENTRY = gql`
  mutation ($input: PatientResultInput!) {
    patientResultListForGenResEntry(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      patientResultList
    }
  }
`;

export const FIND_NOT_EQUAL_TO_RESULT = gql`
  mutation ($input: PatientResultInput!) {
    findNotEqualToResultList(input: $input) {
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

export const GET_PATIENT_RESULT_DISTINCT = gql`
  query {
    getPatientResultDistinct {
      success
      message
      patientResultList
    }
  }
`;

export const UPDATE_RECORD = gql`
  mutation ($input: UpdatePatientResultInput!) {
    updatePatientResult(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_BY_FIELDS_RECORD = gql`
  mutation ($input: PatientResultInput!) {
    updateByFieldsPatientResult(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_STATUS_RECORD = gql`
  mutation ($input: PatientResultInput!) {
    updateStatusPatientResult(input: $input) {
      success
      message
    }
  }
`;

export const RELOAD_RECORD = gql`
  mutation ($input: PatientResultInput!) {
    reloadPatientResult(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_FIELDS_BY_IDS = gql`
  mutation ($input: PatientResultInput!) {
    updateFinishResultFieldsByIdsPatientResult(input: $input) {
      success
      message
    }
  }
`;
