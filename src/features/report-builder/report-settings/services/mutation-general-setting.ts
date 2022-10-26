import {gql} from '@apollo/client';

export const GENERAL_SETTING_LIST = gql`
  mutation ($input: GeneralSettingInput!) {
    generalSettings(input: $input) {
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
  mutation ($input: CreateGeneralSettingInput!) {
    createGeneralSetting(input: $input) {
      success
      message
    }
  }
`;

export const REMOVE_GENERAL_SETTING = gql`
  mutation ($input: GeneralSettingInput!) {
    removeGeneralSetting(input: $input) {
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
