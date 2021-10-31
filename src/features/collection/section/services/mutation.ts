import { gql } from "@apollo/client"

export const LIST = gql`
  mutation($input: SectionInput!) {
    sections(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        departmentCode
        code
        name
        shortName
        sectionInCharge
        mobileNo
        contactNo
        fyiLine
        workLine
        status
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`

export const REMOVE_RECORD = gql`
  mutation($input: SectionRemoveInput!) {
    removeSection(input: $input) {
      success
      message
    }
  }
`

export const CREATE_RECORD = gql`
  mutation($input: CreateSectionInput!) {
    createSection(input: $input) {
      success
      message
    }
  }
`

export const UPDATE_RECORD = gql`
  mutation($input: UpdateSectionInput!) {
    updateSection(input: $input) {
      success
      message
    }
  }
`

export const CHECK_EXISTS_RECORD = gql`
  mutation($input: SectionInput!) {
    checkSectionExistsRecord(input: $input) {
      success
      message
    }
  }  
`
   
export const FIND_SECTIONLISTBY_DEPTCODE = gql`
  mutation($input: SectionInput!) {
    findSectionListByDeptCode(input: $input) {
      success
      message
      data{
        _id
        departmentCode
        code
        name
        shortName
        sectionInCharge
        mobileNo
        contactNo
        fyiLine
        workLine
        status
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`
