/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 * @package Feed Service
 * @author limsplus
 */
import * as Models from "../models"
import BaseService from "@lp/library/modules/base-service"
   
class MasterPackageService extends BaseService {
  listPackageMaster = () =>
    new Promise<Models.MasterPackage[]>((resolve, reject) => {
      this.client
        .get(`master/packageMaster/listPackageMaster`)
        .then((res) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  addPackageMaster = (packageMaster?: any) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .post(`master/packageMaster/addPackageMaster`, packageMaster)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  deletePackageMaster = (id: string) =>
    new Promise<any>((resolve, reject) => {
      this.client
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
      this.client
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
