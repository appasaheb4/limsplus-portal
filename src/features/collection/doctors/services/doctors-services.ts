/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
import * as Models from "../models"
import { Http, http, ServiceResponse } from "@lp/library/modules/http"
import { stores } from "@lp/stores"

class DoctorsService {
  listDoctors = (page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      const env = stores.loginStore.login && stores.loginStore.login.environment
      const role = stores.loginStore.login && stores.loginStore.login.role
      const lab = stores.loginStore.login && stores.loginStore.login.lab
      http
        .get(`master/doctors/listDoctors/${page}/${limit}/${env}/${role}/${lab}`)
        .then((response: any) => {
          const serviceResponse = Http.handleResponse<any>(response)
          resolve(serviceResponse)
        })
        .catch((error) => {
          reject(new ServiceResponse<any>(0, error.message, undefined))
        })
    })
  addDoctors = (doctor?: Models.Doctors) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`master/doctors/addDoctors`, doctor)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  versionUpgradeDoctors = (doctor?: Models.Doctors) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`master/doctors/versionUpgradeDoctors`, doctor)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  duplicateDoctors = (doctor?: Models.Doctors) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`master/doctors/duplicateDoctors`, doctor)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  deleteDoctors = (id: string) =>
    new Promise<any>((resolve, reject) => {
      http
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
      http
        .post(`master/doctors/updateSingleFiled`, newValue)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
   
  checkExitsLabEnvCode = (code: string, env: string, lab: string) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`/master/doctors/checkExitsLabEnvCode`, { code, env, lab })
        .then((response: any) => {
          const serviceResponse = Http.handleResponse<any>(response)
          resolve(serviceResponse)
        })
        .catch((error) => {
          reject(new ServiceResponse<any>(0, error.message, undefined))
        })
    })
}

export default DoctorsService
