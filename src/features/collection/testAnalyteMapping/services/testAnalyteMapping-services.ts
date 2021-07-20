/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 * @package Feed Service
 * @author limsplus
 */
import * as Models from "../models"
import { http } from "@lp/library/modules/http"

class TestAnalyteMappingService  {
  listTestAnalyteMapping = () =>
    new Promise<Models.TestAnalyteMapping[]>((resolve, reject) => {
      http
        .get(`master/testAnalyteMapping/listTestAnalyteMapping`)
        .then((res: any) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
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
        .post(`master/testAnalyteMapping/versionUpgradeTestAnalyteMapping`, analyteMapping)
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
        .post(`master/testAnalyteMapping/duplicateTestAnalyteMapping`, analyteMapping)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })



  deleteTestAnalyteMapping = (id: string) =>
    new Promise<any>((resolve, reject) => {
      http
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
      http
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
