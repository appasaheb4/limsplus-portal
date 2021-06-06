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
    new Promise<Models.Lookup[]>((resolve, reject) => {
      this.client
        .get(`/master/lookup/listLookup`)
        .then((res) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  addLookup = (lookup?: Models.Lookup) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .post(`/master/lookup/addLookup`, lookup)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  deleteLookup = (id: string) =>
    new Promise<any>((resolve, reject) => {
      this.client
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
      this.client
        .post(`/master/lookup/updateSingleFiled`, newValue)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
}

export default LookupService
