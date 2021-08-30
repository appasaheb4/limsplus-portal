/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
import { Http, http, ServiceResponse } from "@lp/library/modules/http"
import * as Assets from "@lp/features/assets"
import * as Models from "../models"
import { stores } from "@lp/library/stores"

class CommunicationService {
  adddepartment = (department?: Models.HostCommunication) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`/communication/addDepartment`, department)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  listDepartment = () =>
    new Promise<Models.HostCommunication[]>((resolve, reject) => {
      http
        .get(`/communication/listDepartment`)
        .then((res: any) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  deletedepartment = (id: string) =>
    new Promise<Models.HostCommunication[]>((resolve, reject) => {
      http
        .delete(`/communication/deleteDepartment/${id}`)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  deleteSegmentMapping = (id: string[]) =>
    new Promise<any>((resolve, reject) => {
      http
        .delete(`/communication/deleteSegmentMapping/${id}`)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  addSegmentMapping = (segments: any) =>
    new Promise<any>(async (resolve, reject) => {
      if (segments) {
        const files = segments.attachments
        const path: string[] = []
        if (files) {
          for (let i = 0; i < files.length; i++) {
            await Assets.Stores.Stores.assetsStore.AssetsService.uploadFile(
              files[i],
              "communication",
              files[i].name
            )
            path.push(
              `https://limsplus.blob.core.windows.net/communication/${files[i].name}`
            )
          }
        }
        console.log({ path })
        console.log({ segments })

        delete segments._id
        const form = new FormData()
        form.append("dataFlowFrom", segments.dataFlowFrom)
        form.append("data_type", segments.data_type)
        form.append("equipmentType", segments.equipmentType)
        form.append("segments", segments.segments)
        form.append("segment_usage", segments.segment_usage)
        form.append("field_no", segments.field_no)
        form.append("item_no", segments.item_no)
        form.append("field_required", segments.field_required || false)
        form.append("element_name", segments.element_name)
        form.append("transmitted_data", segments.transmitted_data)
        form.append("field_array", segments.field_array)
        form.append("field_length", segments.field_length)
        form.append("field_type", segments.field_type)
        form.append("repeat_delimiter", segments.repeat_delimiter || false)
        form.append("mandatory", segments.mandatory || false)
        form.append("lims_descriptions", segments.lims_descriptions)
        form.append("lims_tables", segments.lims_tables)
        form.append("lims_fields", segments.lims_fields)
        form.append("required_for_lims", segments.required_for_lims || false)
        form.append("notes", segments.notes)   
        form.append("environment", segments.environment)
        form.append("attachments", JSON.stringify(path))
        http
          .post(`/communication/addSegmentMapping`, form, {
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            reject({ error })
          })
      }
    })
  importSegmentMapping = (segments: any) =>
    new Promise<any>((resolve, reject) => {
      console.log({ segments })
      http
        .post(`/communication/importSegmentMapping`, segments)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  listSegmentMapping = (page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      const env = stores.loginStore.login && stores.loginStore.login.environment
      const role = stores.loginStore.login && stores.loginStore.login.role
      http
        .get(`/communication/listSegmentMapping/${page}/${limit}/${env}/${role}`)
        .then((res) => {
          const data = res.data.data.data.segmentMappingList
          const group = data.reduce((r: any, a: any) => {
            r[a.segments] = [...(r[a.segments] || []), a]
            return r
          }, {})
          const entries = Object.entries(group)
          //console.log({ group, entries })
          const values: any = []
          for (const groupSegment of entries) {
            const segmentList: any = groupSegment[1]
            segmentList.sort((a, b) => {
              return a.field_no - b.field_no
            })
            segmentList.forEach((item) => {
              values.push(item)
            })
          }
          resolve({
            data: {
              segmentMappingList: values,
              count: res.data.data.data.count,
            },
            success: 1,
          })
        })
        .catch((error) => {
          reject({ error })
        })
    })

  updateSingleFiled = (newValue: any) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`/communication/updateSingleFiled`, newValue)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })

  mappingList = (page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      const env = stores.loginStore.login && stores.loginStore.login.environment
      const role = stores.loginStore.login && stores.loginStore.login.role
      http
        .get(`/communication/listSegmentMapping/${page}/${limit}/${env}/${role}`)
        .then((res) => {
          const data = res.data.data
          const mapping: any[] = []
          const values: Models.MappingValues[] = []
          data.forEach((item: Models.SegmentMapping) => {
            if (
              item.equipmentType === "ERP" &&
              (item.dataFlowFrom === "Host &gt; LIS" ||
                item.dataFlowFrom === "Host > LIS")
            ) {
              values.push({
                segments: item.segments,
                field: `${item.segments?.toLowerCase()}.${item.element_name
                  ?.toLowerCase()
                  .replaceAll(" ", "_")}`,
                component: [Number(item.field_no), 1],
                field_no: Number(item.field_no),
                default: "",
              })
            }
          })
          const group = values.reduce((r: any, a: any) => {
            r[a.segments] = [...(r[a.segments] || []), a]
            return r
          }, {})
          //console.log({ group })
          const entries = Object.entries(group)
          entries.forEach((item: any) => {
            mapping.push({
              [item[0].toLowerCase() || ""]: { values: item[1] },
            })
          })
          resolve(mapping)
        })
        .catch((error) => {
          reject({ error })
        })
    })

  addInterfaceManager = (encode: any) =>
    new Promise<any>((resolve, reject) => {
      encode.blockStart =
        encode.blockStart !== undefined
          ? encode.blockStart
              .replaceAll("&", "&amp;")
              .replaceAll(">", "&gt;")
              .replaceAll("<", "&lt;")
              .replaceAll('"', "&quot;")
              .replaceAll("’", "â")
              .replaceAll("…", "â¦")
          : undefined

      encode.blockEnd =
        encode.blockEnd !== undefined
          ? encode.blockEnd
              .replaceAll("&", "&amp;")
              .replaceAll(">", "&gt;")
              .replaceAll("<", "&lt;")
              .replaceAll('"', "&quot;")
              .replaceAll("’", "â")
              .replaceAll("…", "â¦")
          : undefined

      encode.fileds = encode.fileds.map((item: any) => {
        item.filed =
          item.filed !== undefined
            ? item.filed
                .replaceAll("&", "&amp;")
                .replaceAll(">", "&gt;")
                .replaceAll("<", "&lt;")
                .replaceAll('"', "&quot;")
                .replaceAll("’", "â")
                .replaceAll("…", "â¦")
            : undefined

        item.value =
          item.value !== undefined
            ? item.value
                .replaceAll("&", "&amp;")
                .replaceAll(">", "&gt;")
                .replaceAll("<", "&lt;")
                .replaceAll('"', "&quot;")
                .replaceAll("’", "â")
                .replaceAll("…", "â¦")
            : undefined

        return item
      })
      http
        .post(`/communication/addInterfaceManager`, encode)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })

  listInterfaceManager = (page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      const env = stores.loginStore.login && stores.loginStore.login.environment
      const role = stores.loginStore.login && stores.loginStore.login.role
      http
        .get(`/communication/listInterfaceManager/${page}/${limit}/${env}/${role}`)
        .then((response: any) => {
          const serviceResponse = Http.handleResponse<any>(response)
          resolve(serviceResponse)
        })
        .catch((error) => {
          reject(new ServiceResponse<any>(0, error.message, undefined))
        })
    })

  deleteInterfaceManager = (id: string) =>
    new Promise((resolve, reject) => {
      http
        .delete(`communication/deleteInterfaceManager/${id}`)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })

  interfaceManagerUpdateSingleFiled = (newValue: any) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`/communication/interfaceManager/updateSingleFiled`, newValue)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })

  // Conversation Mapping
  addConversationMapping = (conversation: any) =>
    new Promise<any>((resolve, reject) => {
      conversation.hexadecimal =
        conversation.hexadecimal !== undefined
          ? conversation.hexadecimal
              .replaceAll("&", "&amp;")
              .replaceAll(">", "&gt;")
              .replaceAll("<", "&lt;")
              .replaceAll('"', "&quot;")
              .replaceAll("’", "â")
              .replaceAll("…", "â¦")
          : undefined
      conversation.binary =
        conversation.binary !== undefined
          ? conversation.binary
              .replaceAll("&", "&amp;")
              .replaceAll(">", "&gt;")
              .replaceAll("<", "&lt;")
              .replaceAll('"', "&quot;")
              .replaceAll("’", "â")
              .replaceAll("…", "â¦")
          : undefined
      conversation.ascii =
        conversation.ascii !== undefined
          ? conversation.ascii
              .replaceAll("&", "&amp;")
              .replaceAll(">", "&gt;")
              .replaceAll("<", "&lt;")
              .replaceAll('"', "&quot;")
              .replaceAll("’", "â")
              .replaceAll("…", "â¦")
          : undefined
      http
        .post(
          `/communication/conversationMapping/addConversationMapping`,
          conversation
        )
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })

  listConversationMapping = (page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      const env = stores.loginStore.login && stores.loginStore.login.environment
      const role = stores.loginStore.login && stores.loginStore.login.role
      http
        .get(
          `/communication/conversationMapping/listConversationMapping/${page}/${limit}/${env}/${role}`
        )
        .then((response: any) => {
          const serviceResponse = Http.handleResponse<any>(response)
          resolve(serviceResponse)
        })
        .catch((error) => {
          reject(new ServiceResponse<any>(0, error.message, undefined))
        })
    })

  deleteConversationMapping = (id: string[]) =>
    new Promise<any>((resolve, reject) => {
      http
        .delete(`/communication/conversationMapping/deleteConversationMapping/${id}`)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })

  updateConversationMappingUpdateSingleFiled = (newValue: any) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`/communication/conversationMapping/updateSingleFiled`, newValue)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
}

export default CommunicationService
