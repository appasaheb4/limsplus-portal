/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */   
import * as Models from "../models"
import { http } from "@lp/library/modules/http"

class SampleTypeService  {
  listSampleType = () =>
    new Promise<Models.SampleType[]>((resolve, reject) => {
      http
        .get(`master/sampleType/listSampleType`)
        .then((res: any) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  addSampleType = (sampleType?: Models.SampleType) =>
    new Promise<any>((resolve, reject) => {
      http
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
      http
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
      http
        .post(`/master/sampleType/updateSingleFiled`, newValue)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
}

export default SampleTypeService
