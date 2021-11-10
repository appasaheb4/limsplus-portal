

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





