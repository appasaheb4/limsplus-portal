/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 * @package Feed Service
 * @author limsplus
 */
import * as Models from "../models"
import BaseService from "@lp/library/modules/base-service"

class DepartmentService extends BaseService {   
  listDepartment = () =>
    new Promise<Models.Department[]>((resolve, reject) => {
      this.client
        .get(`/master/department/listDepartment`)
        .then((res) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })

  adddepartment = (department?: Models.Department) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .post(`/master/department/addDepartment`, department)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  checkExitsCode = (code: string) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .post(`/master/department/checkExitsCode`, { code })
        .then((res) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  deletedepartment = (id: string) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .delete(`/master/department/deleteDepartment/${id}`)
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
        .post(`/master/department/updateSingleFiled`, newValue)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
}

export default DepartmentService
