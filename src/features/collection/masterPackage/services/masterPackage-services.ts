/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
// import * as Models from "../models"
import { Http, http, ServiceResponse } from "@lp/library/modules/http"
import { stores } from "@lp/library/stores"

class MasterPackageService {
  listPackageMaster = (page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      const env = stores.loginStore.login && stores.loginStore.login.environment
      const role = stores.loginStore.login && stores.loginStore.login.role
      const lab = stores.loginStore.login && stores.loginStore.login.lab
      http
        .get(
          `master/packageMaster/listPackageMaster/${page}/${limit}/${env}/${role}/${lab}`
        )
        .then((response: any) => {
          const serviceResponse = Http.handleResponse<any>(response)
          resolve(serviceResponse)
        })
        .catch((error) => {
          reject(new ServiceResponse<any>(0, error.message, undefined))
        })
    })
  addPackageMaster = (packageMaster?: any) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`master/packageMaster/addPackageMaster`, packageMaster)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  versionUpgradePackageMaster = (packageMaster?: any) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`master/packageMaster/versionUpgradePackageMaster`, packageMaster)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  duplicatePackageMaster = (packageMaster?: any) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`master/packageMaster/duplicatePackageMaster`, packageMaster)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  deletePackageMaster = (id: string) =>
    new Promise<any>((resolve, reject) => {
      http
        .delete(`master/packageMaster/deletePackageMaster/${id}`)
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
        .post(`master/packageMaster/updateSingleFiled`, newValue)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
}

export default MasterPackageService
