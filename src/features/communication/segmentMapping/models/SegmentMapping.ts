export class SegmentMapping {
    _id?: string
    dataFlowFrom?: string
    data_type?: string
    equipmentType?: string
    segments?: string
    segment_usage?: string
    field_no?: string
    item_no?: string
    field_required?: boolean
    element_name?: string
    transmitted_data?: string
    field_array?: string
    field_length?: string
    field_type?: string
    repeat_delimiter?: boolean
    mandatory?: boolean
    lims_descriptions?: string
    lims_tables?: string
    lims_fields?: string
    required_for_lims?: boolean
    notes?: string
    attachments?: any
    environment?: string
    dateOfEntry?: string
    lastUpdated?: string
    __v?: string
    constructor(rawData: { [key in string]: any }) {
      this._id = rawData._id
      this.dataFlowFrom = rawData.dataFlowFrom
      this.data_type = rawData.data_type
      this.equipmentType = rawData.equipmentType
      this.segments = rawData.segments
      this.segment_usage = rawData.segment_usage
      this.field_no = rawData.field_no
      this.item_no = rawData.item_no
      this.field_required = rawData.field_required
      this.element_name = rawData.element_name
      this.transmitted_data = rawData.transmitted_data
      this.field_array = rawData.field_array
      this.field_length = rawData.field_length
      this.field_type = rawData.field_type
      this.repeat_delimiter = rawData.repeat_delimiter
      this.mandatory = rawData.mandatory
      this.lims_descriptions = rawData.lims_descriptions
      this.lims_tables = rawData.lims_tables
      this.lims_fields = rawData.lims_fields
      this.required_for_lims = rawData.required_for_lims
      this.notes = rawData.notes
      this.attachments = rawData.attachments
      this.environment = rawData.environment
      this.dateOfEntry = rawData.dateOfEntry
      this.lastUpdated = rawData.lastUpdated
      this.__v = rawData.__v
    }
  }