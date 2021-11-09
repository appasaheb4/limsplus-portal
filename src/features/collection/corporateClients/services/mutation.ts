import { gql } from "@apollo/client"

export const LIST = gql`
  mutation($input: CorporateClientInput!) {
    corporateClients(input: $input) {
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
        corporateCode
        corporateName
        invoiceAc
        priceList
        priceGroup
        billingOn
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
        salesTerritoRy
        area
        zone
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
  mutation($input: CorporateClientRemoveInput!) {
    removeCorporateClient(input: $input) {
      success
      message
    }
  }
`

export const CREATE_RECORD = gql`
  mutation($input: CreateCorporateClientInput!) {
    createCorporateClient(input: $input) {
      success
      message
    }
  }
`

export const VERSION_UPGRADE = gql`
  mutation($input: CreateCorporateClientInput!) {
    versionUpgradeCorporateClient(input: $input) {
      success
      message
    }
  }
`

export const DUPLICATE_RECORD = gql`
  mutation($input: CreateCorporateClientInput!) {
    duplicateCorporateClient(input: $input) {
      success
      message
    }
  }
`

export const UPDATE_RECORD = gql`
  mutation($input: UpdateCorporateClientInput!) {
    updateCorporateClient(input: $input) {
      success
      message
    }
  }
`

export const CHECK_EXISTS_RECORD = gql`
  mutation($input: CorporateClientInput!) {
    checkCorporateClientExistsRecord(input: $input) {
      success
      message
    }
  }
`
