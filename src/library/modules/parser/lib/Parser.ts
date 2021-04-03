export default class Parser {
  SEGMENT = "\n"
  FIELD = "|"
  COMPONENT = "^"
  FIELDREPEAT = "~"
  ESCAPE = "\\"
  SUBCOMPONENT = "&"
      
  //Message[segment][field][repetition][component][sub-component]
  parseComponent = (data: any) => {
    let result: any = []
    const subcomponents = data.split(this.SUBCOMPONENT)

    let s: any
    if (subcomponents.length === 1) {
      s = subcomponents[0]
      result = s
    } else {
      for (var i = 0; i < subcomponents.length; i++) {
        s = subcomponents[i]
        result.push(s)
      }
    }

    return result
  }

  parseRepeat = (data: any) => {
    const result: any = []
    const components = data.split(this.COMPONENT)
    let c: any

    for (var i = 0; i < components.length; i++) {
      c = this.parseComponent(components[i])
      result.push(c)
    }

    return result
  }

  parseField = (data) => {
    const result: any = []
    const repeats = data.split(this.FIELDREPEAT)

    for (let i = 0; i < repeats.length; i++) {
      const r = this.parseRepeat(repeats[i])
      result.push(r)
    }

    return result
  }

  parseSegment = (data) => {
    let fields = data.split(this.FIELD)
    //console.log({ fields })
    //var seg_name = fields[0];
    // result = []
    // let start = 0

    //adjusting header segment, inserting | as first field
    if (fields[0] === "MSH") {
      fields[0] = this.FIELD
      fields = ["MSH"].concat(fields)
    }
    //   console.log({ concat: fields })

    //   //ignore MSH1 and MSH2
    //   start = 3

    //   result.push("MSH") //segment name
    //   result.push(this.FIELD) //pipe
    //   result.push(fields[2]) //separators
    // }

    // console.log({ result })

    //else {
    //   result.push(fields[0]) //segment name

    //   start = 1
    // }

    // for (var i = start; i < fields.length; i++) {
    //   //skip empty fields
    //   //if (fields[i] === "") continue;

    //   var f = this.parseField(fields[i])
    //   result.push(f)
    // }
    const firstElement = fields.shift()
    const item = {
      fields: firstElement,
      values: fields,
    }
    return item
  }

  parse = (data: any) => {
    //MSH check
    //console.log({ data })

    if (data.substr(0, 3) !== "MSH") {
      //TODO: throw a proper error here
      return null
    }

    //define field separator from MSH header
    // this.FIELD = data[3]
    // //define all other separators from MSH header
    // this.COMPONENT = data[4]
    // this.FIELDREPEAT = data[5]
    // this.ESCAPE = data[6]
    // this.SUBCOMPONENT = data[7]

    //parse into result object
    const result: any = []

    const segments = data.split(this.SEGMENT)
    //console.log({ segments })

    for (let i = 0; i < segments.length; i++) {
      if (segments[i] === "") {
        continue
      }
      const segmentItem = segments[i].replace(/  +/g, "")
      const seg = this.parseSegment(segmentItem)
      result.push(seg)
    }
    return result
  }

  parseString = (data) => {
    if (!data || typeof data !== "string") {
      return null
    }
    // if (arguments.length === 1) {
    //     options = {};
    // }
    data = this.parse(data)
    return data
  }
}
