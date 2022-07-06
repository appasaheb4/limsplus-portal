import {gql} from '@apollo/client';

export const REPORT_FIELD_MAPPING_LIST = gql`
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
        section
        sectionStyle
        tableName
        fieldName
        startFromLine
        startFromColumn
        fieldLength
        fieldCondition
        fontId
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const CREATE_REPORT_FIELD_MAPPING = gql`
  mutation ($input: CreateGeneralSettingInput!) {
    createGeneralSetting(input: $input) {
      success
      message
    }
  }
`;

export const REMOVE_REPORT_FIELD_MAPPING = gql`
  mutation ($input: ReportFieldMappingInput!) {
    removeReportFieldMapping(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_REPORT_FIELD_MAPPING = gql`
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
        section
        sectionStyle
        tableName
        fieldName
        startFromLine
        startFromColumn
        fieldLength
        fieldCondition
        fontId
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`;

export const FIND_BY_FIELDS = gql`
  mutation ($input: ReportFieldMappingInput!) {
    findByFieldsReportFieldMapping(input: $input) {
      success
      message
      data {
        _id
        tempCode
        section
        sectionStyle
        tableName
        fieldName
        startFromLine
        startFromColumn
        fieldLength
        fieldCondition
        fontId
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`;
