/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 * @package Feed Service
 * @author limsplus
 */
import * as Models from "../models"
import BaseService from "@lp/library/modules/base-service"

class TestAnalyteMappingService extends BaseService {
  listTestAnalyteMapping = () =>
    new Promise<Models.TestAnalyteMapping[]>((resolve, reject) => {
      this.client
        .get(`master/testAnalyteMapping/listTestAnalyteMapping`)
        .then((res) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  addTestAnalyteMapping = (analyteMapping?: Models.TestAnalyteMapping) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .post(`master/testAnalyteMapping/addTestAnalyteMapping`, analyteMapping)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  deleteTestAnalyteMapping = (id: string) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .delete(`master/testAnalyteMapping/deleteTestAnalyteMapping/${id}`)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })   
  updateSingleFiled = (newValue: any) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .post(`master/testAnalyteMapping/updateSingleFiled`, newValue)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
}

export default TestAnalyteMappingService
