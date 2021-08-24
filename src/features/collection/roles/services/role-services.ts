/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
import * as Models from "../models"
import { http } from "@lp/library/modules/http"

export class RoleService {  
  listRole = (page=0,limit=10) =>  
    new Promise<Models.Role[]>((resolve, reject) => {
      http
        .get(`/role/listRole/${page}/${limit}`)
        .then((res: any) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  addrole = (lab?: Models.Role) =>
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
