/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
 import { Http, http, ServiceResponse } from "@lp/library/modules/http"
 import { stores } from "@lp/library/stores"
export class ReferenceRangesService {
    addReferenceRanges = () =>
    new Promise<any>((resolve, reject) => {
      http
        .post(``)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
    listReferenceRanges = (page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      const env = stores.loginStore.login && stores.loginStore.login.environment
      const role = stores.loginStore.login && stores.loginStore.login.role
      http
        .get(`//${page}/${limit}/${env}/${role}`)
        .then((response: any) => {
          const serviceResponse = Http.handleResponse<any>(response)
          resolve(serviceResponse)
        })
        .catch((error) => {
          reject(new ServiceResponse<any>(0, error.message, undefined))
        })
    })
    deleteReferenceRanges = (id: string) =>
    new Promise<any>((resolve, reject) => {
      http
        .delete(`/${id}`)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
    versionUpgradeReferenceRanges = () =>
    new Promise<any>((resolve, reject) => {
      http
        .post(``)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
    updateSingleFiled = (newValue: any) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(``, newValue)
        .then((response) => {
          const serviceResponse = Http.handleResponse<any>(response)
          resolve(serviceResponse)
        })
        .catch((error) => {
          reject(new ServiceResponse<any>(0, error.message, undefined))
        })
    })
    checkExitsLabEnvCode = (code: string, env: string, lab: string) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(``)
        .then((response: any) => {
          const serviceResponse = Http.handleResponse<any>(response)
          resolve(serviceResponse)
        })
        .catch((error) => {
          reject(new ServiceResponse<any>(0, error.message, undefined))
        })
    })
}