import {gql} from '@apollo/client';

export const PAGE_SETTING_LIST = gql`
  mutation ($input: SectionSettingInput!) {
    sectionSettings(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        tempCode
        pageSize
        topMargin
        bottomMargin
        leftMargin
        rightMargin
        headerSize
        footerSize
        pageOrientation
        backgroundImage
        version
        environment
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const CREATE_PAGE_SETTING = gql`
  mutation ($input: CreatePageSettingInput!) {
    createPageSetting(input: $input) {
      success
      message
    }
  }
`;

export const REMOVE_PAGE_SETTING = gql`
  mutation ($input: SectionSettingInput!) {
    removeSectionSetting(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_PAGE_SETTING = gql`
  mutation ($input: UpdateBannerInput!) {
    updateBanner(input: $input) {
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
        pageSize
        topMargin
        bottomMargin
        leftMargin
        rightMargin
        headerSize
        footerSize
        pageOrientation
        backgroundImage
        version
        environment
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const FIND_BY_FIELDS = gql`
  mutation ($input: PageSettingInput!) {
    findByFieldsPageSetting(input: $input) {
      success
      message
      data {
        _id
        tempCode
        pageSize
        topMargin
        bottomMargin
        leftMargin
        rightMargin
        headerSize
        footerSize
        pageOrientation
        backgroundImage
        version
        environment
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`;
