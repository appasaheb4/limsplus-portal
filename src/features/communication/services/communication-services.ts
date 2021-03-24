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
        form.append("submitter_submitter", segments.submitter_submitter)
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
          resolve(res.data.data)
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
              (item.submitter_submitter === "Host &gt; LIS" ||
                item.submitter_submitter === "Host > LIS")
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
}

export default CommunicationService
