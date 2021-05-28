/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 * @package Feed Service
 * @author limsplus
 */
import * as Models from "../models"
import BaseService from "@lp/library/modules/base-service"

class RoleMappingService extends BaseService {
  addRoleMapping = (roleMapping: any) =>
    new Promise<any>((resolve, reject) => {
      console.log({ roleMapping })
      this.client
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
      this.client
        .get(`/mapping/roleMappingList`)
        .then((res) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  deleteRoleMapping = (id: string) =>
    new Promise<any>((resolve, reject) => {
      this.client
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
      this.client
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
