/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
//import * as Models from "../models"
import { http } from "@lp/library/modules/http"
   
class MasterPanelService  {
  listPanelMaster = () =>
    new Promise<any[]>((resolve, reject) => {
      http
        .get(`/master/panelMaster/listPanelMaster`)
        .then((res: any) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
    addPanelMaster = (panel?: any) =>
    new Promise<any>((resolve, reject) => {
      http
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
      
      http
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
      http
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
      http
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
      http
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
