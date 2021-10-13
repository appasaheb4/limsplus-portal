/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
import { Http, http } from "@lp/library/modules/http"
import { client, ServiceResponse } from "@lp/library/modules/apolloClient"
import { stores } from "@lp/stores"
import { LABS_LIST, REMOVE_LABS, CREATE_LAB, UPDATE_LAB } from "./mutation"

export class LabService {
  listLabs = (page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      const env = stores.loginStore.login && stores.loginStore.login.environment
      const role = stores.loginStore.login && stores.loginStore.login.role
      const lab = stores.loginStore.login && stores.loginStore.login.lab
      client
        .mutate({
          mutation: LABS_LIST,
          variables: { input: { page, limit, env, role, lab } },
        })
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })

  addLab = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: CREATE_LAB,
          variables,
        })
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })

  checkExitsEnvCode = (code: string, env: string) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`/master/lab/checkExitsEnvCode`, { code, env })
        .then((response: any) => {
          const serviceResponse = Http.handleResponse<any>(response)
          resolve(serviceResponse)
        })
        .catch((error) => {
          reject(new ServiceResponse<any>(0, error.message, undefined))
        })
    })

  deleteLab = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: REMOVE_LABS,
          variables,
        })
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })

    
  updateSingleFiled = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: UPDATE_LAB,
          variables,
        })
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })
}
