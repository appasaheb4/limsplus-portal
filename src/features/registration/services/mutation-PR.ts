import { gql } from "@apollo/client"
  
export const LIST_PATIENT_RESULT = gql`
  mutation($input: PatientResultInput!) {
    patientResults(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      patientResultList
    }
  }
`
  