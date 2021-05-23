/**
 * @fileoverview Use this file invoke Memetoons API
 * implementation related to Memetoons standards
 * @package Feed Service
 * @author limsplus
 */
import * as Models from "../models"
import BaseService from "@lp/library/modules/base-service"

class LabService extends BaseService {
  listLabs = () =>
    new Promise<Models.Labs[]>((resolve, reject) => {
      this.client
        .get(`/lab/listlabs`)
        .then((res) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  addLab = (lab?: Models.Labs) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .post(`/lab/addLab`, lab)
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
        .post(`/lab/checkExitsCode`, { code })
        .then((res) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  deleteLab = (id: string) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .delete(`/lab/deleteLab/${id}`)
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
        .post(`/lab/updateSingleFiled`, newValue)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
}

export default LabService
