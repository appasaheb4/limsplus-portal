/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 * @package Feed Service
 * @author limsplus
 */
//import * as Models from "../models"
import BaseService from "@lp/library/modules/base-service"

class TestMasterService extends BaseService {
  listTestMaster = () =>
    new Promise<any[]>((resolve, reject) => {
      this.client
        .get(`/master/testMaster/listTestMaster`)
        .then((res) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  addTestMaster = (test?: any) =>
    new Promise<any>((resolve, reject) => {
      this.client
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
      this.client
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
      this.client
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
      this.client
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
      this.client
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
