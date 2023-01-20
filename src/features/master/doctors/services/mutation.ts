import {gql} from '@apollo/client';

export const LIST = gql`
  mutation ($input: DoctorInput!) {
    doctors(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        existsVersionId
        existsRecordId
        dateCreation
        dateActive
        dateExpire
        version
        enteredBy
        doctorCode
        doctorName
        sex
        title
        firstName
        middleName
        lastName
        reportName
        address
        city
        state
        district
        country
        postalCode
        doctorType
        speciality
        category
        confidential
        salesTerritoRy
        area
        sbu
        zone
        telephone
        mobileNo
        email
        reportPriority
        deliveryMode
        urgent
        registrationLocation
        lab
        reportFormat
        info
        fyiLine
        workLine
        openingTime
        closingTime
        specificFormat
        status
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const REMOVE_RECORD = gql`
  mutation ($input: DoctorRemoveInput!) {
    removeDoctor(input: $input) {
      success
      message
    }
  }
`;

export const CREATE_RECORD = gql`
  mutation ($input: CreateDoctorInput!) {
    createDoctor(input: $input) {
      success
      message
    }
  }
`;

export const VERSION_UPGRADE = gql`
  mutation ($input: CreateDoctorInput!) {
    versionUpgradeDoctors(input: $input) {
      success
      message
    }
  }
`;

export const DUPLICATE_RECORD = gql`
  mutation ($input: CreateDoctorInput!) {
    duplicateDoctors(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_RECORD = gql`
  mutation ($input: UpdateDoctorInput!) {
    updateDoctor(input: $input) {
      success
      message
    }
  }
`;

export const CHECK_EXISTS_RECORD = gql`
  mutation ($input: DoctorInput!) {
    checkDoctorsExistsRecord(input: $input) {
      success
      message
    }
  }
`;

export const FILTER = gql`
  mutation ($input: DoctorInput!) {
    filterDoctors(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        existsVersionId
        existsRecordId
        dateCreation
        dateActive
        dateExpire
        version
        enteredBy
        doctorCode
        doctorName
        sex
        title
        firstName
        middleName
        lastName
        reportName
        address
        city
        state
        district
        country
        postalCode
        doctorType
        speciality
        category
        confidential
        salesTerritoRy
        area
        sbu
        zone
        telephone
        mobileNo
        email
        reportPriority
        deliveryMode
        urgent
        registrationLocation
        lab
        reportFormat
        info
        fyiLine
        workLine
        openingTime
        closingTime
        specificFormat
        status
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const FILTER_BY_FIELDS = gql`
  mutation ($input: DoctorInput!) {
    filterByFieldsDoctor(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        existsVersionId
        existsRecordId
        dateCreation
        dateActive
        dateExpire
        version
        enteredBy
        doctorCode
        doctorName
        sex
        title
        firstName
        middleName
        lastName
        reportName
        address
        city
        state
        district
        country
        postalCode
        doctorType
        speciality
        category
        confidential
        salesTerritoRy
        area
        sbu
        zone
        telephone
        mobileNo
        email
        reportPriority
        deliveryMode
        urgent
        registrationLocation
        lab
        reportFormat
        info
        fyiLine
        workLine
        openingTime
        closingTime
        specificFormat
        status
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const FIND_BY_FIELDS = gql`
  mutation ($input: DoctorInput!) {
    findByFieldsDocter(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        existsVersionId
        existsRecordId
        dateCreation
        dateActive
        dateExpire
        version
        enteredBy
        doctorCode
        doctorName
        sex
        title
        firstName
        middleName
        lastName
        reportName
        address
        city
        state
        district
        country
        postalCode
        doctorType
        speciality
        category
        confidential
        salesTerritoRy
        area
        sbu
        zone
        telephone
        mobileNo
        email
        reportPriority
        deliveryMode
        urgent
        registrationLocation
        lab
        reportFormat
        info
        fyiLine
        workLine
        openingTime
        closingTime
        specificFormat
        status
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`;
