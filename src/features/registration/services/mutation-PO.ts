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
