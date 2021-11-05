/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
//import * as Models from "../models"
import { Http, http, ServiceResponse } from "@lp/library/modules/http"
import { stores } from "@lp/stores"
  
class SampleContainerService {     
  listSampleContainer = (page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      const env = stores.loginStore.login && stores.loginStore.login.environment
      const role = stores.loginStore.login && stores.loginStore.login.role
      http
        .get(
          `master/sampleContainer/listSampleContainer/${page}/${limit}/${env}/${role}`
        )
        .then((response: any) => {
          const serviceResponse = Http.handleResponse<any>(response)
          resolve(serviceResponse)
        })
        .catch((error) => {
          reject(new ServiceResponse<any>(0, error.message, undefined))
        })
    })
  addSampleContainer = (sampleContainer: any) =>
    new Promise<any>((resolve, reject) => {
      const form = new FormData()
      form.append("containerCode", sampleContainer.containerCode)
      form.append("containerName", sampleContainer.containerName)
      form.append("description", sampleContainer.description)
      form.append("environment", sampleContainer.environment)
      form.append("file", sampleContainer.image)
      form.append("folder", "sampleconatiner")
      form.append("fileName", sampleContainer.image.name)
      form.append(
        "image",
        `https://limsplus.blob.core.windows.net/sampleconatiner/${sampleContainer.image.name}`
      )
      http
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
      http
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
      http
        .post(`/master/sampleContainer/updateSingleFiled`, newValue)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })

  checkExitsEnvCode = (code: string, env: string) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`/master/sampleContainer/checkExitsEnvCode`, { code, env })
        .then((response: any) => {
          const serviceResponse = Http.handleResponse<any>(response)
          resolve(serviceResponse)
        })
        .catch((error) => {
          reject(new ServiceResponse<any>(0, error.message, undefined))
        })
    })
}

export default SampleContainerService
