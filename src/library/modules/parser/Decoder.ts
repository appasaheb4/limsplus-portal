import Hl7 from "./Hl7"

export default class Decoder {
  _message: any
  _interfaceManager: any
  _config: any
  _decoder: any
  constructor(message, interfaceManager, config) {
    this._message = message
    this._interfaceManager = interfaceManager
    this._config = config
    this._decoder = this._setDynamicDecoder()
  }

  /**
   * @description Call process method from dynamic class
   * @return {*}
   */
  decode() {
    if (!this._message) return null
    if (this._message.substr(0, 3) !== "MSH") return null
    return this._decoder.process()
  }

  /**
   * @description Instantiate dynamically right class
   * @param format
   * @return {*}
   * @private
   */
  _setDynamicDecoder() {
    const obj = new Hl7(this._message, this._interfaceManager, this._config)
    return obj
  }
}
