/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
import * as Models from "../models"
import { Http, http, ServiceResponse } from "@lp/library/modules/http"
import { stores } from "@lp/stores"

class SampleTypeService {
  listSampleType = (page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      const env = stores.loginStore.login && stores.loginStore.login.environment
      const role = stores.loginStore.login && stores.loginStore.login.role
      http
        .get(`master/sampleType/listSampleType/${page}/${limit}/${env}/${role}`)
        .then((response: any) => {
          const serviceResponse = Http.handleResponse<any>(response)
          resolve(serviceResponse)
        })
        .catch((error) => {
          reject(new ServiceResponse<any>(0, error.message, undefined))
        })
    })
  addSampleType = (sampleType?: Models.SampleType) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`master/sampleType/addSampleType`, sampleType)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  deleteSampleType = (id: string) =>
    new Promise<any>((resolve, reject) => {
      http
        .delete(`/master/sampleType/deleteSampleType/${id}`)
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
        .post(`/master/sampleType/updateSingleFiled`, newValue)
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
        .post(`/master/sampleType/checkExitsEnvCode`, { code, env })
        .then((response: any) => {
          const serviceResponse = Http.handleResponse<any>(response)
          resolve(serviceResponse)
        })
        .catch((error) => {
          reject(new ServiceResponse<any>(0, error.message, undefined))
        })
    })
}

export default SampleTypeService
