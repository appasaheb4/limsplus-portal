/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 * @package Feed Service
 * @author limsplus
 */

import * as Models from "../models"
import BaseService from "@lp/library/modules/base-service"
    
class DeliveryScheduleService extends BaseService {
  listTestPanelMapping = () =>
    new Promise<Models.DeliverySchedule[]>((resolve, reject) => {
      this.client
        .get(`master/testPanelMapping/listTestPanelMapping`)
        .then((res) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })  
  addTestPanelMapping = (panelMappping?: Models.DeliverySchedule) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .post(`master/testPanelMapping/addTestPanelMapping`, panelMappping)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
    deleteTestPanelMapping = (id: string) =>
    new Promise<any>((resolve, reject) => {
      this.client
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
      this.client
        .post(`master/testPanelMapping/updateSingleFiled`, newValue)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
}
   
export default DeliveryScheduleService
