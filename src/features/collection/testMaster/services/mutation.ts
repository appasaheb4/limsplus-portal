import { gql } from "@apollo/client"
   
export const LIST = gql`
  mutation($input: TestMasterInput!) {
    testMasters(input: $input) {
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
        dateActiveFrom
        dateActiveTo
        version
        enteredBy
        rLab
        pLab
        department
        section
        testCode
        testName
        description
        shortName
        bill
        price
        schedule
        tat
        autoFinish
        holdOOS
        validationLevel
        confidential
        urgent
        instantResult
        reportGroup
        resultOrder
        accredited
        cretical
        processing
        repitation
        tubeGroup
        printLabel
        labelInstruction
        method
        panelMethod
        sampleRunOn
        workflow
        cumulative
        sampleType
        speicalInstructions
        disease
        category
        testType
        workflowCode
        worklistCode
        cptCode
        qcHold
        oosHold
        deltaHold
        prefix
        sufix
        deleverySchedule
        allowPartial
        collectionContainer
        holdingDays
        status   
        environment
        dateOfEntry
        lastUpdated  
      }
    }
  }
`

export const REMOVE_RECORD = gql`
  mutation($input: TestAnalyteMappingRemoveInput!) {
    removeTestAnalyteMapping(input: $input) {
      success
      message
    }
  }
`

export const CREATE_RECORD = gql`
  mutation($input: CreateAnalyteMasterInput!) {
    createAnalyteMaster(input: $input) {
      success
      message
    }
  }
`

export const VERSION_UPGRADE = gql`
  mutation($input: CreateAnalyteMasterInput!) {
    versionUpgradeAnalyteMaster(input: $input) {
      success
      message
    }
  }
`

export const DUPLICATE_RECORD = gql`
  mutation($input: CreateAnalyteMasterInput!) {
    duplicateAnalyteMaster(input: $input) {
      success
      message
    }
  }
`

export const UPDATE_RECORD = gql`
  mutation($input: UpdateAnalyteMasterInput!) {
    updateAnalyteMaster(input: $input) {
      success
      message
    }
  }
`

export const CHECK_EXISTS_RECORD = gql`
  mutation($input: AnalyteMasterInput!) {
    checkAnalyteMasterExistsRecord(input: $input) {
      success
      message
    }
  }
`
