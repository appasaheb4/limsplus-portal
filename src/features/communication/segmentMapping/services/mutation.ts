import { gql } from "@apollo/client"
     
export const LIST = gql`
  mutation($input: SegmentMappingInput!) {
    segmentMappings(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        dataFlowFrom
        data_type
        equipmentType
        segments
        segment_usage
        field_no
        item_no
        field_required
        element_name
        transmitted_data
        field_array
        field_length
        field_type
        repeat_delimiter
        mandatory
        lims_descriptions
        lims_tables
        lims_fields
        required_for_lims
        notes
        attachments
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`

export const REMOVE_RECORD = gql`
  mutation($input: SegmentMappingRemoveInput!) {
    removeSegmentMapping(input: $input) {
      success
      message
    }
  }
`

export const CREATE_RECORD = gql`
  mutation($input: CreateSegmentMappingInput!) {
    createSegmentMapping(input: $input) {
      success
      message
    }
  }
`

export const IMPORT_RECORDS = gql`
  mutation($input: CreateSegmentMappingInput!) {
    importSegmentMapping(input: $input) {
      success
      message
    }
  }
`

export const UPDATE_RECORD = gql`
  mutation($input: UpdateSegmentMappingInput!) {
    updateSegmentMapping(input: $input) {
      success
      message
    }
  }
`

export const CHECK_EXISTS_RECORD = gql`
  mutation($input: RoleInput!) {
    checkRoleExistsEnvCode(input: $input) {
      success
      message
    }
  }
`

export const FILTER = gql`
  mutation($input: SegmentMappingInput!) {
    filterSegmentMappings(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data{
        _id
        dataFlowFrom
        data_type
        equipmentType
        segments
        segment_usage
        field_no
        item_no
        field_required
        element_name
        transmitted_data
        field_array
        field_length
        field_type
        repeat_delimiter
        mandatory
        lims_descriptions
        lims_tables
        lims_fields
        required_for_lims
        notes
        attachments
        environment
        dateOfEntry
        lastUpdated
      }
    }
  }
`