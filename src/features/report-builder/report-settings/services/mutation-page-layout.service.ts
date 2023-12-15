import { gql } from '@apollo/client';

export const TEMPLATE_SETTING_LIST = gql`
  mutation ($input: TemplateSettingInput!) {
    templateSettings(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        tempCode
        tempName
        isToolbar
        isBackgroundImage
        backgroundImage
        pageSize
        mainBoxCSS
        companyCode
        environment
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const CREATE_TEMPLATE_SETTING = gql`
  mutation ($input: CreateTemplateSettingInput!) {
    createTemplateSetting(input: $input) {
      success
      message
    }
  }
`;

export const REMOVE_TEMPLATE_SETTING = gql`
  mutation ($input: TemplateSettingInput!) {
    removeTemplateSetting(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_TEMPLATE_SETTING = gql`
  mutation ($input: UpdateTemplateSettingInput!) {
    updateTemplateSetting(input: $input) {
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
        tempName
        isToolbar
        isBackgroundImage
        backgroundImage
        pageSize
        mainBoxCSS
        companyCode
        environment
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const FIND_BY_FIELDS = gql`
  mutation ($input: TemplateSettingInput!) {
    findByFieldsTemplateSetting(input: $input) {
      success
      message
      data {
        _id
        tempCode
        tempName
        isToolbar
        isBackgroundImage
        backgroundImage
        pageSize
        mainBoxCSS
        companyCode
        environment
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`;
