import { gql } from "@apollo/client"

export const LIST = gql`
  mutation($input: PriceListInput!) {
    priceLists(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        existsVersionId
        existsRecordId
        panelCode
        panelName
        priority
        priceGroup
        billTo
        clientName
        invoiceAc
        lab
        price
        fixedPrice
        minSp
        maxSp
        anyScheme
        speicalScheme
        schemePrice
        disOnScheme
        enteredBy
        status
        environment
        dateCreation
        dateActive
        dateExpire
        version
        dateOfEntry
        lastUpdated
      }
    }
  }
`

export const REMOVE_RECORD = gql`
  mutation($input: PriceListRemoveInput!) {
    removePriceList(input: $input) {
      success
      message
    }
  }
`

export const CREATE_RECORD = gql`
  mutation($input: CreatePriceListInput!) {
    createPriceList(input: $input) {
      success
      message
    }
  }
`

export const VERSION_UPGRADE = gql`
  mutation($input: CreatePriceListInput!) {
    versionUpgradePriceList(input: $input) {
      success
      message
    }
  }
`

export const DUPLICATE_RECORD = gql`
  mutation($input: CreatePriceListInput!) {
    duplicatePriceList(input: $input) {
      success
      message
    }
  }
`

export const UPDATE_RECORD = gql`
  mutation($input: UpdatePriceListInput!) {
    updatePriceList(input: $input) {
      success
      message
    }
  }
`

export const CHECK_EXISTS_RECORD = gql`
  mutation($input: PriceListInput!) {
    checkPriceListExistsRecord(input: $input) {
      success
      message
    }
  }
`
