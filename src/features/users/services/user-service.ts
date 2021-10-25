/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 * @author limsplus
 */

import { Http, http } from "@lp/library/modules/http"
import { stores } from "@lp/stores"
import { client, ServiceResponse } from "@lp/library/modules/apolloClient"
import {
  CHECK_EXISTS_USERID,
  USER_LIST,
  UPDATE_USER,
  REMOVE_USER,
  CREATE_USER,
  CHECK_EXISTS_EMPCODE,
  UPDATE_IMAGE,
  PASSWORD_RESEND,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_BY_ADMIN,
  SWITCH_ACCESS,
} from "./mutation"

export class UserService {
  userList = (page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      const env = stores.loginStore.login && stores.loginStore.login.environment
      const role = stores.loginStore.login && stores.loginStore.login.role
      client
        .mutate({
          mutation: USER_LIST,
          variables: {
            input: {
              page,
              limit,
              env,
              role,
            },
          },
        })
        .then((response: any) => {
          stores.userStore.updateUserList(response.data)
          resolve(response.data)
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })

  checkExitsUserId = (userId: string) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: CHECK_EXISTS_USERID,
          variables: { userId },
        })
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })

  addUser = async (variables: any) =>
    new Promise((resolve, reject) => {
      client
        .mutate({
          mutation: CREATE_USER,
          variables,
        })
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })

  deleteUser = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: REMOVE_USER,
          variables,
        })
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })

  updateSingleFiled = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: UPDATE_USER,
          variables,
        })
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })

  findUserByEmpCode = (empCode: string) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: CHECK_EXISTS_EMPCODE,
          variables: { empCode },
        })
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })

  uploadImage = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: UPDATE_IMAGE,
          variables,
        })
        .then((response: any) => {
          console.log({ response })
          resolve(response.data)
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })

  reSendPassword = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: PASSWORD_RESEND,
          variables,
        })
        .then((response: any) => {
          console.log({ response })
          resolve(response.data)
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })

  changePassword = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: CHANGE_PASSWORD,
          variables,
        })
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })

  changepasswordByAdmin = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: CHANGE_PASSWORD_BY_ADMIN,
          variables,
        })
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })

  switchAccess = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: SWITCH_ACCESS,
          variables,
        })
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })    

  loginActivityList = (details: any) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`/auth/loginActivityList`, details)
        .then((response: any) => {
          const serviceResponse = Http.handleResponse<any>(response)
          resolve(serviceResponse)
        })
        .catch((error) => {
          reject(new ServiceResponse<any>(0, error.message, undefined))
        })
    })
}
