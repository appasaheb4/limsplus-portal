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

export interface SegmentMapping {
  _id?: string
  submitter_submitter?: string
  data_type?: string
  equipmentType?: string
  segments?: string
  segment_usage?: string
  field_no?: string
  item_no?: string
  field_required?: string;
  element_name?: string
  transmitted_data?: string
  field_array?: string
  field_length?: string
  field_type?: string
  repeat_delimiter?: string
  mandatory?: string
  lims_descriptions?: string
  lims_tables?: string
  lims_fields?: string
  required_for_lims?: string
  notes?: string
  attachments?: string
}
