import { gql } from "@apollo/client"

export const LIST_PATIENT_VISIT = gql`
  mutation($input: PatientVisitInput!) {
    patientVisits(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        pId
        rLab
        visitId
        visitDate
        registrationDate
        collectionDate
        dueDate
        birthDate
        age
        ageUnits
        collectionCenter
        corporateCode
        acClass
        doctorId
        doctorName
        deliveryType
        history
        status
        extraData {
          accountType
          deliveryMethod
          additionalInfo
          invoiceAc
          billingMethod
          billNumber
          urgent
          confidental
          autoNumber
          methodCollection
          collectedBy
          pendingDataEntry
          receivedDate
          resultDate
          approvalDate
          approvalStatus
          reportStatus
          reportedDate
          enteredBy
          gestation
          height
          weight
          archieve
          loginInterface
          registrationInterface
          submittedSystem
          submittedOn
          balance
          environment
        }
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`

export const CREATE_PATIENT_VISIT = gql`
  mutation($input: CreatePatientVisitInput!) {
    createPatientVisit(input: $input) {
      success
      message
    }
  }
`

export const REMOVE_PATIENT_VISIT = gql`
  mutation($input: PatientVisitRemoveInput!) {
    removePatientVisit(input: $input) {
      success
      message
    }
  }
`

export const UPDATE_PATIENT_VISIT = gql`
  mutation($input: UpdatePatientVisitInput!) {
    updatePatientVisit(input: $input) {
      success
      message
    }
  }
`

export const FILTER_PATIENT_VISIT = gql`
  mutation($input: PatientVisitInput!) {
    filterPatientVisit(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        pId
        rLab
        visitId
        visitDate
        registrationDate
        collectionDate
        dueDate
        birthDate
        age
        ageUnits
        collectionCenter
        corporateCode
        acClass
        doctorId
        doctorName
        deliveryType
        history
        status
        extraData {
          accountType
          deliveryMethod
          additionalInfo
          invoiceAc
          billingMethod
          billNumber
          urgent
          confidental
          autoNumber
          methodCollection
          collectedBy
          pendingDataEntry
          receivedDate
          resultDate
          approvalDate
          approvalStatus
          reportStatus
          reportedDate
          enteredBy
          gestation
          height
          weight
          archieve
          loginInterface
          registrationInterface
          submittedSystem
          submittedOn
          balance
          environment
        }
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`

export const SEQUENCING_PATIENT_ORDER_ORDERID = gql`
  mutation($input: SequencingInput!) {
    sequencing(input: $input) {
      message
      success
      data
    }
  }
`

export const CHECK_EXISTS_PATIENT = gql`
  mutation($input: PatientManagerInput!) {
    checkExistsPatientManager(input: $input) {
      success
      message
    }
  }
`

export const FILTER_BY_FIELDS_PATIENT_VISIT = gql`
  mutation($input: PatientManagerInput!) {
    filterByFieldsPatientManager(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        pId
        rLab
        visitId
        visitDate
        registrationDate
        collectionDate
        dueDate
        birthDate
        age
        ageUnits
        collectionCenter
        corporateCode
        acClass
        doctorId
        doctorName
        deliveryType
        history
        status
        extraData {
          accountType
          deliveryMethod
          additionalInfo
          invoiceAc
          billingMethod
          billNumber
          urgent
          confidental
          autoNumber
          methodCollection
          collectedBy
          pendingDataEntry
          receivedDate
          resultDate
          approvalDate
          approvalStatus
          reportStatus
          reportedDate
          enteredBy
          gestation
          height
          weight
          archieve
          loginInterface
          registrationInterface
          submittedSystem
          submittedOn
          balance
          environment
        }
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`
  
export const GET_PACKAGES_LIST = gql`
  mutation($input: PatientOrderInput!) {
    getPatientOrderPackagesList(input: $input) {
      success
      message
      packageList
    }
  }
`
