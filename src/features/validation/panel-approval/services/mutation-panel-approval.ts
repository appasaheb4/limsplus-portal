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
        refRanges
        remarks
        deltaFlag
        deltaValue
        resultStatus
        testStatus
        approvalDate
        approvalStatus
        autoRelease
        patientOrderId
        patientResultId
        reportPriority
        enteredBy
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const UPDATE_RECORD = gql`
  mutation ($input: UpdatePanelApprovalInput!) {
    updatePanelApproval(input: $input) {
      success
      message
    }
  }
`;

export const FILTER = gql`
  mutation ($input: PanelApprovalInput!) {
    filterPanelApproval(input: $input) {
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
        refRanges
        remarks
        deltaFlag
        deltaValue
        resultStatus
        testStatus
        approvalDate
        approvalStatus
        autoRelease
        patientOrderId
        patientResultId
        reportPriority
        enteredBy
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`;
