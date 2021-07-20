/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 * @package Feed Service
 * @author limsplus
 */
//import * as Models from "../models"
import { http } from "@lp/library/modules/http"
import * as Models from "../models"

export class BannerService {
  listBanner = () =>
    new Promise<Models.IBanner[]>((resolve, reject) => {
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
        .then((res) => {
          resolve(res as Models.IBanner)
        })
        .catch((error) => {
          reject({ error })
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
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
}
