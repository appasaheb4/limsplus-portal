import Hl7 from "./Hl7"

export default class Decoder {
  _message: any
  _config: any
  _decoder: any
  constructor(message, config) {
    this._message = message
    this._config = config
    this._decoder = this._setDynamicDecoder()
  }

  /**
   * @description Call process method from dynamic class
   * @return {*}
   */
  decode() {
    return this._decoder.process()
  }

  /**
   * @description Instantiate dynamically right class
   * @param format
   * @return {*}
   * @private
   */
  _setDynamicDecoder() {
    const obj = new Hl7(this._message, this._config)
    if (!obj) throw new Error(`Unknow format`)
    return obj
  }
}
