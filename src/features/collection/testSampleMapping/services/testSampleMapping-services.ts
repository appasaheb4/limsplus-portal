/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 * @package Feed Service
 * @author limsplus
 */   
import * as Models from "../models"
import BaseService from "@lp/library/modules/base-service"

class TestSampleMappingService extends BaseService {
  listSampleType = () =>
    new Promise<Models.TestSampleMapping[]>((resolve, reject) => {
      this.client
        .get(`master/sampleType/listSampleType`)
        .then((res) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  addSampleType = (sampleType?: Models.TestSampleMapping) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .post(`master/sampleType/addSampleType`, sampleType)
        .then((res) => {
          resolve(res.data)
        })  
        .catch((error) => {
          reject({ error })
        })
    })
  deleteSampleType = (id: string) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .delete(`/master/sampleType/deleteSampleType/${id}`)
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
        .post(`/master/sampleType/updateSingleFiled`, newValue)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
}  

export default TestSampleMappingService
