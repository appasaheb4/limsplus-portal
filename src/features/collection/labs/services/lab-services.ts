/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 * @package Feed Service
 * @author limsplus
 */
import * as Models from "../models"
import BaseService from "@lp/library/modules/base-service"

class LabService extends BaseService {
  listLabs = () =>
    new Promise<Models.Labs[]>((resolve, reject) => {
      this.client
        .get(`/master/lab/listlabs`)
        .then((res) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
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
      this.client
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

  checkExitsCode = (code: string) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .post(`/master/lab/checkExitsCode`, { code })
        .then((res) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  deleteLab = (id: string) =>
    new Promise<any>((resolve, reject) => {
      this.client
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
      this.client
        .post(`/master/lab/updateSingleFiled`, newValue)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
}

export default LabService
