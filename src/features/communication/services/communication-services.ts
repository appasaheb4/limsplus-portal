/**
 * @fileoverview Use this file invoke Memetoons API
 * implementation related to Memetoons standards
 * @package Feed Service
 * @author limsplus
 */
//import * as Models from "../models"

import BaseService from "@lp/library/modules/base-service"
import * as Assets from "@lp/features/assets"
import * as Models from "../models"

class CommunicationService extends BaseService {
  deleteSegmentMapping = (id: string[]) =>
    new Promise<any>((resolve, reject) => {
      this.client
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
            await Assets.Stores.Stores.assetsStore.assetsService.uploadFile(
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
        form.append("attachments", JSON.stringify(path))
        this.client
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
      this.client
        .post(`/communication/importSegmentMapping`, segments)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  listSegmentMapping = () =>
    new Promise<any>((resolve, reject) => {
      this.client
        .get(`/communication/listSegmentMapping`)
        .then((res) => {
          const data = res.data.data
          const group = data.reduce((r: any, a: any) => {
            r[a.segments] = [...(r[a.segments] || []), a]
            return r
          }, {})
          const entries = Object.entries(group)
          console.log({ group, entries })
          const values: any = []
          for (const groupSegment of entries) {
            const segmentList: any = groupSegment[1]
            segmentList.sort((a, b) => {
              return a.field_no - b.field_no
            })
            console.log({ groupSegment, segmentList })
            segmentList.forEach((item) => {
              values.push(item)
            })
          }
          resolve(values)
        })
        .catch((error) => {
          reject({ error })
        })
    })

  updateSingleFiled = (newValue: any) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .post(`/communication/updateSingleFiled`, newValue)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })

  mappingList = () =>
    new Promise<any>((resolve, reject) => {
      this.client
        .get(`/communication/listSegmentMapping`)
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
          console.log(mapping)
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
      this.client
        .post(`/communication/addInterfaceManager`, encode)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })

  listInterfaceManager = () =>
    new Promise<any>((resolve, reject) => {
      this.client
        .get(`/communication/listInterfaceManager`)
        .then((res) => {
          console.log({ res })

          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })

  deleteInterfaceManager = (id: string) =>
    new Promise((resolve, reject) => {
      this.client
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
      console.log({ newValue })

      this.client
        .post(`/communication/interfaceManager/updateSingleFiled`, newValue)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
}

export default CommunicationService
