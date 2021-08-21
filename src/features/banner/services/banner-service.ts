/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
//import * as Models from "../models"
import { Http, http, ServiceResponse } from "@lp/library/modules/http"
import * as Models from "../models"

export class BannerService {

  listBanner = () =>
    new Promise<Models.Banner[]>((resolve, reject) => {
      http
        .get(`/banner/listBanner`)
        .then((res: any) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
    
  addBanner = (banner: any) =>
    new Promise<any>((resolve, reject) => {
      const form = new FormData()
      form.append("title", banner.title)
      form.append("file", banner.image)
      form.append("folder", "banner")
      form.append("fileName", banner.image.name)
      form.append(
        "image",
        `https://limsplus.blob.core.windows.net/banner/${banner.image.name}`
      )
      http
        .post(`banner/addBanner`, form, {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            "content-type": "application/json; charset=utf-8",
          },
        })
        .then((response) => {
          const serviceResponse = Http.handleResponse<any>(response)
          resolve(serviceResponse)
        })  
        .catch((error) => {
          reject(new ServiceResponse<any>(0, error.message, undefined))
        })
    })

  deleteBanner = (id: string) =>
    new Promise<any>((resolve, reject) => {
      http
        .delete(`/banner/deleteBanner/${id}`)
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
        .post(`/banner/updateSingleFiled`, newValue)
        .then((response) => {
          const serviceResponse = Http.handleResponse<any>(response)
          resolve(serviceResponse)
        })
        .catch((error) => {
          reject(new ServiceResponse<any>(0, error.message, undefined))
        })
    })
}
