/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
//import * as Models from "../models"
import { client, ServiceResponse } from "@lp/library/modules/apolloClient"
import { Http, http } from "@lp/library/modules/http"
import { stores } from "@lp/stores"
import { GET_BANNER_LIST_ALL } from "./query"

export class BannerService {
  listAllBanner = () =>
    new Promise<any>((resolve, reject) => {
      // http
      //   .get(`/banner/listAllBanner`)
      //   .then((response: any) => {
      //     const serviceResponse = Http.handleResponse<any>(response)
      //     resolve(serviceResponse)
      //   })
      //   .catch((error) => {
      //     reject(new ServiceResponse<any>(0, error.message, undefined))
      //   })
      client  
        .query({
          query: GET_BANNER_LIST_ALL,
        })
        .then((response: any) => {
          console.log({ response })
          resolve(response.data)
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })
  listBanner = (page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      const env = stores.loginStore.login && stores.loginStore.login.environment
      const role = stores.loginStore.login && stores.loginStore.login.role
      http
        .get(`/banner/listBanner/${page}/${limit}/${env}/${role}`)
        .then((response: any) => {
          const serviceResponse = Http.handleResponse<any>(response)
          resolve(serviceResponse)
        })
        .catch((error) => {
          reject(new ServiceResponse<any>(0, error.message, undefined))
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
