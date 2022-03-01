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
        priceGroup
        priceList
        description
        panelCode
        panelName
        price
        minSp
        maxSp
        maxDis
        fixedPrice
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

export const FILTER = gql`
  mutation($input: PriceListInput!) {
    filterPriceList(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        existsVersionId
        existsRecordId
        priceGroup
        priceList
        description
        panelCode
        panelName
        price
        minSp
        maxSp
        maxDis
        fixedPrice
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


export const FILTER_BY_FIELDS = gql`
  mutation($input: PriceListInput!) {
    filterByFieldsPriceList(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        existsVersionId
        existsRecordId
        priceGroup
        priceList
        description
        panelCode
        panelName
        price
        minSp
        maxSp
        maxDis
        fixedPrice
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
