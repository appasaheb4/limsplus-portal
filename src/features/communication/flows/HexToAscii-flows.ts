import { Stores } from "../stores"
import * as Models from "../models"
import { decode } from "@lp/library/modules/parser/HEX"
import { toJS } from "mobx"

class HexToAsciiFlow {
  conversationMapping = async () => {
    const data = Stores.conversationMappingStore.listConversationMapping
    const values: Models.ConversationMapping[] = []
    data?.forEach((item: Models.ConversationMapping) => {
      values.push({
        hexadecimal: item.hexadecimal,
        ascii:
          item.ascii !== undefined
            ? item.ascii
                .replaceAll(/&amp;/g, "&")
                .replaceAll(/&gt;/g, ">")
                .replaceAll(/&lt;/g, "<")
                .replaceAll(/&quot;/g, '"')
                .replaceAll(/â/g, "’")
                .replaceAll(/â¦/g, "…")
                .toString()
            : undefined,
      })
    })
    return values
  }

  hextoascii = async (hex: string) => {
    const conversationMapping = await this.conversationMapping()
    if ((await conversationMapping).length > 0) {
      const ascii = decode(hex, toJS(conversationMapping))
      Stores.hostCommunicationStore.updateHostCommuication({
        ...Stores.hostCommunicationStore.hostCommuication,
        txtDataReceivefromInstrument:ascii
      })
    }  
  }
}
export default new HexToAsciiFlow()
