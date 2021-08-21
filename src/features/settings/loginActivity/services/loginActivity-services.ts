/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
import * as Models from "../models"
import { http } from "@lp/library/modules/http"

class LoginActivityService  {
  listLoginActivity = () =>
    new Promise<Models.LoginActivity[]>((resolve, reject) => {
      http
        .get(`auth/listLoginActivity`)
        .then((res: any) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
}

export default LoginActivityService
