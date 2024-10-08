import { gql } from '@apollo/client';

export const LIST = gql`
  mutation ($input: CorporateClientInput!) {
    corporateClients(input: $input) {
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
        corporateCode
        corporateName
        invoiceAc
        priceList
        clientSpecificPrice
        acType
        acClass
        billingOn
        billingFrequency
        address
        city
        state
        district
        country
        postalCode
        creditLimit
        consumedLimit
        customerGroup
        category
        confidential
        telephone
        mobileNo
        email
        reportTo
        reportToMobiles
        reportToEmails
        reportPriority
        deliveryMode
        salesTerritoRy
        area
        sbu
        zone
        urgent
        schedule
        reportFormat
        info
        fyiLine
        workLine
        isEmployeeCode
        specificFormat
        isBalanceCheck
        isPredefinedPanel
        panelList
        templateForImport
        templateForExport
        companyCode
        status
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const REMOVE_RECORD = gql`
  mutation ($input: CorporateClientRemoveInput!) {
    removeCorporateClient(input: $input) {
      success
      message
    }
  }
`;

export const CREATE_RECORD = gql`
  mutation ($input: CreateCorporateClientInput!) {
    createCorporateClient(input: $input) {
      success
      message
    }
  }
`;

export const VERSION_UPGRADE = gql`
  mutation ($input: CreateCorporateClientInput!) {
    versionUpgradeCorporateClient(input: $input) {
      success
      message
    }
  }
`;

export const DUPLICATE_RECORD = gql`
  mutation ($input: CreateCorporateClientInput!) {
    duplicateCorporateClient(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_RECORD = gql`
  mutation ($input: UpdateCorporateClientInput!) {
    updateCorporateClient(input: $input) {
      success
      message
    }
  }
`;

export const CHECK_EXISTS_RECORD = gql`
  mutation ($input: CorporateClientInput!) {
    checkCorporateClientExistsRecord(input: $input) {
      success
      message
    }
  }
`;

export const FILTER = gql`
  mutation ($input: CorporateClientInput!) {
    filterCorporateClient(input: $input) {
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
        corporateCode
        corporateName
        invoiceAc
        priceList
        clientSpecificPrice
        acType
        acClass
        billingOn
        billingFrequency
        address
        city
        state
        district
        country
        postalCode
        creditLimit
        consumedLimit
        customerGroup
        category
        telephone
        mobileNo
        email
        reportTo
        reportToMobiles
        reportToEmails
        reportPriority
        deliveryMode
        salesTerritoRy
        area
        sbu
        zone
        confidential
        urgent
        schedule
        reportFormat
        info
        fyiLine
        workLine
        isEmployeeCode
        specificFormat
        isBalanceCheck
        isPredefinedPanel
        panelList
        templateForImport
        templateForExport
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
  mutation ($input: CorporateClientInput!) {
    filterByFieldsCorporateClients(input: $input) {
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
        corporateCode
        corporateName
        invoiceAc
        priceList
        clientSpecificPrice
        acType
        acClass
        billingOn
        billingFrequency
        address
        city
        state
        district
        country
        postalCode
        creditLimit
        consumedLimit
        customerGroup
        category
        confidential
        telephone
        mobileNo
        email
        reportTo
        reportToMobiles
        reportToEmails
        reportPriority
        deliveryMode
        salesTerritoRy
        area
        sbu
        zone
        urgent
        schedule
        reportFormat
        info
        fyiLine
        workLine
        isEmployeeCode
        specificFormat
        isBalanceCheck
        isPredefinedPanel
        panelList
        templateForImport
        templateForExport
        companyCode
        status
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const COUNTER_CORPORATE_CLIENTS_INVOICEAC = gql`
  mutation ($input: CounterInput!) {
    counter(input: $input) {
      message
      success
      data
    }
  }
`;

export const FIND_BY_ARR_ITEMS = gql`
  mutation ($input: CorporateClientInput!) {
    findByArrayItemsCorporateCode(input: $input) {
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
        corporateCode
        corporateName
        invoiceAc
        priceList
        clientSpecificPrice
        acType
        acClass
        billingOn
        billingFrequency
        address
        city
        state
        district
        country
        postalCode
        creditLimit
        consumedLimit
        customerGroup
        category
        confidential
        telephone
        mobileNo
        email
        reportTo
        reportToMobiles
        reportToEmails
        reportPriority
        deliveryMode
        salesTerritoRy
        area
        sbu
        zone
        urgent
        schedule
        reportFormat
        info
        fyiLine
        workLine
        isEmployeeCode
        specificFormat
        isBalanceCheck
        isPredefinedPanel
        panelList
        templateForImport
        templateForExport
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
  mutation ($input: CorporateClientInput!) {
    findByFieldsCorporateClient(input: $input) {
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
        corporateCode
        corporateName
        invoiceAc
        priceList
        clientSpecificPrice
        acType
        acClass
        billingOn
        billingFrequency
        address
        city
        state
        district
        country
        postalCode
        creditLimit
        consumedLimit
        customerGroup
        category
        confidential
        telephone
        mobileNo
        email
        reportTo
        reportToMobiles
        reportToEmails
        reportPriority
        deliveryMode
        salesTerritoRy
        area
        sbu
        zone
        urgent
        schedule
        reportFormat
        info
        fyiLine
        workLine
        isEmployeeCode
        specificFormat
        isBalanceCheck
        isPredefinedPanel
        panelList
        templateForImport
        templateForExport
        companyCode
        status
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`;
