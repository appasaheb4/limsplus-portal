import {gql} from '@apollo/client';

export const GENERAL_SETTING_LIST = gql`
  mutation ($input: PageSettingInput!) {
    pageSettings(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        tempCode
        reportSection
        sectionSetting
        pageSetting
        version
        environment
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const CREATE_GENERAL_SETTING = gql`
  mutation ($input: CreatePageSettingInput!) {
    createPageSetting(input: $input) {
      success
      message
    }
  }
`;

export const REMOVE_GENERAL_SETTING = gql`
  mutation ($input: PageSettingInput!) {
    removePageSetting(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_GENERAL_SETTING = gql`
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
        reportSection
        sectionSetting
        pageSetting
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
  mutation ($input: GeneralSettingInput!) {
    findByFieldsGeneralSetting(input: $input) {
      success
      message
      data {
        _id
        tempCode
        reportSection
        sectionSetting
        pageSetting
        version
        environment
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`;
