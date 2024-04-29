import { gql } from '@apollo/client';

export const COMPANY_LIST = gql`
  mutation ($input: CompanyInput!) {
    companies(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        code
        name
        description
        module
        labCode
        labName
        departmentCode
        departmentName
        allowedUser
        admin
        password
        postalCode
        country
        state
        district
        city
        area
        address
        mobileNo
        contactNo
        email
        web
        webPortal
        registeredOffice
        corporateOffice
        customerCare
        gst
        sacCode
        cinNo
        companyLogo
        fyiLine
        workLine
        dateCreation
        dateActive
        dateExpire
        enteredBy
        supportPlan
        version
        status
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const CREATE_COMPANY = gql`
  mutation ($input: CreateCompanyInput!) {
    createCompany(input: $input) {
      success
      message
    }
  }
`;

export const REMOVE_COMPANY = gql`
  mutation ($input: CompanyRemoveInput!) {
    removeCompany(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_COMPANY = gql`
  mutation ($input: UpdateCompanyInput!) {
    updateCompany(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_IMAGE = gql`
  mutation ($input: UpdateBannerInput!) {
    updateBannerImage(input: $input) {
      success
      message
    }
  }
`;

export const FILTER = gql`
  mutation ($input: CompanyInput!) {
    filterCompany(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        code
        name
        description
        module
        labCode
        labName
        departmentCode
        departmentName
        allowedUser
        admin
        password
        postalCode
        country
        state
        district
        city
        area
        address
        mobileNo
        contactNo
        email
        web
        webPortal
        registeredOffice
        corporateOffice
        customerCare
        gst
        sacCode
        cinNo
        companyLogo
        fyiLine
        workLine
        dateCreation
        dateActive
        dateExpire
        enteredBy
        supportPlan
        version
        status
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const FILTER_BY_FIELDS = gql`
  mutation ($input: CompanyInput!) {
    filterByFieldsCompany(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        code
        name
        description
        module
        labCode
        labName
        departmentCode
        departmentName
        allowedUser
        admin
        password
        postalCode
        country
        state
        district
        city
        area
        address
        mobileNo
        contactNo
        email
        web
        webPortal
        registeredOffice
        corporateOffice
        customerCare
        gst
        sacCode
        cinNo
        companyLogo
        fyiLine
        workLine
        dateCreation
        dateActive
        dateExpire
        enteredBy
        supportPlan
        version
        status
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const FIND_BY_FIELDS = gql`
  mutation ($input: CompanyInput!) {
    findByFieldsCompany(input: $input) {
      success
      message
      data {
        _id
        code
        name
        description
        module
        labCode
        labName
        departmentCode
        departmentName
        allowedUser
        admin
        password
        postalCode
        country
        state
        district
        city
        area
        address
        mobileNo
        contactNo
        email
        web
        webPortal
        registeredOffice
        corporateOffice
        customerCare
        gst
        sacCode
        cinNo
        companyLogo
        fyiLine
        workLine
        dateCreation
        dateActive
        dateExpire
        enteredBy
        supportPlan
        version
        status
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`;
