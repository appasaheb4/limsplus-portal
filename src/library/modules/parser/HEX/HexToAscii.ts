export default class HexToAscii {
  _message: string
  _config: any
  constructor(message: string, config: any) {
    this._message = message
    this._config = config
  }

  decode = () => {
    let values: string = ""
    const fields = this._message.split(/[\n, ]+/)
    for (const field of fields) {
      const conversationMapping = this._config.filter(
        (item) => item.hexadecimal == field
      )
      console.log({ conversationMapping })

      values =
        Array.isArray(conversationMapping) && conversationMapping.length > 0
          ? values + conversationMapping[0].ascii
          : values
    }
    return values
  }
}
