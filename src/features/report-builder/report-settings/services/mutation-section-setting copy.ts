import {gql} from '@apollo/client';

export const SECTION_SETTING_LIST = gql`
  mutation ($input: SectionSettingInput!) {
    sectionSettings(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        sectionSetting
        sectionRequired
        sectionGrid
        lineGrid
        columnGrid
        tempCode
        version
        environment
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const CREATE_SECTION_SETTING = gql`
  mutation ($input: CreateSectionSettingInput!) {
    createSectionSetting(input: $input) {
      success
      message
    }
  }
`;

export const REMOVE_SECTION_SETTING = gql`
  mutation ($input: SectionSettingInput!) {
    removeSectionSetting(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_SECTION_SETTING = gql`
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
        title
        image
        environment
      }
    }
  }
`;

export const FIND_BY_FIELDS = gql`
  mutation ($input: SectionSettingInput!) {
    findByFieldsSectionSetting(input: $input) {
      success
      message
      data {
        _id
        sectionSetting
        sectionRequired
        sectionGrid
        lineGrid
        columnGrid
        tempCode
        version
        environment
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`;
