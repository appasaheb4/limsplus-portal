/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
import { client, ServiceResponse } from "@lp/library/modules/apolloClient"
import * as Models from "../models"
import { Http, http } from "@lp/library/modules/http"
import { stores } from "@lp/stores"
import { LIST, REMOVE_RECORD } from "./mutation"

class TestAnalyteMappingService {
  listTestAnalyteMapping = (page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      const env = stores.loginStore.login && stores.loginStore.login.environment
      const role = stores.loginStore.login && stores.loginStore.login.role
      const lab = stores.loginStore.login && stores.loginStore.login.lab
      client
        .mutate({
          mutation: LIST,
          variables: { input: { page, limit, env, role, lab } },
        })
        .then((response: any) => {
          stores.testAnalyteMappingStore.updateTestAnalyteMappingList(response.data)
          resolve(response.data)
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })
  addTestAnalyteMapping = (analyteMapping?: Models.TestAnalyteMapping) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`master/testAnalyteMapping/addTestAnalyteMapping`, analyteMapping)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  versionUpgradeTestAnalyteMapping = (analyteMapping?: Models.TestAnalyteMapping) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(
          `master/testAnalyteMapping/versionUpgradeTestAnalyteMapping`,
          analyteMapping
        )
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  duplicateTestAnalyteMapping = (analyteMapping?: Models.TestAnalyteMapping) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(
          `master/testAnalyteMapping/duplicateTestAnalyteMapping`,
          analyteMapping
        )
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
     
  deleteTestAnalyteMapping = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: REMOVE_RECORD,
          variables,
        })
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })


  updateSingleFiled = (newValue: any) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`master/testAnalyteMapping/updateSingleFiled`, newValue)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })

  checkExitsLabEnvCode = (code: string, env: string, lab: string) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`/master/testAnalyteMapping/checkExitsLabEnvCode`, { code, env, lab })
        .then((response: any) => {
          const serviceResponse = Http.handleResponse<any>(response)
          resolve(serviceResponse)
        })
        .catch((error) => {
          reject(new ServiceResponse<any>(0, error.message, undefined))
        })
    })
}

export default TestAnalyteMappingService
