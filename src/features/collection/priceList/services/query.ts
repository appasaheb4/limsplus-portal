import { gql } from "@apollo/client"
  
export const GET_PRICELIST = gql`
  query($page: Int, $limit: Int, $env: String, $role: String, $lab: String) {
    getAllPriceList(page: $page, limit: $limit, env: $env, role: $role, lab: $lab) {
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
        dateExpiry
        version
        keyNum
        dateOfEntry
        lastUpdated
      }
      count
    }
  }
`
