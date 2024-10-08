import { gql } from '@apollo/client';

export const LIST_PATIENT_VISIT = gql`
  mutation ($input: PatientVisitInput!) {
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
        labId
        patientName
        visitDate
        registrationDate
        collectionDate
        dueDate
        birthDate
        age
        ageUnits
        collectionCenter
        collectionCenterName
        corporateCode
        corporateName
        isEmployeeCode
        acClass
        grossAmount
        netAmount
        discountAmount
        discountPer
        isNewDoctor
        doctorId
        doctorName
        doctorMobileNo
        miscellaneousCharges
        miscCharges
        discountCharges
        reportPriority
        deliveryMode
        reportTo
        history
        holdReport
        holdReason
        resultDate
        abnFlag
        critical
        isPrintPrimaryBarcod
        specificFormat
        status
        extraData {
          accountType
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
          externalLabId
          employeeCode
        }
        environment
        companyCode
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const CREATE_PATIENT_VISIT = gql`
  mutation ($input: CreatePatientVisitInput!) {
    createPatientVisit(input: $input) {
      success
      message
      labId
      result
    }
  }
`;

export const REMOVE_PATIENT_VISIT = gql`
  mutation ($input: PatientVisitRemoveInput!) {
    removePatientVisit(input: $input) {
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

export const FILTER_PATIENT_VISIT = gql`
  mutation ($input: PatientVisitInput!) {
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
        labId
        patientName
        visitDate
        registrationDate
        collectionDate
        dueDate
        birthDate
        age
        ageUnits
        collectionCenter
        collectionCenterName
        corporateCode
        corporateName
        isEmployeeCode
        acClass
        grossAmount
        netAmount
        discountAmount
        discountPer
        isNewDoctor
        doctorId
        doctorName
        doctorMobileNo
        miscellaneousCharges
        miscCharges
        discountCharges
        reportPriority
        deliveryMode
        reportTo
        history
        holdReport
        holdReason
        resultDate
        abnFlag
        critical
        isPrintPrimaryBarcod
        specificFormat
        status
        extraData {
          accountType
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
          externalLabId
          employeeCode
        }
        environment
        companyCode
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const FILTER_BY_LAB_ID_PATIENT_VISIT = gql`
  mutation ($input: PatientVisitInput!) {
    filterByLabIdPatientVisit(input: $input) {
      success
      message
      data {
        labId
      }
    }
  }
`;

export const COUNTER = gql`
  mutation ($input: CounterInput!) {
    counter(input: $input) {
      message
      success
      data
    }
  }
`;

export const CHECK_EXISTS_PATIENT = gql`
  mutation ($input: PatientManagerInput!) {
    checkExistsPatientManager(input: $input) {
      success
      message
    }
  }
`;

export const FILTER_BY_FIELDS_PATIENT_VISIT = gql`
  mutation ($input: PatientVisitInput!) {
    filterByFieldsPatientVisit(input: $input) {
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
        labId
        patientName
        visitDate
        registrationDate
        collectionDate
        dueDate
        birthDate
        age
        ageUnits
        collectionCenter
        collectionCenterName
        corporateCode
        corporateName
        isEmployeeCode
        acClass
        grossAmount
        netAmount
        discountAmount
        discountPer
        isNewDoctor
        doctorId
        doctorName
        doctorMobileNo
        miscellaneousCharges
        miscCharges
        discountCharges
        reportPriority
        deliveryMode
        reportTo
        history
        holdReport
        holdReason
        resultDate
        abnFlag
        critical
        isPrintPrimaryBarcod
        specificFormat
        status
        extraData {
          accountType
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
          externalLabId
          employeeCode
        }
        environment
        companyCode
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const CHECK_EXISTS_RECORD = gql`
  mutation ($input: PatientVisitInput!) {
    checkExistsPatientVisitRecord(input: $input) {
      success
      message
    }
  }
`;
