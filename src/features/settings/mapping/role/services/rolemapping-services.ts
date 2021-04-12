/**
 * @fileoverview Use this file invoke Memetoons API
 * implementation related to Memetoons standards
 * @package Feed Service
 * @author limsplus
 */
//import * as Models from "../models"
import BaseService from "@lp/library/modules/base-service"

class RoleMappingService extends BaseService {
  deleteRoleMapping = (id: string) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .delete(`mapping/deleteRoleMapping/${id}`)
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
