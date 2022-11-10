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
          vip
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
          vip
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
          vip
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
