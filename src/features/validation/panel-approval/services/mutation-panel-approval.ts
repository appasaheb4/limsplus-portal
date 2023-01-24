import {gql} from '@apollo/client';

export const PANEL_APPROVAL_LIST = gql`
  mutation ($input: PanelApprovalInput!) {
    panelApprovals(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        pId
        name
        age
        sex
        dob
        patientMobileNo
        doctorId
        doctorMobileNo
        registrationLocation
        contactNo
        history
        historyDetails
        labId
        sampleId
        sampleType
        containerId
        panel
        dueDate
        status
        comments
        pLab
        department
        test
        analyte
        result
        final
        abnFlag
        critical
        units
        refRanges: JSON;
        remarks
        deltaFlag
        deltaValue
        resultStatus
        testStatus
        approvalDate
        approvalStatus
        autoRelease
        patientOrderId
        enteredBy
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const FIND_BY_FIELDS_TRANSACTION_LINE = gql`
  mutation ($input: TransactionLineInput!) {
    findByFieldsTransactionLine(input: $input) {
      success
      message
      data {
        _id
        headerId
        lineId
        rLab
        pLab
        collectionCenter
        collectionCenterName
        corporateCode
        invoiceAC
        invoiceDate
        actionDate
        receipt
        pId
        labId
        acSub
        department
        serviceType
        panelCode
        panelName
        priceGroup
        priceList
        grossAmount
        netAmount
        discountAmount
        discountPer
        miscellaneousCharges
        transaction
        acClass
        accountType
        customerGroup
        status
        enteredBy
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`;
