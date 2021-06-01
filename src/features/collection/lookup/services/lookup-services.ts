/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 * @package Feed Service
 * @author limsplus
 */
import * as Models from "../models"
import BaseService from "@lp/library/modules/base-service"

class LookupService extends BaseService {
  listLookup = () =>
    new Promise<Models.ILookup[]>((resolve, reject) => {
      this.client
        .get(`/Lookup/listLookup`)
        .then((res) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  addLookup = (Lookup?: Models.ILookup) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .post(`/Lookup/addLookup`, Lookup)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  checkExitsCode = (code: string) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .post(`/Lookup/checkExitsCode`, { code })
        .then((res) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  deleteLookup = (id: string) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .delete(`/Lookup/deleteLookup/${id}`)
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
        .post(`/Lookup/updateSingleFiled`, newValue)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
}

export default LookupService
