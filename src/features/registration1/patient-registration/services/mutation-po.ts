import {gql} from '@apollo/client';

export const LIST_PATIENT_ORDER = gql`
  mutation ($input: PatientOrderInput!) {
    patientOrders(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        pId
        age
        ageUnits
        labId
        orderId
        rLab
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
          priceGroup
          priceList
          grossAmount
          netAmount
          discountAmount
          discountPer
          miscellaneousCharges
          dueDate
          resultDate
          cretical
          abnFlag
          orderStatus
          status
          reportGroup
          approvalDate
          approvalStatus
          autoRelease
          externalPanelCode
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
            methodOn
            methodName
            reportOrder
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
        enteredBy
        environment
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const CREATE_PATIENT_ORDER = gql`
  mutation ($input: CreatePatientOrderInput!) {
    createPatientOrder(input: $input) {
      success
      message
    }
  }
`;

export const REMOVE_PATIENT_ORDER = gql`
  mutation ($input: PatientOrderRemoveInput!) {
    removePatientOrder(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_PATIENT_VISIT = gql`
  mutation ($input: UpdatePatientVisitInput!) {
    updatePatientVisit(input: $input) {
      success
      message
    }
  }
`;

export const FILTER_PATIENT_ORDER = gql`
  mutation ($input: PatientOrderInput!) {
    filterPatientOrder(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        pId
        age
        ageUnits
        labId
        orderId
        rLab
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
          priceGroup
          priceList
          grossAmount
          netAmount
          discountAmount
          discountPer
          miscellaneousCharges
          dueDate
          resultDate
          cretical
          abnFlag
          orderStatus
          status
          reportGroup
          approvalDate
          approvalStatus
          autoRelease
          externalPanelCode
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
            methodOn
            methodName
            reportOrder
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
        enteredBy
        environment
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const COUNTER_PATIENT_ORDER_ORDERID = gql`
  mutation ($input: CounterInput!) {
    counter(input: $input) {
      message
      success
      data
    }
  }
`;

export const CHECK_EXISTS_PATIENT_ORDER = gql`
  mutation ($input: PatientOrderInput!) {
    checkExistsRecordsPatientOrder(input: $input) {
      success
      message
    }
  }
`;

export const FILTER_BY_FIELDS_PATIENT_ORDER = gql`
  mutation ($input: PatientOrderInput!) {
    filterByFieldsPatientOrder(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        pId
        age
        ageUnits
        labId
        orderId
        rLab
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
          priceGroup
          priceList
          grossAmount
          netAmount
          discountAmount
          discountPer
          miscellaneousCharges
          dueDate
          resultDate
          cretical
          abnFlag
          orderStatus
          status
          reportGroup
          approvalDate
          approvalStatus
          autoRelease
          externalPanelCode
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
            methodOn
            methodName
            reportOrder
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
        enteredBy
        environment
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const GET_PACKAGES_LIST = gql`
  mutation ($input: PatientOrderInput!) {
    getPatientOrderPackagesList(input: $input) {
      success
      message
      packageList
    }
  }
`;
