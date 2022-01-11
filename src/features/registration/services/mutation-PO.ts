import { gql } from "@apollo/client"

export const LIST_PATIENT_ORDER = gql`
  mutation($input: PatientOrderInput!) {
    patientOrders(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        labId,
        orderId
        visitId
        patientName
        panelCode
        packageList {
          panelCode
          panelName
          packageCode
          serviceType
          service
          department
          section
          pLab
          rLab
          bill
          grossAmt
          netAmt
          discount
          dueDate
          resultDate
          orderStatus
          panelStatus
          extraData {
            priority
            outsourceLab
            forceOutSource
            osReceivedDate
            osReceivedBy
            outsourceStatus
            receviedByDept
            analysisDoneDate
            autoRelease
            abNormal
            critical
            rep
            eqid
            eqtype
            methodOn
            methodName
            porder
            confidential
            workflow
            loginServgrp
            currentServgrp
            routingStatus
            recvTime
            outSourceOrdno
            deptOutSource
            comment
          }
        }
        environment
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`

export const CREATE_PATIENT_ORDER = gql`
  mutation($input: CreatePatientOrderInput!) {
    createPatientOrder(input: $input) {
      success
      message
    }
  }
`

export const REMOVE_PATIENT_ORDER = gql`
  mutation($input: PatientOrderRemoveInput!) {
    removePatientOrder(input: $input) {
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
     
export const FILTER_PATIENT_ORDER = gql`
  mutation($input: PatientOrderInput!) {
    filterPatientOrder(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        labId
        orderId
        visitId
        patientName
        panelCode
        packageList {
          panelCode
          panelName
          packageCode
          serviceType
          service
          department
          section
          pLab
          rLab
          bill
          grossAmt
          netAmt
          discount
          dueDate
          resultDate
          orderStatus
          panelStatus
          extraData {
            priority
            outsourceLab
            forceOutSource
            osReceivedDate
            osReceivedBy
            outsourceStatus
            receviedByDept
            analysisDoneDate
            autoRelease
            abNormal
            critical
            rep
            eqid
            eqtype
            methodOn
            methodName
            porder
            confidential
            workflow
            loginServgrp
            currentServgrp
            routingStatus
            recvTime
            outSourceOrdno
            deptOutSource
            comment
          }
        }
        environment
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
        labId
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
