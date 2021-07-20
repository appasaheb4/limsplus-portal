/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 * @package Feed Service
 * @author limsplus
 */
import * as Models from "../models"
import { http } from "@lp/library/modules/http"

export class UserService  {
  userList = () =>
    new Promise<Models.Users[]>((resolve, reject) => {
      http
        .get(`/auth/listUser`)
        .then((res: any) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  reSendPassword = (userInfo: any) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`/auth/reSendPassword`, userInfo)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  checkExitsUserId = (userId: string) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`/auth/checkExitsUserId`, { userId })
        .then((res: any) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  addUser = (user: Models.Users) =>
    new Promise((resolve, reject) => {
      http
        .post(`/auth/addUser`, user)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  deleteUser = (id: string) =>
    new Promise<any>((resolve, reject) => {
      http
        .delete(`/auth/deleteUser/${id}`)
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
        .post(`/auth/updateSingleFiled`, newValue)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  changePassword = (body: any) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`/auth/changePassword`, body)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  switchAccess = (accessInfo: any) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`/auth/switchAccess`, accessInfo)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
}
