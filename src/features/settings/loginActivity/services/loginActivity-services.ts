/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */

import { http, Http, ServiceResponse } from "@lp/library/modules/http"

class LoginActivityService {
  listLoginActivity = (page=0,limit=10) =>
    new Promise<any>((resolve, reject) => {
      http
        .get(`/auth/listLoginActivity/${page}/${limit}`)
        .then((response: any) => {
          const serviceResponse = Http.handleResponse<any>(response)
          resolve(serviceResponse)
        })  
        .catch((error) => {
          reject(new ServiceResponse<any>(0, error.message, undefined))
        })
    })   
}

export default LoginActivityService
