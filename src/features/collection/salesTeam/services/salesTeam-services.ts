/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 * @package Feed Service
 * @author limsplus
 */
import * as Models from "../models"
import BaseService from "@lp/library/modules/base-service"

export class SalesTeamService extends BaseService {
  listSalesTeam = () =>
    new Promise<Models.SalesTeam[]>((resolve, reject) => {
      this.client
        .get(`master/salesTeam/listSalesTeam`)
        .then((res) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
    addSalesTeam = (salesTeam?: Models.SalesTeam) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .post(`master/salesTeam/addSalesTeam`, salesTeam)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
    deleteSalesTeam = (id: string) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .delete(`master/salesTeam/deleteSalesTeam/${id}`)
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
        .post(`master/salesTeam/updateSingleFiled`, newValue)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
}   
