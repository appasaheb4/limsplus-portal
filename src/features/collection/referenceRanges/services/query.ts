import { gql } from "@apollo/client"
      
export const GET_ALL_REFERENCERANGES = gql`
  query($page: Int, $limit: Int, $env: String, $role: String, $lab: String) {
    getAllReferenceRanges(page: $page, limit: $limit, env: $env, role: $role, lab: $lab) {
      data {
        _id
    existsVersionId
    analyteCode
    analyteName
    department
    species
    sex
    rangeSetOn
    eqType
    lab
    rangType
    age
    ageUnit
    low
    high
    alpha
    enteredBy
    status
    environment
    dateCreation
    dateActive
    dateExpiry
    version
    keyNum
    deltarang_tetype
    deltaInterval
    intervalUnit
    formatResultScript
    reportDefault
    dateOfEntry
    lastUpdated
      }
      count
    }
  }
`
