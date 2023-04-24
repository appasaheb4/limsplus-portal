import {gql} from '@apollo/client';

export const LIST = gql`
  mutation ($input: FileImportExportInput!) {
    fileImportExports(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        transferType
        records
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const REMOVE_RECORD = gql`
  mutation ($input: FileImportExportRemoveInput!) {
    removeFileImportExport(input: $input) {
      success
      message
    }
  }
`;

export const CREATE_RECORD = gql`
  mutation ($input: CreateFileImportExportInput!) {
    createFileImportExport(input: $input) {
      success
      message
    }
  }
`;

export const IMPORT_RECORDS = gql`
  mutation ($input: ClientRegistrationInput!) {
    importClientRegistration(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_RECORD = gql`
  mutation ($input: UpdateClientRegistrationInput!) {
    updateClientRegistration(input: $input) {
      success
      message
    }
  }
`;

export const CHECK_EXISTS_RECORD = gql`
  mutation ($input: RoleInput!) {
    checkRoleExistsEnvCode(input: $input) {
      success
      message
    }
  }
`;

export const FILTER = gql`
  mutation ($input: ClientRegistrationInput!) {
    filterClientRegistration(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        countryName
        labId
        registrationDate
        clientCode
        clientName
        patientName
        age
        ageUnits
        sex
        testName
        testCode
        sample
        dueDate
        reportDate
        status
        pdfReport
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const FIND_BY_FIELDS = gql`
  mutation ($input: SegmentMappingInput!) {
    findByFieldsSegmentMapping(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        countryName
        labId
        registrationDate
        clientCode
        clientName
        patientName
        age
        ageUnits
        sex
        testName
        testCode
        sample
        dueDate
        reportDate
        status
        pdfReport
        dateOfEntry
        lastUpdated
      }
    }
  }
`;
