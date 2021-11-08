import { gql } from "@apollo/client"

export const LIST = gql`
  mutation($input: DoctorInput!) {
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
        dateActiveFrom
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
        country
        postcode
        doctorType
        speciality
        confidential
        salesTerritoRy
        area
        zone
        telephone
        mobileNo
        email
        workHours
        deliveryType
        deliveryMethod
        edi
        ediAddress
        urgent
        registrationLocation
        lab
        location
        schedule
        reportFormat
        info
        fyiLine
        workLine
        status
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`

export const REMOVE_RECORD = gql`
  mutation($input: DoctorRemoveInput!) {
    removeDoctor(input: $input) {
      success
      message
    }
  }
`
  
export const CREATE_RECORD = gql`
  mutation($input: CreateDoctorInput!) {
    createDoctor(input: $input) {
      success
      message
    }
  }
`

export const VERSION_UPGRADE = gql`
  mutation($input: CreateDoctorInput!) {
    versionUpgradeDoctors(input: $input) {
      success
      message
    }
  }
`

export const DUPLICATE_RECORD = gql`
  mutation($input: CreateDoctorInput!) {
    duplicateDoctors(input: $input) {
      success
      message
    }
  }
`

export const UPDATE_RECORD = gql`
  mutation($input: UpdateDoctorInput!) {
    updateDoctor(input: $input) {
      success
      message
    }
  }
`

export const CHECK_EXISTS_RECORD = gql`
  mutation($input: DoctorInput!) {
    checkDoctorsExistsRecord(input: $input) {
      success
      message
    }
  }
`
