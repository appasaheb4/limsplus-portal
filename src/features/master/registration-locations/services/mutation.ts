import { gql } from '@apollo/client';

export const LIST = gql`
  mutation ($input: RegistrationLocationInput!) {
    registrationLocations(input: $input) {
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
        locationCode
        locationName
        address
        city
        state
        district
        country
        postalCode
        customerGroup
        category
        confidential
        telephone
        mobileNo
        email
        reportPriority
        deliveryMode
        reportTo
        corporateCode
        corporateName
        invoiceAc
        priceList
        printLabel
        methodColn
        salesTerritoRy
        area
        sbu
        zone
        route
        lab
        neverBill
        urgent
        reportFormat
        info
        fyiLine
        workLine
        acClass
        accountType
        gstNo
        isPrintPrimaryBarcod
        isPrintSecondaryBarcode
        openingTime
        closingTime
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
  mutation ($input: RegistrationLocationRemoveInput!) {
    removeRegistrationLocation(input: $input) {
      success
      message
    }
  }
`;

export const CREATE_RECORD = gql`
  mutation ($input: CreateRegistrationLocationInput!) {
    createRegistrationLocation(input: $input) {
      success
      message
    }
  }
`;

export const VERSION_UPGRADE = gql`
  mutation ($input: CreateRegistrationLocationInput!) {
    versionUpgradeRegistrationLocation(input: $input) {
      success
      message
    }
  }
`;

export const DUPLICATE_RECORD = gql`
  mutation ($input: CreateRegistrationLocationInput!) {
    duplicateRegistrationLocation(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_RECORD = gql`
  mutation ($input: UpdateRegistrationLocationInput!) {
    updateRegistrationLocation(input: $input) {
      success
      message
    }
  }
`;

export const CHECK_EXISTS_RECORD = gql`
  mutation ($input: RegistrationLocationInput!) {
    checkRegistrationLocationExistsRecord(input: $input) {
      success
      message
    }
  }
`;

export const FILTER = gql`
  mutation ($input: RegistrationLocationInput!) {
    filterRegistrationLocations(input: $input) {
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
        locationCode
        locationName
        address
        city
        state
        district
        country
        postalCode
        customerGroup
        category
        confidential
        telephone
        mobileNo
        email
        reportPriority
        deliveryMode
        reportTo
        corporateCode
        corporateName
        invoiceAc
        priceList
        printLabel
        methodColn
        salesTerritoRy
        area
        sbu
        zone
        route
        lab
        neverBill
        urgent
        reportFormat
        info
        fyiLine
        workLine
        acClass
        accountType
        gstNo
        isPrintPrimaryBarcod
        isPrintSecondaryBarcode
        openingTime
        closingTime
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
  mutation ($input: RegistrationLocationInput!) {
    filterByFieldsRegistrationLocations(input: $input) {
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
        locationCode
        locationName
        address
        city
        state
        district
        country
        postalCode
        customerGroup
        category
        confidential
        telephone
        mobileNo
        email
        reportPriority
        deliveryMode
        reportTo
        corporateCode
        corporateName
        invoiceAc
        priceList
        printLabel
        methodColn
        salesTerritoRy
        area
        sbu
        zone
        route
        lab
        neverBill
        urgent
        reportFormat
        info
        fyiLine
        workLine
        acClass
        accountType
        gstNo
        isPrintPrimaryBarcod
        isPrintSecondaryBarcode
        openingTime
        closingTime
        companyCode
        status
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const FIND_BY_ARRAY_ITEMS = gql`
  mutation ($input: RegistrationLocationInput!) {
    findByArrayItemsRegistrationLocations(input: $input) {
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
        locationCode
        locationName
        address
        city
        state
        district
        country
        postalCode
        customerGroup
        category
        confidential
        telephone
        mobileNo
        email
        reportPriority
        deliveryMode
        reportTo
        corporateCode
        corporateName
        invoiceAc
        priceList
        printLabel
        methodColn
        salesTerritoRy
        area
        sbu
        zone
        route
        lab
        neverBill
        urgent
        reportFormat
        info
        fyiLine
        workLine
        acClass
        accountType
        gstNo
        isPrintPrimaryBarcod
        isPrintSecondaryBarcode
        openingTime
        closingTime
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
  mutation ($input: RegistrationLocationInput!) {
    findByFieldsRegistrationLocation(input: $input) {
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
        locationCode
        locationName
        address
        city
        state
        district
        country
        postalCode
        customerGroup
        category
        confidential
        telephone
        mobileNo
        email
        reportPriority
        deliveryMode
        reportTo
        corporateCode
        corporateName
        invoiceAc
        priceList
        printLabel
        methodColn
        salesTerritoRy
        area
        sbu
        zone
        route
        lab
        neverBill
        urgent
        reportFormat
        info
        fyiLine
        workLine
        acClass
        accountType
        gstNo
        isPrintPrimaryBarcod
        isPrintSecondaryBarcode
        openingTime
        closingTime
        companyCode
        status
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`;
