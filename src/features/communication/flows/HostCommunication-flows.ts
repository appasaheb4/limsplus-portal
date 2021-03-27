import { Stores } from "../stores"
import * as Models from "../models"
import { decode } from "@lp/library/modules/parser"

class HostCommunicationFlows {
  mapping = async (instrumentType: string) => {
    const data = Stores.segmentMappingStore.listSegmentMapping
    const mapping: any[] = []
    const values: Models.MappingValues[] = []
    data?.forEach((item: Models.SegmentMapping) => {
      if (
        item.equipmentType === instrumentType &&
        (item.dataFlowFrom === "Host &gt; LIS" || item.dataFlowFrom === "Host > LIS")
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
    // console.log(mapping)
    return mapping
  }

  convetTo = (type: string, instrumentType: string, message: string) =>
    new Promise(async (resolve, reject) => {
      try {
        //console.log({ type, instrumentType, message })
        const mappingList = await this.mapping(instrumentType)
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
          const hl7 = decode(message, mapping)
          if (!hl7) return alert("Please enter correct message")
          Stores.communicationStore.updateConvertTo({
            ...Stores.communicationStore.convertTo,
            hl7,
          })
        }
      } catch (error) {
        reject(error)
      }
    })

  newMessage = (message?: any) => {
    Stores.communicationStore.updateHostCommuication({
      ...Stores.communicationStore.hostCommuication,
      txtDataReceivefromInstrument: message,
      convertTo: "",
    })
    Stores.communicationStore.updateConvertTo({
      ...Stores.communicationStore.convertTo,
      hl7: undefined,
    })
  }
}

export default new HostCommunicationFlows()
