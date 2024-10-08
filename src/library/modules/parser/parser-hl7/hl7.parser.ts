import {Parser} from '../lib';
//var parser = require("./lib/index")

export default class Hl7 {
  _message: any;
  _config: any;

  constructor(message, interfaceManager, config) {
    const parse = new Parser(interfaceManager);
    message = parse.parseString(message);
    this._message = message;
    this._config = config;
  }

  getSegmentsByType(type) {
    return this._message.segments.filter(item => {
      return item.name === type;
    });
  }

  /**
   * @description Convert from config mapping file hl7 to object
   * @return {{}}
   */
  process() {
    const obj: any[] = [];
    for (const message of this._message) {
      const values: any = [];
      if (this._config.mapping[message.fields.toLowerCase()]) {
        for (const value of this._config.mapping[message.fields.toLowerCase()]
          .values) {
          if (value !== undefined && value.field && message instanceof Object) {
            const index1 = value.component[0];
            const object = this._generateObject(
              value.field,
              message.values[index1 - 1],
              value.field_no,
            );
            if (value.mandatory) {
              values.push(object);
            }
          }
        }
        values.sort((a, b) => {
          return a.field_no - b.field_no;
        });
        obj.push([[message.fields], values]);
      }
    }
    return obj;
  }

  /**
   * @description Add attribute(s) into existing object
   * @param obj
   * @param property
   * @param value
   * @private
   */
  _generateObject(property, value, field_no) {
    const paths = property.split('.');
    return {filed: paths[1], value: value, field_no};
  }
}
