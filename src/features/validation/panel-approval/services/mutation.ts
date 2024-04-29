import { gql } from '@apollo/client';

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
        picture
        result
        final
        abnFlag
        critical
        units
        refRangesList
        conclusion
        loNor
        hiNor
        resultType
        rangeType
        panelCode
        testCode
        testName
        analyteName
        analyteCode
        resultDate
        remarks
        deltaFlag
        deltaValue
        resultStatus
        testStatus
        approvalDate
        approvalStatus
        autoRelease
        isResultUpdate
        patientOrderId
        patientResultId
        reportPriority
        colorScheme
        validationLevel
        companyCode
        environment
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

export const UPDATE_BY_IDS_RECORD = gql`
  mutation ($input: UpdatePanelApprovalInput!) {
    updateByIdsPanelApproval(input: $input) {
      success
      message
    }
  }
`;

export const FIND = gql`
  mutation ($input: PanelApprovalInput!) {
    findByFieldsPanelApproval(input: $input) {
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
        picture
        result
        final
        abnFlag
        critical
        units
        refRangesList
        conclusion
        loNor
        hiNor
        resultType
        rangeType
        panelCode
        testCode
        testName
        analyteName
        analyteCode
        resultDate
        remarks
        deltaFlag
        deltaValue
        resultStatus
        testStatus
        approvalDate
        approvalStatus
        autoRelease
        isResultUpdate
        patientOrderId
        patientResultId
        reportPriority
        colorScheme
        validationLevel
        companyCode
        environment
        enteredBy
        documentType
        dateOfEntry
        lastUpdated
      }
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
        picture
        result
        final
        abnFlag
        critical
        units
        refRangesList
        conclusion
        loNor
        hiNor
        resultType
        rangeType
        panelCode
        testCode
        testName
        analyteName
        analyteCode
        resultDate
        remarks
        deltaFlag
        deltaValue
        resultStatus
        testStatus
        approvalDate
        approvalStatus
        autoRelease
        isResultUpdate
        patientOrderId
        patientResultId
        reportPriority
        colorScheme
        validationLevel
        companyCode
        environment
        enteredBy
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const RECALL = gql`
  mutation ($input: PanelApprovalInput!) {
    reCallPanelApproval(input: $input) {
      success
      message
      data {
        _id
        name
        labId
        panel
        test
        analyte
        picture
        result
        panelCode
        testCode
        testName
        analyteName
        analyteCode
        approvalDate
        approvalStatus
        patientOrderId
        patientResultId
        companyCode
        environment
        enteredBy
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`;
