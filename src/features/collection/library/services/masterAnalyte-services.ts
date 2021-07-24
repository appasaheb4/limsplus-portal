/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 * @package Feed Service
 * @author limsplus
 */
import * as Models from "../models"
import { http } from "@lp/library/modules/http"

class MasterAnalyteService {
  listLibrary = () =>
    new Promise<Models.Library[]>((resolve, reject) => {
      http
        .get(`master/library/listLibrary`)
        .then((res: any) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  addLibrary = (library?: Models.Library) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`master/library/addLibrary`, library)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  deleteLibrary = (id: string) =>
    new Promise<any>((resolve, reject) => {
      http
        .delete(`master/library/deleteLibrary/${id}`)
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
        .post(`master/library/updateSingleFiled`, newValue)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
}

export default MasterAnalyteService
