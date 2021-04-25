/**
 * @fileoverview Use this file invoke Memetoons API
 * implementation related to Memetoons standards
 * @package Feed Service
 * @author limsplus
 */
import * as Models from "../models"
import BaseService from "@lp/library/modules/base-service"

class UserService extends BaseService {
  checkExitsUserId = (userId: string) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .post(`/auth/checkExitsUserId`, { userId })
        .then((res) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  addUser = (user: Models.Users) =>
    new Promise((resolve, reject) => {
      this.client
        .post(`/auth/addUser`, user)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  deleteUser = (id: string) =>
    new Promise<Models.Users[]>((resolve, reject) => {
      this.client
        .delete(`/auth/deleteUser/${id}`)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })

  updateSingleFiled = (newValue: any) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .post(`/auth/updateSingleFiled`, newValue)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
}

export default UserService
