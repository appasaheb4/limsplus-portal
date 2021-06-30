/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 * @package Feed Service
 * @author limsplus
 */

import * as Models from "../models"
import BaseService from "@lp/library/modules/base-service"

class CorporateClientsService extends BaseService {
  listCorporateClients = () =>
    new Promise<Models.CorporateClients[]>((resolve, reject) => {
      this.client
        .get(`master/corporateClients/listCorporateClients`)
        .then((res) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  addCorporateClients = (clients?: Models.CorporateClients) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .post(`master/corporateClients/addCorporateClients`, clients)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  deleteCorporateClients = (id: string) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .delete(`master/corporateClients/deleteCorporateClients/${id}`)
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
        .post(`master/corporateClients/updateSingleFiled`, newValue)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
}

export default CorporateClientsService
