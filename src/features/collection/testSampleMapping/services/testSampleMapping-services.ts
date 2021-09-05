/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
import * as Models from "../models"
import { Http, http, ServiceResponse } from "@lp/library/modules/http"
import { stores } from "@lp/library/stores"

class TestSampleMappingService {
  listTestSampleMapping = (page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      const env = stores.loginStore.login && stores.loginStore.login.environment
      const role = stores.loginStore.login && stores.loginStore.login.role
      http
        .get(
          `master/testSampleMapping/listTestSampleMapping/${page}/${limit}/${env}/${role}`
        )
        .then((response: any) => {
          const serviceResponse = Http.handleResponse<any>(response)
          resolve(serviceResponse)
        })
        .catch((error) => {
          reject(new ServiceResponse<any>(0, error.message, undefined))
        })
    })
  addTestSampleMapping = (sampleMapping?: Models.TestSampleMapping) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`master/testSampleMapping/addTestSampleMapping`, sampleMapping)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  deleteTestSampleMapping = (id: string) =>
    new Promise<any>((resolve, reject) => {
      http
        .delete(`/master/testSampleMapping/deleteTestSampleMapping/${id}`)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  updateSingleFiled = (newValue: any) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`/master/testSampleMapping/updateSingleFiled`, newValue)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })

  checkExitsTestSampleEnvCode = (
    testCode: string,
    smapleCode: string,
    env: string
  ) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`/master/testSampleMapping/checkExitsTestSampleEnvCode`, {
          testCode,
          smapleCode,
          env,
        })
        .then((response: any) => {
          const serviceResponse = Http.handleResponse<any>(response)
          resolve(serviceResponse)
        })
        .catch((error) => {
          reject(new ServiceResponse<any>(0, error.message, undefined))
        })
    })
}

export default TestSampleMappingService
