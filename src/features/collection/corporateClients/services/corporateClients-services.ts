/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */

import * as Models from "../models"
import { http } from "@lp/library/modules/http"

class CorporateClientsService  {
  listCorporateClients = () =>
    new Promise<Models.CorporateClients[]>((resolve, reject) => {
      http
        .get(`master/corporateClients/listCorporateClients`)
        .then((res: any) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  addCorporateClients = (clients?: Models.CorporateClients) =>
    new Promise<any>((resolve, reject) => {
      http
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
      http
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
      http
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
