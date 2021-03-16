/**
 * @fileoverview Use this file invoke Memetoons API
 * implementation related to Memetoons standards
 * @package Feed Service
 * @author limsplus
 */
import * as Models from "../models"
import BaseService from "@lp/library/modules/base-service"

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
    new Promise<any>((resolve, reject) => {
      if (segments) {
        delete segments._id

        const form = new FormData()
        form.append("submitter_submitter", segments.submitter_submitter)
        form.append("data_type", segments.data_type)
        form.append("equipmentType", segments.equipmentType)
        form.append("segments", segments.segments)
        form.append("segment_usage", segments.segment_usage)
        form.append("field_no", segments.field_no)
        form.append("item_no", segments.item_no)
        form.append("field_required", segments.field_required)
        form.append("element_name", segments.element_name)
        form.append("transmitted_data", segments.transmitted_data)
        form.append("field_array", segments.field_array)
        form.append("field_length", segments.field_length)
        form.append("field_type", segments.field_type)
        form.append("repeat_delimiter", segments.repeat_delimiter)
        form.append("mandatory", segments.mandatory)
        form.append("lims_descriptions", segments.lims_descriptions)
        form.append("lims_tables", segments.lims_tables)
        form.append("lims_fields", segments.lims_fields)
        form.append("required_for_lims", segments.required_for_lims)
        form.append("notes", segments.notes)
  

        form.append("file", segments.image)
        form.append("folder", "segmentMappings")
        form.append("name", segments.image.name)
        form.append(
          "attachments",
          `https://limsplus.blob.core.windows.net/segmentMappings/${segments.image.name}`
        )
        this.client
          .post(`/communication/addSegmentMapping`, segments)
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
}

export default CommunicationService
