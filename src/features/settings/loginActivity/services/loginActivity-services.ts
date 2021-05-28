/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 * @package Feed Service
 * @author limsplus
 */
import * as Models from "../models"
import BaseService from "@lp/library/modules/base-service"

class LoginActivityService extends BaseService {
  listLoginActivity = () =>
    new Promise<Models.ILoginActivity[]>((resolve, reject) => {
      this.client
        .get(`auth/listLoginActivity`)
        .then((res) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
}

export default LoginActivityService
