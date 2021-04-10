import { Stores } from "../stores"
import * as Models from "../models"
import { decode } from "@lp/library/modules/parser/HL7"

class HostCommunicationFlows {
  mapping = async (interfaceManager: Models.EncodeCharacter) => {
    const data = Stores.segmentMappingStore.listSegmentMapping
    const mapping: any[] = []
    const values: Models.MappingValues[] = []
    const dataFlowFrom =
      interfaceManager.dataFlowFrom !== undefined
        ? interfaceManager.dataFlowFrom
            .replaceAll(/&amp;/g, "&")
            .replaceAll(/&gt;/g, ">")
            .replaceAll(/&lt;/g, "<")
            .replaceAll(/&quot;/g, '"')
            .replaceAll(/â/g, "’")
            .replaceAll(/â¦/g, "…")
        : undefined
    data?.forEach((item: Models.SegmentMapping) => {
      if (
        item.equipmentType === interfaceManager.instrumentType &&
        item.dataFlowFrom === dataFlowFrom
      ) {
        values.push({
          segments: item.segments,
          field: `${item.segments?.toLowerCase()}.${item.element_name
            ?.toLowerCase()
            .replaceAll(" ", "_")}`,
          component: [Number(item.field_no), 1],
          field_no: Number(item.field_no),
          mandatory: item.mandatory,
          default: "",
        })
      }
    })
    const group = values.reduce((r: any, a: any) => {
      r[a.segments] = [...(r[a.segments] || []), a]
      return r
    }, {})
    // console.log({ group })
    const entries = Object.entries(group)
    entries.forEach((item: any) => {
      mapping.push({
        [item[0].toLowerCase() || ""]: { values: item[1] },
      })
    })
    //console.log(mapping)
    return mapping
  }

  convetTo = (type: string, interfaceManager, message: string) =>
    new Promise(async (resolve, reject) => {
      try {
        //console.log({ type, instrumentType, message })
        const mappingList = await this.mapping(interfaceManager)
        console.log({ mappingList })

        // decode
        if (type === "HL7") {
          const tempData = {}
          mappingList.forEach((item) => {
            Object.keys(item).forEach((key) => {
              tempData[key] = item[key]
            })
          })
          const mapping = {
            mapping: tempData,
          }
          const hl7 = decode(
            message,
            Stores.hostCommunicationStore.selectedInterfaceManager,
            mapping
          )
          if (!hl7) return alert("Please enter correct message")
          Stores.hostCommunicationStore.updateConvertTo({
            ...Stores.hostCommunicationStore.convertTo,
            hl7,
          })
          Stores.hostCommunicationStore.updateHostCommuication({
            ...Stores.hostCommunicationStore.hostCommuication,
            txtDataReceivefromInstrument: "",
          })  
        }
      } catch (error) {
        reject(error)
      }
    })

  newMessage = (message?: any) => {
    Stores.hostCommunicationStore.updateHostCommuication({
      ...Stores.hostCommunicationStore.hostCommuication,
      txtDataReceivefromInstrument: message,
      convertTo: "",
    })
    Stores.hostCommunicationStore.updateConvertTo({
      ...Stores.hostCommunicationStore.convertTo,
      hl7: undefined,
    })
  }
}

export default new HostCommunicationFlows()
