import {gql} from '@apollo/client';

export const LIST_PATIENT_MANAGER = gql`
  mutation ($input: PatientManagerInput!) {
    patientManagers(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        pId
        isPatientMobileNo
        mobileNo
        birthDate
        age
        ageUnit
        isBirthdateAvailabe
        title
        firstName
        middleName
        lastName
        sex
        species
        breed
        usualDoctor
        history
        diagnosis
        disease
        isVIP
        extraData {
          address
          postcode
          area
          city
          district
          state
          country
          email
          isMobileAndWhatsApp
          whatsappNumber
          permanent
          confidental
          photograph
          signature
          bloodGroup
          height
          weight
          followUp
          comments
          fyiLine
          balance
          accountType
          enteredBy
          status
          environment
        }
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const CREATE_PATIENT_MANAGER = gql`
  mutation ($input: CreatePatientManagerInput!) {
    createPatientManager(input: $input) {
      success
      message
      result
    }
  }
`;

export const CREATE_BY_FILE_IMPORT_EXPORT = gql`
  mutation ($input: PatientManagerInput!) {
    createByFileImportExportPatientManager(input: $input) {
      success
      message
    }
  }
`;

export const REMOVE_PATIENT_MANAGER = gql`
  mutation ($input: PatientManagerRemoveInput!) {
    removePatientManager(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_PATIENT_MANAGER = gql`
  mutation ($input: UpdatePatientManagerInput!) {
    updatePatientManager(input: $input) {
      success
      message
    }
  }
`;

export const FILTER_PATIENT_MANAGER = gql`
  mutation ($input: PatientManagerInput!) {
    filterPatientManager(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        pId
        isPatientMobileNo
        mobileNo
        birthDate
        age
        ageUnit
        isBirthdateAvailabe
        title
        firstName
        middleName
        lastName
        sex
        species
        breed
        usualDoctor
        history
        diagnosis
        disease
        isVIP
        extraData {
          address
          postcode
          area
          city
          district
          state
          country
          email
          isMobileAndWhatsApp
          whatsappNumber
          permanent
          confidental
          photograph
          signature
          bloodGroup
          height
          weight
          followUp
          comments
          fyiLine
          balance
          accountType
          enteredBy
          status
          environment
        }
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const COUNTER_PATIENT_MANAGER_PID = gql`
  mutation ($input: CounterInput!) {
    counter(input: $input) {
      message
      success
      data
    }
  }
`;

export const CHECK_EXISTS_PATIENT = gql`
  mutation ($input: PatientManagerInput!) {
    checkExistsPatientManager(input: $input) {
      success
      message
    }
  }
`;

export const FILTER_BY_FIELDS_PATIENT_MANAGER = gql`
  mutation ($input: PatientManagerInput!) {
    filterByFieldsPatientManager(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        pId
        isPatientMobileNo
        mobileNo
        birthDate
        age
        ageUnit
        isBirthdateAvailabe
        title
        firstName
        middleName
        lastName
        sex
        species
        breed
        usualDoctor
        history
        diagnosis
        disease
        isVIP
        extraData {
          address
          postcode
          area
          city
          district
          state
          country
          email
          isMobileAndWhatsApp
          whatsappNumber
          permanent
          confidental
          photograph
          signature
          bloodGroup
          height
          weight
          followUp
          comments
          fyiLine
          balance
          accountType
          enteredBy
          status
          environment
        }
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const FILTER_OPTION_LIST = gql`
  mutation ($input: PatientManagerInput!) {
    getFilterOptionListPatientManager(input: $input) {
      success
      statusCode
      message
      records
    }
  }
`;

export const GET_PATIENT_REG_RECORDS = gql`
  mutation ($input: PatientManagerInput!) {
    getPatientRegRecords(input: $input) {
      success
      statusCode
      message
      records
    }
  }
`;
