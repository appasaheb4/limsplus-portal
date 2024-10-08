import { gql } from '@apollo/client';

export const LIST = gql`
  mutation ($input: DepartmentInput!) {
    departments(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        lab
        code
        name
        shortName
        hod
        authorizedSignatory
        reportOrder
        mobileNo
        contactNo
        autoRelease
        requireReceveInLab
        requireScainIn
        routingDept
        openingTime
        closingTime
        fyiLine
        workLine
        companyCode
        status
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const CREATE_RECORD = gql`
  mutation ($input: CreateDepartmentInput!) {
    createDepartment(input: $input) {
      success
      message
    }
  }
`;

export const REMOVE_RECORDS = gql`
  mutation ($input: DepartmentRemoveInput!) {
    removeDepartment(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_RECORD = gql`
  mutation ($input: UpdateDepartmentInput!) {
    updateDepartment(input: $input) {
      success
      message
    }
  }
`;

export const EXISTS_RECORD = gql`
  mutation ($input: DepartmentInput!) {
    checkDepartmentExistsRecord(input: $input) {
      success
      message
    }
  }
`;

export const FILTER = gql`
  mutation ($input: DepartmentInput!) {
    filterDepartments(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        lab
        code
        name
        shortName
        hod
        authorizedSignatory
        reportOrder
        mobileNo
        contactNo
        autoRelease
        requireReceveInLab
        requireScainIn
        routingDept
        openingTime
        closingTime
        fyiLine
        workLine
        companyCode
        status
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const FILTER_BY_FIELDS = gql`
  mutation ($input: DepartmentInput!) {
    filterByFieldsDepartments(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        lab
        code
        name
        shortName
        hod
        authorizedSignatory
        reportOrder
        mobileNo
        contactNo
        autoRelease
        requireReceveInLab
        requireScainIn
        routingDept
        openingTime
        closingTime
        fyiLine
        workLine
        companyCode
        status
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const FIND_BY_FIELDS = gql`
  mutation ($input: DepartmentInput!) {
    findByFieldsDepartments(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        lab
        code
        name
        shortName
        hod
        authorizedSignatory
        reportOrder
        mobileNo
        contactNo
        autoRelease
        requireReceveInLab
        requireScainIn
        routingDept
        openingTime
        closingTime
        fyiLine
        workLine
        companyCode
        status
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`;
