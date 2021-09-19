/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
import * as Models from "../models"
import { Http, http, ServiceResponse } from "@lp/library/modules/http"
import { stores } from "@lp/stores"

export class LabService {
  listLabs = (page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      const env = stores.loginStore.login && stores.loginStore.login.environment
      const role = stores.loginStore.login && stores.loginStore.login.role
      const lab = stores.loginStore.login && stores.loginStore.login.lab
      http
        .get(`/master/lab/listlabs/${page}/${limit}/${env}/${role}/${lab}`)
        .then((response: any) => {
          const serviceResponse = Http.handleResponse<any>(response)
          resolve(serviceResponse)
        })
        .catch((error) => {
          reject(new ServiceResponse<any>(0, error.message, undefined))
        })
    })

  addLab = (lab?: Models.Labs) =>
    new Promise<any>((resolve, reject) => {
      const form = new FormData()
      form.append("code", lab?.code || "")
      form.append("name", lab?.name || "")
      form.append("country", lab?.country || "")
      form.append("state", lab?.state || "")
      form.append("district", lab?.district || "")
      form.append("city", lab?.city || "")
      form.append("area", lab?.area || "")
      form.append("postalCode", lab?.postalCode || "")
      form.append("address", lab?.address || "")
      form.append("deliveryType", lab?.deliveryType || "")
      form.append("salesTerritory", lab?.salesTerritory || "")
      form.append("labLicence", lab?.labLicence || "")
      form.append("director", lab?.director || "")
      form.append("physician", lab?.physician || "")
      form.append("mobileNo", lab?.mobileNo || "")
      form.append("contactNo", lab?.contactNo || "")
      form.append("speciality", lab?.speciality || "")
      form.append("labType", lab?.labType || "")
      form.append("openingTime", lab?.openingTime || "")
      form.append("closingTime", lab?.closingTime || "")
      form.append("email", lab?.email || "")
      if (lab?.labLog) {
        form.append("file", lab.labLog)
        form.append("folder", "labs")
        form.append("fileName", lab?.labLog.name)
        form.append(
          "image",
          `https://limsplus.blob.core.windows.net/labs/${lab?.labLog.name}`
        )
      }
      form.append("autoRelease", JSON.stringify(lab?.autoRelease || false))
      form.append(
        "requireReceveInLab",
        JSON.stringify(lab?.requireReceveInLab || false)
      )
      form.append("requireScainIn", JSON.stringify(lab?.requireScainIn || false))
      form.append("routingDept", JSON.stringify(lab?.routingDept || false))
      form.append("fyiLine", lab?.fyiLine || "")
      form.append("workLine", lab?.workLine || "")
      http
        .post(`/master/lab/addLab`, form, {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            "content-type": "application/json; charset=utf-8",
          },
        })
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })

  checkExitsEnvCode = (code: string,env: string) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`/master/lab/checkExitsEnvCode`, { code,env })
        .then((response: any) => {
          const serviceResponse = Http.handleResponse<any>(response)
          resolve(serviceResponse)
        })
        .catch((error) => {
          reject(new ServiceResponse<any>(0, error.message, undefined))
        })
    })

  deleteLab = (id: string) =>
    new Promise<any>((resolve, reject) => {
      http
        .delete(`/master/lab/deleteLab/${id}`)
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
        .post(`/master/lab/updateSingleFiled`, newValue)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
}
