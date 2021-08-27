/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
import * as Models from "../models"
import { Http, http, ServiceResponse } from "@lp/library/modules/http"

class TestPanelMappingService  {
  listTestPanelMapping = (page=0,limit=10) =>
    new Promise<any>((resolve, reject) => {
      http
        .get(`master/testPanelMapping/listTestPanelMapping/${page}/${limit}`)
        .then((response: any) => {
          const serviceResponse = Http.handleResponse<any>(response)
          resolve(serviceResponse) 
        })
        .catch((error) => {
          reject(new ServiceResponse<any>(0, error.message, undefined))
        })
    })
  addTestPanelMapping = (panelMappping?: Models.TestPanelMapping) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`master/testPanelMapping/addTestPanelMapping`, panelMappping)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  versionUpgradeTestPanelMapping = (panelMappping?: Models.TestPanelMapping) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(
          `master/testPanelMapping/versionUpgradeTestPanelMapping`,
          panelMappping
        )
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  duplicateTestPanelMapping = (panelMappping?: Models.TestPanelMapping) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`master/testPanelMapping/duplicateTestPanelMapping`, panelMappping)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })   

  deleteTestPanelMapping = (id: string) =>
    new Promise<any>((resolve, reject) => {
      http
        .delete(`master/testPanelMapping/deleteTestPanelMapping/${id}`)
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
        .post(`master/testPanelMapping/updateSingleFiled`, newValue)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
}

export default TestPanelMappingService
