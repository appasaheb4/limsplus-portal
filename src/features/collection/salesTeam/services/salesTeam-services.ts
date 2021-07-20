/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 * @package Feed Service
 * @author limsplus
 */
import * as Models from "../models"
import { http } from "@lp/library/modules/http"

export class SalesTeamService  {
  listSalesTeam = () =>
    new Promise<Models.SalesTeam[]>((resolve, reject) => {
      http
        .get(`master/salesTeam/listSalesTeam`)
        .then((res: any) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
    addSalesTeam = (salesTeam?: Models.SalesTeam) =>
    new Promise<any>((resolve, reject) => {
      http
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
      http
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
      http
        .post(`master/salesTeam/updateSingleFiled`, newValue)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
}   
