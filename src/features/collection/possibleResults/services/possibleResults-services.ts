/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 * @package Feed Service
 * @author limsplus
 */
import * as Models from "../models"
import { http } from "@lp/library/modules/http"

export class PossibleResultsService {
  listPossibleResults = () =>
    new Promise<Models.PossibleResults[]>((resolve, reject) => {
      http
        .get(`/master/possibleResults/listPossibleResults`)
        .then((res: any) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
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
