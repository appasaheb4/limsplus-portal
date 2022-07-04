import {gql} from '@apollo/client';

export const FONT_SETTING_LIST = gql`
  mutation ($input: GeneralSettingInput!) {
    generalSettings(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        fontId
        fontName
        fontSize
        fontStyle
        fontColor
        fontBackground
        fontCase
        fontCss
        version
        environment
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const CREATE_FONT_SETTING = gql`
  mutation ($input: CreateFontSettingInput!) {
    createFontSetting(input: $input) {
      success
      message
    }
  }
`;

export const REMOVE_FONT_SETTING = gql`
  mutation ($input: GeneralSettingInput!) {
    removeGeneralSetting(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_FONT_SETTING = gql`
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
        fontId
        fontName
        fontSize
        fontStyle
        fontColor
        fontBackground
        fontCase
        fontCss
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
  mutation ($input: FontSettingInput!) {
    findByFieldsFontSetting(input: $input) {
      success
      message
      data {
        _id
        fontId
        fontName
        fontSize
        fontStyle
        fontColor
        fontBackground
        fontCase
        fontCss
        version
        environment
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`;
