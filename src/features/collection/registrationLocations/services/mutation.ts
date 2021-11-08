import { gql } from "@apollo/client"

export const LIST = gql`
  mutation($input: RegistrationLocationInput!) {
    registrationLocations(input: $input) {
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
        locationCode
        locationName
        address
        city
        state
        country
        postcode
        customerGroup
        category
        confidential
        telephone
        mobileNo
        email
        deliveryType
        deliveryMethod
        corporateCode
        invoiceAc
        labLicence
        printLabel
        methodColn
        workHrs
        salesTerritoRy
        area
        zone
        route
        lab
        location
        neverBill
        edi
        ediAddress
        urgent
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
  mutation($input: RegistrationLocationRemoveInput!) {
    removeRegistrationLocation(input: $input) {
      success
      message
    }
  }
`

export const CREATE_RECORD = gql`
  mutation($input: CreateRegistrationLocationInput!) {
    createRegistrationLocation(input: $input) {
      success
      message
    }
  }
`

export const VERSION_UPGRADE = gql`
  mutation($input: CreateRegistrationLocationInput!) {
    versionUpgradeRegistrationLocation(input: $input) {
      success
      message
    }
  }
`

export const DUPLICATE_RECORD = gql`
  mutation($input: CreateRegistrationLocationInput!) {
    duplicateRegistrationLocation(input: $input) {
      success
      message
    }
  }
`

export const UPDATE_RECORD = gql`
  mutation($input: UpdateRegistrationLocationInput!) {
    updateRegistrationLocation(input: $input) {
      success
      message
    }
  }
`

export const CHECK_EXISTS_RECORD = gql`
  mutation($input: RegistrationLocationInput!) {
    checkRegistrationLocationExistsRecord(input: $input) {
      success
      message
    }
  }
`
