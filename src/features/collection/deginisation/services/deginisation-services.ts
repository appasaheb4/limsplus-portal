/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
import * as Models from "../models"
import { http } from "@lp/library/modules/http"

class DeginisationService  {
  listDeginisation = (page=0,limit=10) =>
    new Promise<Models.Deginisation[]>((resolve, reject) => {
      http
        .get(`/deginisation/listDeginisation/${page}/${limit}`)
        .then((res: any) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  addDeginisation = (deginisation?: Models.Deginisation) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`/deginisation/addDeginisation`, deginisation)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  deleteDeginisation = (id: string) =>
    new Promise<any>((resolve, reject) => {
      http
        .delete(`/deginisation/deleteDeginisation/${id}`)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  checkExitsCode = (code: string) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`/deginisation/checkExitsCode`, { code })
        .then((res: any) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })

  updateSingleFiled = (newValue: any) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`/deginisation/updateSingleFiled`, newValue)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
}   
  
export default DeginisationService
