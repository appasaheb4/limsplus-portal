/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
import * as Models from "../models"
import { http } from "@lp/library/modules/http"

class DoctorsService  {
  listDoctors = () =>
    new Promise<Models.Doctors[]>((resolve, reject) => {
      http
        .get(`master/doctors/listDoctors`)
        .then((res: any) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
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
}

export default DoctorsService
