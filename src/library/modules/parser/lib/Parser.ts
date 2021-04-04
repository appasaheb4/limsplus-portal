interface Fildes {
  COMPONENT_DELIMITER: string
  ESCAPE_DELIMITER: string
  FIELD_DELIMITER: string
  NEW_LINE: string
  REPEAT_DELIMITER: string
  SUB_COMPONENT_DELIMITER: string
}

export default class Parser {
  _block: any
  _fileds: Fildes

  // SEGMENT = "\n"
  // FIELD = "|"
  // COMPONENT = "^"
  // FIELDREPEAT = "~"
  // ESCAPE = "\\"
  // SUBCOMPONENT = "&"

  constructor(interfaceManager) {
    console.log({ interfaceManager })

    this._block = interfaceManager
    // array to object
    const object = {}
    interfaceManager.fileds.map(
      (item) =>
        (object[item.filed] = item.value
          .replaceAll(/&amp;/g, "&")
          .replaceAll(/&gt;/g, ">")
          .replaceAll(/&lt;/g, "<")
          .replaceAll(/&quot;/g, '"')
          .replaceAll(/â/g, "’")
          .replaceAll(/â¦/g, "…")
          .toString())
    )
    console.log({ object })

    this._fileds = object as Fildes
  }

  // parseComponent = (data: any) => {
  //   let result: any = []
  //   const subcomponents = data.split(this.SUBCOMPONENT)
  //   let s: any
  //   if (subcomponents.length === 1) {
  //     s = subcomponents[0]
  //     result = s
  //   } else {
  //     for (var i = 0; i < subcomponents.length; i++) {
  //       s = subcomponents[i]
  //       result.push(s)
  //     }
  //   }
  //   return result
  // }

  // parseRepeat = (data: any) => {
  //   const result: any = []
  //   const components = data.split(this.COMPONENT)
  //   let c: any
  //   for (var i = 0; i < components.length; i++) {
  //     c = this.parseComponent(components[i])
  //     result.push(c)
  //   }
  //   return result
  // }

  // parseField = (data) => {
  //   const result: any = []
  //   const repeats = data.split(this.FIELDREPEAT)
  //   for (let i = 0; i < repeats.length; i++) {
  //     const r = this.parseRepeat(repeats[i])
  //     result.push(r)
  //   }
  //   return result
  // }

  parseSegment = (data) => {
    let fields = data.split(this._fileds.FIELD_DELIMITER)
    if (fields[0] === "MSH") {
      fields[0] = this._fileds.FIELD_DELIMITER
      fields = ["MSH"].concat(fields)
    }
    const firstElement = fields.shift()
    const item = {
      fields: firstElement,
      values: fields,
    }
    return item
  }

  parse = (data: any) => {
    if (data.substr(0, 3) !== "MSH") {
      return null
    }
    const result: any = []
    const NEW_LINE = new RegExp(this._fileds.NEW_LINE)
    console.log({ NEW_LINE })
    console.log({ va: "\n" })
    console.log({ va: "\\n" })
    const segments = data.split(NEW_LINE)
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
    data = this.parse(data)
    return data
  }
}
