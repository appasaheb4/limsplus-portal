/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
import * as Models from "../models"
import { Http, http, ServiceResponse } from "@lp/library/modules/http"

export class LookupService {
  listLookup = (page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      http
        .get(`/master/lookup/listLookup/${page}/${limit}`)
        .then((response: any) => {
          const serviceResponse = Http.handleResponse<any>(response)
          resolve(serviceResponse)
        })
        .catch((error) => {
          reject(new ServiceResponse<any>(0, error.message, undefined))
        })
    })

  addLookup = (lookup?: Models.Lookup) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`/master/lookup/addLookup`, lookup)
        .then((response) => {
          const serviceResponse = Http.handleResponse<any>(response)
          resolve(serviceResponse)
        })
        .catch((error) => {
          reject(new ServiceResponse<any>(0, error.message, undefined))
        })
    })

  deleteLookup = (id: string) =>
    new Promise<any>((resolve, reject) => {
      http
        .delete(`/master/lookup/deleteLookup/${id}`)
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
        .post(`/master/lookup/updateSingleFiled`, newValue)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  generalSettingsUpdate = (lookup?: Partial<Models.GlobalSettings>) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`/master/lookup/generalSettingsUpdate`, lookup)
        .then((response) => {
          const serviceResponse = Http.handleResponse<any>(response)
          resolve(serviceResponse)
        })
        .catch((error) => {
          reject(new ServiceResponse<any>(0, error.message, undefined))
        })
    })

  lookupItemsByPath = (path?: string) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`/master/lookup/lookupItemsByPath`, {path})
        .then((response) => {
          const serviceResponse = Http.handleResponse<any>(response)
          resolve(serviceResponse)
        })
        .catch((error) => {
          reject(new ServiceResponse<any>(0, error.message, undefined))
        })
    })
}
