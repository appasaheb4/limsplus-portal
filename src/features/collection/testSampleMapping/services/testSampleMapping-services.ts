/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 * @package Feed Service
 * @author limsplus
 */
import * as Models from "../models"
import BaseService from "@lp/library/modules/base-service"

class TestSampleMappingService extends BaseService {
  listTestSampleMapping = () =>
    new Promise<Models.TestSampleMapping[]>((resolve, reject) => {
      this.client
        .get(`master/testSampleMapping/listTestSampleMapping`)
        .then((res) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  addTestSampleMapping = (sampleMapping?: Models.TestSampleMapping) =>
    new Promise<any>((resolve, reject) => {
      this.client
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
      this.client
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
      this.client
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
