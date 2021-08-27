/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
import * as Models from "../models"
import { Http, http, ServiceResponse } from "@lp/library/modules/http"

export class PossibleResultsService {
  listPossibleResults = (page=0,limit=10) =>
    new Promise<any>((resolve, reject) => {
      http
        .get(`/master/possibleResults/listPossibleResults/${page}/${limit}`)
        .then((response: any) => {
          const serviceResponse = Http.handleResponse<any>(response)
          resolve(serviceResponse)
        })
        .catch((error) => {
          reject(new ServiceResponse<any>(0, error.message, undefined))
        })
    })
  addPossibleResults = (lookup?: Models.PossibleResults) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`/master/possibleResults/addPossibleResults`, lookup)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  deletePossibleResults = (id: string) =>
    new Promise<any>((resolve, reject) => {
      http
        .delete(`/master/possibleResults/deletePossibleResults/${id}`)
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
        .post(`/master/possibleResults/updateSingleFiled`, newValue)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
}
