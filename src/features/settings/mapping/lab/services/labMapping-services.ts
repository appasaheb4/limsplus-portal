/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
// import * as Models from "../models"
import { Http, http, ServiceResponse } from "@lp/library/modules/http"

class LabMappingService  {
  labMappingList = (page=0,limit=10) =>
    new Promise<any>((resolve, reject) => {
      http
        .get(`/mapping/labMappingList/${page}/${limit}`)
        .then((response: any) => {
          const serviceResponse = Http.handleResponse<any>(response)
          resolve(serviceResponse)
        })
        .catch((error) => {
          reject(new ServiceResponse<any>(0, error.message, undefined))

        })
    })
  addLabMapping = (userMapping: any) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`/mapping/addLabMapping`, userMapping)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  deleteLabMapping = (id: string) =>
    new Promise<any>((resolve, reject) => {
      http
        .delete(`/mapping/deleteLabMapping/${id}`)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {  
          reject({ error })
        })
    })
}
export default LabMappingService
