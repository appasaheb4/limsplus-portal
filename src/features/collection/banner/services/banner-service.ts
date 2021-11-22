/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */

import { client, ServiceResponse } from "@lp/library/modules/apolloClient"
import { stores } from "@lp/stores"
import { GET_BANNER_LIST_ALL } from "./query"
import * as Model from "../models/index"
import {
  BANNER_LIST,
  REMOVE_BANNERS,
  UPDATE_BANNER,
  CREATE_BANNER,
  UPDATE_BANNER_IMAGE,
  FILTER_BANNER,
} from "./mutation"

export class BannerService {
  listAllBanner = () =>
    new Promise<any>((resolve, reject) => {
      client
        .query({
          query: GET_BANNER_LIST_ALL,
        })
        .then((response: any) => {
          stores.bannerStore.updateListAllBanner(response.data)
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
      client
        .mutate({
          mutation: BANNER_LIST,
          variables: { input: { page, limit, env, role } },
        })
        .then((response: any) => {
          stores.bannerStore.updateBannerList(response.data)
          resolve(response.data)
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })

  addBanner = (banner: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: CREATE_BANNER,
          variables: {
            input: {
              title: banner.title,
              environment: banner.environment,
              file: banner.image,
              containerName: "banner",
            },
          },
        })
        .then((response: any) => {
          resolve(response.data)
          stores.bannerStore.updateBanner(new Model.Banner({}))
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })

  deleteBanner = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: REMOVE_BANNERS,
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
      console.log({ variables })
      client
        .mutate({
          mutation: UPDATE_BANNER,
          variables,
        })
        .then((response: any) => {
          resolve(response.data)
          stores.bannerStore.updateBanner(new Model.Banner({}))
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })

  updateBannerImage = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      console.log({ variables })
      client
        .mutate({
          mutation: UPDATE_BANNER_IMAGE,
          variables,
        })
        .then((response: any) => {
          resolve(response.data)
          stores.bannerStore.updateBanner(new Model.Banner({}))
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })
  filterBanners = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      stores.uploadLoadingFlag(false)
      client
        .mutate({
          mutation: FILTER_BANNER,
          variables,
        })
        .then((response: any) => {
          if (!response.data.filterBanners.success) return this.listBanner()
          stores.bannerStore.updateFilterBannerList(response.data)
          stores.uploadLoadingFlag(true)
          resolve(response.data)
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })
}
