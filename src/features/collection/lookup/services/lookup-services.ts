/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
import * as Models from "../models"
import { http } from "@lp/library/modules/http"

class LookupService  {
  listLookup = () =>
    new Promise<Models.Lookup[]>((resolve, reject) => {
      http
        .get(`/master/lookup/listLookup`)
        .then((res: any) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  addLookup = (lookup?: Models.Lookup) =>
    new Promise<any>((resolve, reject) => {
      http
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
}

export default LookupService
