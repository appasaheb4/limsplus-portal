import { gql } from "@apollo/client"

export const LIST = gql`
  mutation($input: PanelMasterInput!) {
    panelMasters(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        existsVersionId
        existsRecordId
        dateCreation
        dateActive
        dateExpire
        version
        enteredBy
        rLab
        pLab
        department
        section
        panelCode
        panelName
        description
        shortName
        bill
        price
        schedule
        autoRelease
        holdOOS
        validationLevel
        confidential
        urgent
        reportGroup
        reportOrder
        ageAction
        hiAge
        loAge
        sexAction
        sex
        actionMessage
        ageSexAction
        processing
        category
        suffix
        serviceType
        panelType
        repitation
        tubeGroup
        printLabel
        labelInstruction
        pageBreak
        method
        panelMethodCode
        panelMethodName
        workflow
        cumulative
        reportTemplate
        sampleType
        specalInstructions
        status
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`

export const REMOVE_RECORD = gql`
  mutation($input: PanelMasterRemoveInput!) {
    removePanelMaster(input: $input) {
      success
      message
    }
  }
`

export const CREATE_RECORD = gql`
  mutation($input: CreatePanelMasterInput!) {
    createPanelMaster(input: $input) {
      success
      message
    }
  }
`

export const VERSION_UPGRADE = gql`
  mutation($input: CreatePanelMasterInput!) {
    versionUpgradePanelMaster(input: $input) {
      success
      message
    }
  }
`

export const DUPLICATE_RECORD = gql`
  mutation($input: CreatePanelMasterInput!) {
    duplicatePanelMaster(input: $input) {
      success
      message
    }
  }
`

export const UPDATE_RECORD = gql`
  mutation($input: UpdatePanelMasterInput!) {
    updatePanelMaster(input: $input) {
      success
      message
    }
  }
`

export const CHECK_EXISTS_RECORD = gql`
  mutation($input: PanelMasterInput!) {
    checkPanelMasterExistsRecord(input: $input) {
      success
      message
    }
  }
`

export const FILTER = gql`
  mutation($input: PanelMasterInput!) {
    filterPanelMaster(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        existsVersionId
        existsRecordId
        dateCreation
        dateActive
        dateExpire
        version
        enteredBy
        rLab
        pLab
        department
        section
        panelCode
        panelName
        description
        shortName
        bill
        price
        schedule
        autoRelease
        holdOOS
        validationLevel
        confidential
        urgent
        reportGroup
        reportOrder
        ageAction
        hiAge
        loAge
        sexAction
        sex
        actionMessage
        ageSexAction
        processing
        category
        suffix
        serviceType
        panelType
        repitation
        tubeGroup
        printLabel
        labelInstruction
        pageBreak
        method
        panelMethodCode
        panelMethodName
        workflow
        cumulative
        reportTemplate
        sampleType
        specalInstructions
        status
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`

export const FILTER_BY_FIELDS = gql`
  mutation($input: PanelMasterInput!) {
    filterByFieldsPanelMaster(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        existsVersionId
        existsRecordId
        dateCreation
        dateActive
        dateExpire
        version
        enteredBy
        rLab
        pLab
        department
        section
        panelCode
        panelName
        description
        shortName
        bill
        price
        schedule
        autoRelease
        holdOOS
        validationLevel
        confidential
        urgent
        reportGroup
        reportOrder
        ageAction
        hiAge
        loAge
        sexAction
        sex
        actionMessage
        ageSexAction
        processing
        category
        suffix
        serviceType
        panelType
        repitation
        tubeGroup
        printLabel
        labelInstruction
        pageBreak
        method
        panelMethodCode
        panelMethodName
        workflow
        cumulative
        reportTemplate
        sampleType
        specalInstructions
        status
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`
