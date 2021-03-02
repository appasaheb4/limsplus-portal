/**
 * @fileoverview Use this file invoke Memetoons API
 * implementation related to Memetoons standards
 * @package Feed Service
 * @author limsplus
 */
//import * as Models from "../models"
import BaseService from "@lp/library/modules/base-service"

class RoleService extends BaseService {
  checkExitsCode = (code: string) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .post(`role/checkExitsCode`, { code })
        .then((res) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
}

export default RoleService
