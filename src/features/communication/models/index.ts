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
}
