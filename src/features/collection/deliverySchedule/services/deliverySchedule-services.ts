/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 * @package Feed Service
 * @author limsplus
 */

import * as Models from "../models"
import BaseService from "@lp/library/modules/base-service"
    
class DeliveryScheduleService extends BaseService {
  listDeliverySchdule = () =>
    new Promise<Models.DeliverySchedule[]>((resolve, reject) => {
      this.client
        .get(`master/deliverySchdule/listDeliverySchdule`)
        .then((res) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })  
    addDeliverySchdule = (deliverySchdule?: Models.DeliverySchedule) =>
    new Promise<any>((resolve, reject) => {
      this.client
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
      this.client
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
      this.client
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
