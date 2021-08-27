/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
// import * as Models from "../models"
import { Http, http, ServiceResponse } from "@lp/library/modules/http"

class RoleMappingService  {
  addRoleMapping = (roleMapping: any) =>
    new Promise<any>((resolve, reject) => {
      console.log({ roleMapping })
      http
        .post(`/mapping/addRoleMapping`, roleMapping)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  roleMappingList = (page=0,limit=10) =>
    new Promise<any>((resolve, reject) => {
      http
        .get(`/mapping/roleMappingList/${page}/${limit}`)
        .then((response: any) => {
          const serviceResponse = Http.handleResponse<any>(response)
          resolve(serviceResponse)
        })
        .catch((error) => {
          reject(new ServiceResponse<any>(0, error.message, undefined))
        })
    })
  deleteRoleMapping = (id: string) =>
    new Promise<any>((resolve, reject) => {
      http
        .delete(`/mapping/deleteRoleMapping/${id}`)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })

  updateRoleMapping = (roleMapping: any) =>
    new Promise<any>((resolve, reject) => {
      console.log({ roleMapping })
      http
        .post(`/mapping/updateRoleMapping`, roleMapping)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
}

export default RoleMappingService
