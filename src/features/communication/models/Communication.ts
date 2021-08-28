export class HostCommunication {
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
  constructor(rawData: { [key in string]: any }) {
    this.id = rawData.id
    this.manualAutomaticMode = rawData.manualAutomaticMode
    this.instrumentType = rawData.instrumentType
    this.instrumentName = rawData.instrumentName
    this.modeOfCommunication = rawData.modeOfCommunication
    this.typeOfQuery = rawData.typeOfQuery
    this.applyFiltrOn = rawData.applyFiltrOn
    this.modeOfConnection = rawData.modeOfConnection
    this.serialPortCommunication = rawData.serialPortCommunication
    this.tcpipCommunication = rawData.tcpipCommunication
    this.hex = rawData.hex
    this.sourceFileDataReceivefromInstrument =
      rawData.sourceFileDataReceivefromInstrument
    this.logFileDataReceivefromInstrument = rawData.logFileDataReceivefromInstrument
    this.SourceRepositoryDataReceivefromInstrument =
      rawData.SourceRepositoryDataReceivefromInstrument
    this.txtDataReceivefromInstrument = rawData.txtDataReceivefromInstrument
    this.txtSendDatafromInstrument = rawData.txtSendDatafromInstrument
    this.convertTo = rawData.convertTo
    this.outputRepository = rawData.outputRepository
    this.txtConvertedfile = rawData.txtConvertedfile
    this.outPutIn = rawData.outPutIn
    this.txtOutputin = rawData.txtOutputin
    this.outputforThirdpartySoftware = rawData.outputforThirdpartySoftware
    this.logFileThiredPartySoftare = rawData.logFileThiredPartySoftare
    this.SourceRepositoryThiredPartySoftare =
      rawData.SourceRepositoryThiredPartySoftare
  }
}

export class ConvertTo {
  hl7?: any
  hexDecimal?: any
  astom?: any
  constructor(rawData: { [key in string]: any }) {
    this.hl7 = rawData.hl7
    this.hexDecimal = rawData.hexDecimal
    this.astom = rawData.astom
  }
}

// segment

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
export class ConversationMapping {
  _id?: string
  hexadecimal?: string
  binary?: string
  ascii?: string
  environment?: string
  constructor(rawData: { [key in string]: any }) {
    this._id = rawData._id
    this.hexadecimal = rawData.hexadecimal
    this.binary = rawData.binary
    this.ascii = rawData.ascii
    this.environment = rawData.environment
  }
}

export class EncodeCharacter {
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
  environment: string

  constructor(rawData: { [key in string]: any }) {
    this._id = rawData._id
    this.interfaceType = rawData.interfaceType
    this.instrumentType = rawData.instrumentType
    this.instrumentName = rawData.instrumentName
    this.dataFlowFrom = rawData.dataFlowFrom
    this.communicationProtocol = rawData.communicationProtocol
    this.blockStart = rawData.blockStart
    this.blockEnd = rawData.blockEnd
    this.filed = rawData.filed
    this.value = rawData.value
    this.fileds = rawData.fileds
    this.environment = rawData.environment
  }
}
