/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
import * as Models from "../models"
import { http } from "@lp/library/modules/http"

class TestSampleMappingService  {
  listTestSampleMapping = () =>
    new Promise<Models.TestSampleMapping[]>((resolve, reject) => {
      http
        .get(`master/testSampleMapping/listTestSampleMapping`)
        .then((res: any) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
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
}

export default TestSampleMappingService
