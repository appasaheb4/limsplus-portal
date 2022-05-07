export class HostCommunication {
  id?: string;
  manualAutomaticMode?: boolean;
  instrumentType?: string;
  instrumentName?: string;
  modeOfCommunication?: string;
  typeOfQuery?: string;
  applyFiltrOn?: string;
  modeOfConnection?: string;
  serialPortCommunication?: {
    comPort?: string;
    baudRate?: string;
    dataBits?: string;
    stopBits?: string;
    parity?: string;
    flowControl?: string;
    protocol?: string;
  };
  tcpipCommunication?: {
    hostIpAddress?: string;
    portNumber?: string;
    timeout?: string;
    responseTime?: string;
  };
  hex?: string;
  sourceFileDataReceivefromInstrument?: string;
  logFileDataReceivefromInstrument?: string;
  SourceRepositoryDataReceivefromInstrument?: string;
  txtDataReceivefromInstrument?: string;
  txtSendDatafromInstrument?: string;
  convertTo?: string;
  outputRepository?: string;
  txtConvertedfile?: string;
  outPutIn?: string;
  txtOutputin?: string;

  outputforThirdpartySoftware?: string;
  logFileThiredPartySoftare?: string;
  SourceRepositoryThiredPartySoftare?: string;
  constructor(rawData: {[key in string]: any}) {
    this.id = rawData.id;
    this.manualAutomaticMode = rawData.manualAutomaticMode;
    this.instrumentType = rawData.instrumentType;
    this.instrumentName = rawData.instrumentName;
    this.modeOfCommunication = rawData.modeOfCommunication;
    this.typeOfQuery = rawData.typeOfQuery;
    this.applyFiltrOn = rawData.applyFiltrOn;
    this.modeOfConnection = rawData.modeOfConnection;
    this.serialPortCommunication = rawData.serialPortCommunication;
    this.tcpipCommunication = rawData.tcpipCommunication;
    this.hex = rawData.hex;
    this.sourceFileDataReceivefromInstrument =
      rawData.sourceFileDataReceivefromInstrument;
    this.logFileDataReceivefromInstrument =
      rawData.logFileDataReceivefromInstrument;
    this.SourceRepositoryDataReceivefromInstrument =
      rawData.SourceRepositoryDataReceivefromInstrument;
    this.txtDataReceivefromInstrument = rawData.txtDataReceivefromInstrument;
    this.txtSendDatafromInstrument = rawData.txtSendDatafromInstrument;
    this.convertTo = rawData.convertTo;
    this.outputRepository = rawData.outputRepository;
    this.txtConvertedfile = rawData.txtConvertedfile;
    this.outPutIn = rawData.outPutIn;
    this.txtOutputin = rawData.txtOutputin;
    this.outputforThirdpartySoftware = rawData.outputforThirdpartySoftware;
    this.logFileThiredPartySoftare = rawData.logFileThiredPartySoftare;
    this.SourceRepositoryThiredPartySoftare =
      rawData.SourceRepositoryThiredPartySoftare;
  }
}
