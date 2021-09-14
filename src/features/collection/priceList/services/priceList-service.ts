/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
import { Http, http } from "@lp/library/modules/http"
import * as Models from "../models/PriceList"
import { client, ServiceResponse } from "@lp/library/modules/apolloClient"
import { GET_PRICELIST } from "./query"
import { ADD_PRICELIST } from "./mutation"
import { stores } from "@lp/library/stores"

export class PriceListService {
  addPriceList = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: ADD_PRICELIST,
          variables,
        })  
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })

  listPiceList = (page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      const env = stores.loginStore.login && stores.loginStore.login.environment
      const role = stores.loginStore.login && stores.loginStore.login.role
      const lab = stores.loginStore.login && stores.loginStore.login.lab
      client
        .query({
          query: GET_PRICELIST,
          variables: { page, limit, env, role, lab },
        })
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })

  deletePriceList = (id: string) =>
    new Promise<any>((resolve, reject) => {
      http
        .delete(`/${id}`)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  versionUpgradePriceList = (input: Models.PriceList) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(``)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })

  duplicatePriceList = (analyte?: Models.PriceList) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`master/analyteMaster/duplicateAnalyteMaster`, analyte)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })

  // updateSingleFiled = (newValue: any) =>
  //   new Promise<any>((resolve, reject) => {
  //     http
  //       .post(``, newValue)
  //       .then((response) => {
  //         const serviceResponse = Http.handleResponse<any>(response)
  //         resolve(serviceResponse)
  //       })
  //       .catch((error) => {
  //         reject(new ServiceResponse<any>(0, error.message, undefined))
  //       })
  //   })

  // checkExitsLabEnvCode = (code: string, env: string, lab: string) =>
  //   new Promise<any>((resolve, reject) => {
  //     http
  //       .post(``)
  //       .then((response: any) => {
  //         const serviceResponse = Http.handleResponse<any>(response)
  //         resolve(serviceResponse)
  //       })
  //       .catch((error) => {
  //         reject(new ServiceResponse<any>(0, error.message, undefined))
  //       })
  //   })
}
