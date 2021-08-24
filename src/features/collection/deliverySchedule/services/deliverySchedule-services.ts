/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */

import * as Models from "../models"
import { http } from "@lp/library/modules/http"
    
class DeliveryScheduleService  {
  listDeliverySchdule = (page=0,limit=10) =>
    new Promise<Models.DeliverySchedule[]>((resolve, reject) => {
      http
        .get(`master/deliverySchdule/listDeliverySchdule/${page}/${limit}`)
        .then((res: any) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })  
    addDeliverySchdule = (deliverySchdule?: Models.DeliverySchedule) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`master/deliverySchdule/addDeliverySchdule`, deliverySchdule)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
    deleteDeliverySchdule = (id: string) =>
    new Promise<any>((resolve, reject) => {
      http
        .delete(`master/deliverySchdule/deleteDeliverySchdule/${id}`)
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
        .post(`master/deliverySchdule/updateSingleFiled`, newValue)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
}
   
export default DeliveryScheduleService
