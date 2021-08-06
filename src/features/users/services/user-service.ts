/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 * @author limsplus
 */

import * as Models from "../models"
import { Http, http, ServiceResponse } from "@lp/library/modules/http"
import { AssetsService } from "@lp/features/assets/services"

export class UserService {
  userList = () =>
    new Promise<any>((resolve, reject) => {
      http
        .get(`/auth/listUser`)
        .then((response) => {
          const serviceResponse = Http.handleResponse<any>(response)
          resolve(serviceResponse)
        })
        .catch((error) => {
          reject(new ServiceResponse<any>(0, error.message, undefined))
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
        .then((response: any) => {
          const serviceResponse = Http.handleResponse<any>(response)
          resolve(serviceResponse)
        })
        .catch((error) => {
          reject(new ServiceResponse<any>(0, error.message, undefined))
        })
    })

  addUser = async (user: Models.Users) =>
    new Promise((resolve, reject) => {
      let signaturePath: string | undefined
      let picturePath: string | undefined
      if (user.signature) {
        signaturePath = `https://limsplus.blob.core.windows.net/users/${user.signature.name}`
        new AssetsService().uploadFile(user.signature, "users", user.signature.name)
      }
      if (user.picture) {
        picturePath = `https://limsplus.blob.core.windows.net/users/${user.picture.name}`
        new AssetsService().uploadFile(user.signature, "users", user.picture.name)
      }
      const form = new FormData()
      form.append("userId", user.userId)
      form.append("empCode", user.empCode)
      form.append("defaultLab", user.defaultLab)
      form.append("lab", JSON.stringify(user.lab))
      form.append("password", user.password)
      form.append("passChanged", JSON.stringify(user.passChanged) || '')
      form.append("deginisation", user.deginisation)
      form.append("fullName", user.fullName)  
      form.append("mobileNo", user.mobileNo)
      form.append("contactNo", user.contactNo || '')
      form.append("email", user.email)
      form.append("dateOfBirth", JSON.stringify(user.dateOfBirth))
      form.append("marriageAnniversary", JSON.stringify(user.marriageAnniversary))
      form.append("userDegree", user.userDegree)
      form.append("department", JSON.stringify(user.department))
      form.append("exipreDate", JSON.stringify(user.exipreDate))
      form.append("expireDays", JSON.stringify(user.expireDays))
      form.append("role", JSON.stringify(user.role))
      form.append("validationLevel", JSON.stringify(user.validationLevel) ||'')
      form.append("workstation", user.workstation || '')
      form.append("ipAddress", user.ipAddress || '')
      form.append("dateOfEntry", JSON.stringify(user.dateOfEntry))
      form.append("createdBy", user.createdBy)
      form.append("confidential", JSON.stringify(user.confidential))
      form.append("signature", signaturePath || "")
      form.append("picture", picturePath || "")
      form.append("status", user.status)
      form.append("environment", user.environment)
      http
        .post(`/auth/addUser`, form)
        .then((response) => {
          const serviceResponse = Http.handleResponse<any>(response)
          resolve(serviceResponse)
        })
        .catch((error) => {
          reject(new ServiceResponse<any>(0, error.message, undefined))
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

  findUserByEmpCode = (empCode: string) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`/auth/findUserByEmpcode`, { empCode })
        .then((response: any) => {
          const serviceResponse = Http.handleResponse<any>(response)
          resolve(serviceResponse)
        })
        .catch((error) => {
          reject(new ServiceResponse<any>(0, error.message, undefined))
        })
    })

  uploadImage = (deatils: any) =>
    new Promise<any>((resolve, reject) => {
      const formData = new FormData()
      formData.append("id", deatils.id)
      formData.append("file", deatils.image)
      formData.append("folder", deatils.folder)
      formData.append("fileName", deatils.image.name)
      formData.append(
        "image",
        `https://limsplus.blob.core.windows.net/${deatils.folder}/${deatils.image.name}`
      )
      http
        .post(`/auth/uploadImage`, formData, {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
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
