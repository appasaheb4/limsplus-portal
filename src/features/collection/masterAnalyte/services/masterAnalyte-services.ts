/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 * @package Feed Service
 * @author limsplus
 */
import * as Models from "../models"
import { http } from "@lp/library/modules/http"

class MasterAnalyteService  {
  listAnalyteMaster = () =>
    new Promise<Models.MasterAnalyte[]>((resolve, reject) => {
      http
        .get(`master/analyteMaster/listAnalyteMaster`)
        .then((res: any) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  addAnalyteMaster = (analyte?: Models.MasterAnalyte) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`master/analyteMaster/addAnalyteMaster`, analyte)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  versionUpgradeAnalyteMaster = (analyte?: Models.MasterAnalyte) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`master/analyteMaster/versionUpgradeAnalyteMaster`, analyte)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
    duplicateAnalyteMaster = (analyte?: Models.MasterAnalyte) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`master/analyteMaster/duplicateAnalyteMaster`, analyte)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })

  deleteAnalyteMaster = (id: string) =>
    new Promise<any>((resolve, reject) => {
      http
        .delete(`master/analyteMaster/deleteAnalyteMaster/${id}`)
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
        .post(`master/analyteMaster/updateSingleFiled`, newValue)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
}

export default MasterAnalyteService
