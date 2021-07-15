/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 * @package Feed Service
 * @author limsplus
 */
//import * as Models from "../models"
import BaseService from "@lp/library/modules/base-service"
   
class MasterPanelService extends BaseService {
  listPanelMaster = () =>
    new Promise<any[]>((resolve, reject) => {
      this.client
        .get(`/master/panelMaster/listPanelMaster`)
        .then((res) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
    addPanelMaster = (panel?: any) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .post(`/master/panelMaster/addPanelMaster`, panel)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
    versionUpgradePanelMaster = (panel?: any) =>
    new Promise<any>((resolve, reject) => {
      console.log({panel});
      
      this.client
        .post(`/master/panelMaster/versionUpgradePanelMaster`, panel)
        .then((res) => {  
          resolve(res.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
    duplicatePanelMaster = (panel?: any) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .post(`/master/panelMaster/duplicatePanelMaster`, panel)
        .then((res) => {  
          resolve(res.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
    deletePanelMaster = (id: string) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .delete(`/master/panelMaster/deletePanelMaster/${id}`)
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
        .post(`/master/panelMaster/updateSingleFiled`, newValue)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
}

export default MasterPanelService
