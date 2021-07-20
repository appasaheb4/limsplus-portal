/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 * @package Feed Service
 * @author limsplus
 */
import * as Models from "../models"
import { http } from "@lp/library/modules/http"

class TestPanelMappingService  {
  listTestPanelMapping = () =>
    new Promise<Models.TestPanelMapping[]>((resolve, reject) => {
      http
        .get(`master/testPanelMapping/listTestPanelMapping`)
        .then((res: any) => {
          resolve(res.data.data)  
        })
        .catch((error) => {
          reject({ error })
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
