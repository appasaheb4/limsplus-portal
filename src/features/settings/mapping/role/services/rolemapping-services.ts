/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
import * as Models from "../models"
import { http } from "@lp/library/modules/http"

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
  roleMappingList = () =>
    new Promise<Models.IRole[]>((resolve, reject) => {
      http
        .get(`/mapping/roleMappingList`)
        .then((res: any) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
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
