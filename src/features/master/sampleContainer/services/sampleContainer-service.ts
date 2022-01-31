/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
import * as Models from "../models"
import { client, ServiceResponse } from "@lp/library/modules/apolloClient"
import { stores } from "@lp/stores"
import {
  LIST,
  CREATE_RECORD,
  REMOVE_RECORDS,
  UPDATE_RECORD,
  UPDATE_IMAGE,
  CHECK_EXISTS_RECORD,
  FILTER,
  FILTER_BY_FIELDS
} from "./mutation"

export class SampleContainerService {
  listSampleContainer = (page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      const env = stores.loginStore.login && stores.loginStore.login.environment
      const role = stores.loginStore.login && stores.loginStore.login.role
      client
        .mutate({
          mutation: LIST,
          variables: { input: { page, limit, env, role } },
        })
        .then((response: any) => {
          stores.sampleContainerStore.updateSampleContainerList(response.data)
          resolve(response.data)
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })

  addSampleContainer = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: CREATE_RECORD,
          variables,
        })
        .then((response: any) => {
          resolve(response.data)
          stores.sampleContainerStore.updateSampleContainer(new Models.SampleContainer({}))
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })

  deleteSampleContainer = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: REMOVE_RECORDS,
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
          mutation: UPDATE_RECORD,
          variables,
        })
        .then((response: any) => {
          resolve(response.data)
          stores.sampleContainerStore.updateSampleContainer(new Models.SampleContainer({}))
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })

  checkExitsEnvCode = (variables: any) =>
    new Promise<any>((resolve, reject) => {  
      client
        .mutate({
          mutation: CHECK_EXISTS_RECORD,
          variables,
        })
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })  

  updateImage = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: UPDATE_IMAGE,
          variables,
        })
        .then((response: any) => {
          resolve(response.data)
          stores.sampleContainerStore.updateSampleContainer(new Models.SampleContainer({}))
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })

    filter = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      stores.uploadLoadingFlag(false)
      client
        .mutate({
          mutation: FILTER,
          variables,
        })
        .then((response: any) => {  
          if (!response.data.filterSampleContainers.success) return this.listSampleContainer()
          stores.sampleContainerStore.filterSampleContainerList(response.data)
          stores.uploadLoadingFlag(true)
          resolve(response.data)
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })

    filterByFields = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      stores.uploadLoadingFlag(false)
      client
        .mutate({
          mutation: FILTER_BY_FIELDS,
          variables,
        })
        .then((response: any) => {
          if (!response.data.filterByFieldsSampleContainers.success)
            return this.listSampleContainer()
          stores.sampleContainerStore.filterSampleContainerList({
            filterSampleContainers: {
              data: response.data.filterByFieldsSampleContainers.data,
              paginatorInfo: {
                count: response.data.filterByFieldsSampleContainers.paginatorInfo.count,
              },
            },
          })
          stores.uploadLoadingFlag(true)
          resolve(response.data)
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })
}

