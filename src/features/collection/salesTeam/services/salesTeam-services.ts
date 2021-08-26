/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
import * as Models from "../models"
import { Http, http, ServiceResponse } from "@lp/library/modules/http"

export class SalesTeamService  {
  listSalesTeam = (page=0,limit=10) =>
    new Promise<any>((resolve, reject) => {
      http
        .get(`master/salesTeam/listSalesTeam/${page}/${limit}`)
        .then((response: any) => {
          const serviceResponse = Http.handleResponse<any>(response)
          resolve(serviceResponse)
        })
        .catch((error) => {
          reject(new ServiceResponse<any>(0, error.message, undefined))
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
