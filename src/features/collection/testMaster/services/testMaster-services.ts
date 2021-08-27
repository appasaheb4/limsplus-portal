/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
//import * as Models from "../models"
import { Http, http, ServiceResponse } from "@lp/library/modules/http"

class TestMasterService  {
  listTestMaster = (page=0,limit=10) =>
    new Promise<any>((resolve, reject) => {
      http
        .get(`/master/testMaster/listTestMaster/${page}/${limit}`)
        .then((response: any) => {
          const serviceResponse = Http.handleResponse<any>(response)
          resolve(serviceResponse)
        })
        .catch((error) => {
          reject(new ServiceResponse<any>(0, error.message, undefined))
        })
    })
  addTestMaster = (test?: any) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`/master/testMaster/addTestMaster`, test)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })   
  versionUpgradeTestMaster = (test?: any) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`/master/testMaster/versionUpgradeTestMaster`, test)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })  
  duplicateTestMaster = (test?: any) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`/master/testMaster/duplicateTestMaster`, test)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  deleteTestMaster = (id: string) =>
    new Promise<any>((resolve, reject) => {
      http
        .delete(`/master/testMaster/deleteTestMaster/${id}`)
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
        .post(`/master/testMaster/updateSingleFiled`, newValue)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
}

export default TestMasterService
