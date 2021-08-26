/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
import * as Models from "../models"
import {  Http, http, ServiceResponse } from "@lp/library/modules/http"

class MasterAnalyteService  {
  listAnalyteMaster = (page=0,limit=10) =>
    new Promise<any>((resolve, reject) => {
      http
        .get(`master/analyteMaster/listAnalyteMaster/${page}/${limit}`)
        .then((response: any) => {
          const serviceResponse = Http.handleResponse<any>(response)
          resolve(serviceResponse)
        })
        .catch((error) => {
          reject(new ServiceResponse<any>(0, error.message, undefined))
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
