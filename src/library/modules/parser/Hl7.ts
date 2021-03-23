import { Parser } from "./lib"
//var parser = require("./lib/index")

export default class Hl7 {
  _message: any
  _config: any
  constructor(message, config) {
    const parse = new Parser()
    message = parse.parseString(message)
    console.log({ message })
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
    const obj = {}
    // for (const segment in this._config.mapping) {
    //   console.log({ segment })
    //const segmentType = segment.toUpperCase()
    // console.log({ segmentType })
    //console.log({ header: this._message.header })

    // const segmentsOfType =
    //   segmentType === "MSH" ? [this._message] : [this._message]
    // //this.getSegmentsByType(segment.toUpperCase())

    // console.log({ segmentsOfType })

    //console.log({ configM: this._config })

    for (const message of this._message) {
      //      console.log({ message })
      // ///console.log({ tmpObj })
      const values: any = []
      for (const value of this._config.mapping[message.fields.toLowerCase()]
        .values) {
        if (value !== undefined) {
          if (value.field && message instanceof Object) {
            const index1 = value.component[0]
            const object = this._generateObject(
              value.field,
              message.values[index1 - 1]
            )
            
            
            //if (message.values[index1 - 1] !== "") {
              values.push(object)
            //}
          }
        }
      }
      console.log({ values })
      obj[message.fields] = values
    }

    //     // console.log({ tmpObj })
    //     console.log({ index1, index2 })
    //     console.log({ field: s[index1] })
    //     if (s[index1].includes("~")) {
    //       // const split = s[index1].split("~")
    //       // console.log({ split })
    //       // const array: any = []
    //       // for (const v of split) {
    //       //   array.push(v.split("^"))
    //       // }
    //       // const output: any = []
    //       // for (const v in array) {
    //       //   array[v][value.component[1] - 1]
    //       //     ? output.push(array[v][value.component[1] - 1])
    //       //     : output.push("")
    //       // }
    //       console.log({ output: s[index1] })
    //       this._generateObject(tmpObj, value.field, s[index1])
    //     } else {
    //       // console.log({ tmpObj, vlaue: value.field })
    //       this._generateObject(tmpObj, value.field, s[index1][0])
    //     }
    //   }
    // }

    // if (segmentsOfType.length > 1) {
    //   obj[segment].push(tmpObj[segment])
    // } else {
    //   obj[segment] = tmpObj[segment]
    // }
    //}
    return obj
  }

  /**
   * @description Add attribute(s) into existing object
   * @param obj
   * @param property
   * @param value
   * @private
   */
  _generateObject(property, value) {
    const paths = property.split(".")
    return { filed: paths[1], value: value }
  }
}
