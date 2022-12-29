import Hl7 from './hl7.parser';

export default class Decoder {
  _message: any;
  _interfaceManager: any;
  _config: any;
  _decoder: any;

  constructor(message, interfaceManager, config) {
    this._message = message;
    this._interfaceManager = interfaceManager;
    this._config = config;
    this._decoder = this._setDynamicDecoder();
  }

  decode() {
    if (!this._message) return null;
    return this._decoder.process();
  }

  _setDynamicDecoder() {
    const obj = new Hl7(this._message, this._interfaceManager, this._config);
    return obj;
  }
}
