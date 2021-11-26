/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
import { client, ServiceResponse } from "@lp/library/modules/apolloClient"
//import * as Models from "../models"
import {
  LIST,
  REMOVE_RECORD,
  CREATE_RECORD,
  UPDATE_RECORD,
  FILTER,
} from "./mutation"
import { stores } from "@lp/stores"

export class EnvironmentService {
  listEnvironment = (filter: any, page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: LIST,
          variables: { input: { filter, page, limit } },
        })
        .then((response: any) => {
          if (filter.documentType === "environmentVariable") {
            stores.environmentStore.updateEnvVariableList(response.data)
          }
          if (filter.documentType === "environmentSettings") {
            stores.environmentStore.updateEnvSettingsList(response.data)
          }
          resolve(response.data)
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })

  addEnvironment = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: CREATE_RECORD,
          variables,
        })
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })

  deleteRecord = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      console.log({ variables })
      client
        .mutate({
          mutation: REMOVE_RECORD,
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

  updateSingleFiled = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: UPDATE_RECORD,
          variables,
        })
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })

  filter = (variables: any, documentType) =>
    new Promise<any>((resolve, reject) => {
      stores.uploadLoadingFlag(false)
      client
        .mutate({
          mutation: FILTER,
          variables,
        })
        .then((response: any) => {
          if (!response.data.filterEnviroment.success)
            return this.listEnvironment({ documentType })
          if (documentType === "environmentVariable") {
            const data = response.data.filterEnviroment.data.filter(
              (data) => data.documentType === "environmentVariable"
            )
            stores.environmentStore.filterEnvVariableList({
              filterEnviroment: {
                ...response.data.filterEnviroment,
                data,
              },
            })
          }
          if (documentType === "environmentSettings") {
            const data = response.data.filterEnviroment.data.filter(
              (data) => data.documentType === "environmentSettings"
            )
            stores.environmentStore.filterEnvSettingsList({
              filterEnviroment: {
                ...response.data.filterEnviroment,
                data,
              },
            })
          }
          stores.uploadLoadingFlag(true)
          resolve(response.data)
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })
}
