import {gql} from '@apollo/client';

export const LIST = gql`
  mutation ($input: PackageMasterInput!) {
    packageMasters(input: $input) {
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
        lab
        packageCode
        packageName
        panelCode
        panelName
        bill
        printPackageName
        printPanelName
        packageInterpretation
        panelInterpretation
        status
        serviceType
        reportOrder
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const REMOVE_RECORD = gql`
  mutation ($input: PackageMasterRemoveInput!) {
    removePackageMaster(input: $input) {
      success
      message
    }
  }
`;

export const CREATE_RECORD = gql`
  mutation ($input: CreatePackageMasterInput!) {
    createPackageMaster(input: $input) {
      success
      message
    }
  }
`;

export const VERSION_UPGRADE = gql`
  mutation ($input: CreatePackageMasterInput!) {
    versionUpgradePackageMaster(input: $input) {
      success
      message
    }
  }
`;

export const DUPLICATE_RECORD = gql`
  mutation ($input: CreatePackageMasterInput!) {
    duplicatePackageMaster(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_RECORD = gql`
  mutation ($input: UpdatePackageMasterInput!) {
    updatePackageMaster(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_REPO_RECORD = gql`
  mutation ($input: UpdatePackageMasterInput!) {
    updateRepOPackageMaster(input: $input) {
      success
      message
    }
  }
`;

export const CHECK_EXISTS_RECORD = gql`
  mutation ($input: PackageMasterInput!) {
    checkPackageMasterExistsRecord(input: $input) {
      success
      message
    }
  }
`;

export const FILTER = gql`
  mutation ($input: PackageMasterInput!) {
    filterPackageMaster(input: $input) {
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
        lab
        packageCode
        packageName
        panelCode
        panelName
        bill
        printPackageName
        printPanelName
        packageInterpretation
        panelInterpretation
        status
        serviceType
        reportOrder
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const FILTER_BY_FIELDS = gql`
  mutation ($input: PackageMasterInput!) {
    filterByFieldsPackageMaster(input: $input) {
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
        lab
        packageCode
        packageName
        panelCode
        panelName
        bill
        printPackageName
        printPanelName
        packageInterpretation
        panelInterpretation
        status
        serviceType
        reportOrder
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const FIND_BY_FIELDS = gql`
  mutation ($input: PackageMasterInput!) {
    findByFieldsPackageMaster(input: $input) {
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
        lab
        packageCode
        packageName
        panelCode
        panelName
        bill
        printPackageName
        printPanelName
        packageInterpretation
        panelInterpretation
        status
        serviceType
        reportOrder
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`;
