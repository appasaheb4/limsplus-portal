/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
import * as Models from "../models"
import { http } from "@lp/library/modules/http"

export class RoleService {  
  listRole = () =>  
    new Promise<Models.IRole[]>((resolve, reject) => {
      http
        .get(`/role/listRole`)
        .then((res: any) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  addrole = (lab?: Models.IRole) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`/role/addRole`, lab)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })

  checkExitsCode = (code: string) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`/role/checkExitsCode`, { code })
        .then((res: any) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  deleterole = (id: string) =>
    new Promise<any>((resolve, reject) => {
      http
        .delete(`/role/deleteRole/${id}`)
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
        .post(`/role/updateSingleFiled`, newValue)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
}
