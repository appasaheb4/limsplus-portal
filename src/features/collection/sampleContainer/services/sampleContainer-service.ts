/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 * @package Feed Service
 * @author limsplus
 */
//import * as Models from "../models"
import BaseService from "@lp/library/modules/base-service"
import * as Models from "../models"

class SampleContainerService extends BaseService {
  listSampleContainer = () =>
    new Promise<Models.SampleContainer[]>((resolve, reject) => {
      this.client
        .get(`master/sampleContainer/listSampleContainer`)
        .then((res) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  addSampleContainer = (sampleContainer: any) =>
    new Promise<any>((resolve, reject) => {
      const form = new FormData()
      form.append("containerCode", sampleContainer.containerCode)
      form.append("containerName", sampleContainer.containerName)
      form.append("description", sampleContainer.description)
      form.append("file", sampleContainer.image)
      form.append("folder", "sampleconatiner")
      form.append("fileName", sampleContainer.image.name)
      form.append(
        "image",
        `https://limsplus.blob.core.windows.net/sampleconatiner/${sampleContainer.image.name}`
      )
      this.client
        .post(`master/sampleContainer/addSampleContainer`, form, {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            "content-type": "application/json; charset=utf-8",
          },
        })
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })

  deleteSampleContainer = (id: string) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .delete(`/master/sampleContainer/deleteSampleContainer/${id}`)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })

  updateSingleFiled = (newValue: any) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .post(`/master/sampleContainer/updateSingleFiled`, newValue)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
}

export default SampleContainerService
