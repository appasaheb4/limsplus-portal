/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 * @package Feed Service
 * @author limsplus
 */
import * as Models from "../models"
import BaseService from "@lp/library/modules/base-service"

class DoctorsService extends BaseService {
  listDoctors = () =>
    new Promise<Models.Doctors[]>((resolve, reject) => {
      this.client
        .get(`master/doctors/listDoctors`)
        .then((res) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
    addDoctors = (doctor?: Models.Doctors) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .post(`master/doctors/addDoctors`, doctor)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
    deleteDoctors = (id: string) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .delete(`master/doctors/deleteDoctors/${id}`)
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
        .post(`master/doctors/updateSingleFiled`, newValue)
        .then((res) => {
          resolve(res)   
        })
        .catch((error) => {
          reject({ error })
        })
    })
}

export default DoctorsService
