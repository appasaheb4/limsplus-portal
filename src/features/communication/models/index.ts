/* eslint-disable */
export * from "./constants"
export interface IHostCommunication {
  id?: string
  manualAutomaticMode?: boolean
  instrumentType?: string
  instrumentName?: string
  modeOfCommunication?: string
  typeOfQuery?: string
  applyFiltrOn?: string
  modeOfConnection?: string
  serialPortCommunication?: {
    comPort?: string
    baudRate?: string
    dataBits?: string
    stopBits?: string
    parity?: string
    flowControl?: string
    protocol?: string
  }
  tcpipCommunication?: {
    hostIpAddress?: string
    portNumber?: string
    timeout?: string
    responseTime?: string
  }
  hex?: string
  sourceFileDataReceivefromInstrument?: string
  logFileDataReceivefromInstrument?: string
  SourceRepositoryDataReceivefromInstrument?: string
  txtDataReceivefromInstrument?: string
  txtSendDatafromInstrument?: string
  convertTo?: string
  outputRepository?: string
  txtConvertedfile?: string
  outPutIn?: string
  txtOutputin?: string

  outputforThirdpartySoftware?: string
  logFileThiredPartySoftare?: string
  SourceRepositoryThiredPartySoftare?: string
}

export interface ConvertTo {
  hl7?: any
  hexDecimal?: any
  astom?: any
}

// segment

export interface SegmentMapping {
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
  dateOfEntry?: string
  lastUpdated?: string
  __v?: string
}

export interface UpdateItem {
  value: string | boolean | undefined | any[]
  dataField: string
  id: string
}

export interface MappingValues {
  segments?: string
  field?: string
  component?: [number?, number?]
  field_no?: number
  mandatory?: boolean
  default?: string
}

export interface Mapping {
  [key: string]: {
    values: MappingValues[]
  }
}

export interface ConversationMapping {
  _id?: string
  hexadecimal?: string
  binary?: string
  ascii?: string
}

export interface EncodeCharacter {
  _id?: string
  interfaceType?: string
  instrumentType?: string
  instrumentName?: string
  dataFlowFrom?: string
  communicationProtocol?: string
  blockStart?: string
  blockEnd?: string
  filed?: string
  value?: string
  fileds?: { filed?: string | undefined; value?: string | undefined }[]
}

// renames
// encode character to interface manager
// segment mapping to data segment mapping
