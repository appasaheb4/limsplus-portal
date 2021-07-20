/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 * @package Feed Service
 * @author limsplus
 */
import * as Models from "../models"
import { http } from "@lp/library/modules/http"
   
class MasterPackageService  {
  listPackageMaster = () =>
    new Promise<Models.MasterPackage[]>((resolve, reject) => {
      http
        .get(`master/packageMaster/listPackageMaster`)
        .then((res: any) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
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
