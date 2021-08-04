/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
import * as Models from "../models"
import { http } from "@lp/library/modules/http"
export class SectionService  {
  listSection = () =>
    new Promise<Models.Section[]>((resolve, reject) => {
      http
        .get(`/master/section/listSection`)
        .then((res: any) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  addSection = (section?: Models.Section) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`/master/section/addSection`, section)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  deleteSection = (id: string) =>
    new Promise<any>((resolve, reject) => {
      http
        .delete(`/master/section/deleteSection/${id}`)
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
        .post(`/master/section/updateSingleFiled`, newValue)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
}
