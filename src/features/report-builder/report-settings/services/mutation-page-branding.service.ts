import {gql} from '@apollo/client';

export const PAGE_BRANDING_LIST = gql`
  mutation ($input: PageBrandingInput!) {
    pageBrandings(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        tempCode
        brandingTitle
        templateSettings
        header
        subHeader
        footer
        pageNumber
        isHeader
        isSubHeader
        isFooter
        isPdfPageNumber
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const CREATE_PAGE_BRANDING = gql`
  mutation ($input: CreatePageBrandingInput!) {
    createPageBranding(input: $input) {
      success
      message
    }
  }
`;

export const REMOVE_PAGE_BRANDING = gql`
  mutation ($input: PageBrandingInput!) {
    removePageBranding(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_PAGE_BRANDING = gql`
  mutation ($input: UpdatePageBrandingInput!) {
    updatePageBranding(input: $input) {
      success
      message
    }
  }
`;

export const FILTER = gql`
  mutation ($input: BannerInput!) {
    filterBanners(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        tempCode
        brandingTitle
        templateSettings
        header
        subHeader
        footer
        pageNumber
        isHeader
        isSubHeader
        isFooter
        isPdfPageNumber
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const FILTER_BY_FIELDS = gql`
  mutation ($input: PageSettingInput!) {
    filterByFieldsPageSetting(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        tempCode
        brandingTitle
        templateSettings
        header
        subHeader
        footer
        pageNumber
        isHeader
        isSubHeader
        isFooter
        isPdfPageNumber
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const FIND_BY_FIELDS = gql`
  mutation ($input: PageBrandingInput!) {
    findByFieldsPageBranding(input: $input) {
      success
      message
      data {
        _id
        tempCode
        brandingTitle
        templateSettings
        header
        subHeader
        footer
        pageNumber
        isHeader
        isSubHeader
        isFooter
        isPdfPageNumber
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`;
