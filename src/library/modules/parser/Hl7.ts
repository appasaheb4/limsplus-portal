import { Parser } from "./lib"
//var parser = require("./lib/index")

export default class Hl7 {
  _message: any
  _config: any
  constructor(message, interfaceManager, config) {
    const parse = new Parser(interfaceManager)
    message = parse.parseString(message)
    this._message = message
    this._config = config
  }

  getSegmentsByType(type) {
    //console.log({message:this._message});
    return this._message.segments.filter((item) => {
      // console.log({ item })
      return item.name === type
    })
  }

  /**
   * @description Convert from config mapping file hl7 to object
   * @return {{}}
   */
  process() {
    const obj: any[] = []
    //const map = new Map()
    for (const message of this._message) {
      console.log({ message })
      // ///console.log({ tmpObj })
      const values: any = []
      if (this._config.mapping[message.fields.toLowerCase()]) {
        for (const value of this._config.mapping[message.fields.toLowerCase()]
          .values) {
          if (value !== undefined) {
            if (value.field && message instanceof Object) {
              const index1 = value.component[0]
              const object = this._generateObject(
                value.field,
                message.values[index1 - 1],
                value.field_no
              )
              // if (message.values[index1 - 1] !== "") {
              //   values.push(object)
              // } else {
              if (value.mandatory) {
                values.push(object)
              }
              // }
            }
          }  
        }
        values.sort((a, b) => {
          return a.field_no - b.field_no
        })
        //console.log({ values })
        obj.push([[message.fields], values])
      }
    }
    console.log({ obj })
    return obj
  }

  /**
   * @description Add attribute(s) into existing object
   * @param obj
   * @param property
   * @param value
   * @private
   */
  _generateObject(property, value, field_no) {
    const paths = property.split(".")
    return { filed: paths[1], value: value, field_no }
  }
}
