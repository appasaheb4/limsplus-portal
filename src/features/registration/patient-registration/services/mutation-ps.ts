import { gql } from '@apollo/client';

export const LIST_PATIENT_SAMPLE = gql`
  mutation ($input: PatientSampleInput!) {
    patientSamples(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      patientSampleList
    }
  }
`;

export const FILTER_PATIENT_SAMPLE = gql`
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

export const UPDATE_RECORD = gql`
  mutation ($input: UpdatePatientSampleInput!) {
    updatePatientSample(input: $input) {
      success
      message
    }
  }
`;
