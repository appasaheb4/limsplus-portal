/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
import * as Models from "../models"
import { Http, http } from "@lp/library/modules/http"
import { client, ServiceResponse } from "@lp/library/modules/apolloClient"
import { stores } from "@lp/stores"
import {
  LOOKUPITEM_BY_PATH,
  LIST,
  CREATE_DOCUMENT_RECORD,
  REMOVE_DOCUMENT_RECORD,
  UPDATE_RECORD
} from "./mutation"

export class LookupService {
  listLookup = (page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      const env = stores.loginStore.login && stores.loginStore.login.environment
      const role = stores.loginStore.login && stores.loginStore.login.role
      client
        .mutate({
          mutation: LIST,
          variables: { input: { page, limit, env, role } },
        })
        .then((response: any) => {
          console.log({ response })

          stores.lookupStore.updateLookupList(response.data)
          resolve(response.data)
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })

  addLookup = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: CREATE_DOCUMENT_RECORD,
          variables,
        })
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })

  deleteLookup = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: REMOVE_DOCUMENT_RECORD,
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
      })
      .catch((error) =>
        reject(new ServiceResponse<any>(0, error.message, undefined))
      )
    })
  generalSettingsUpdate = (lookup?: Partial<Models.GlobalSettings>) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`/master/lookup/generalSettingsUpdate`, lookup)
        .then((response) => {
          const serviceResponse = Http.handleResponse<any>(response)
          resolve(serviceResponse)
        })
        .catch((error) => {
          reject(new ServiceResponse<any>(0, error.message, undefined))
        })
    })

  lookupItemsByPath = (path: string) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: LOOKUPITEM_BY_PATH,
          variables: { path },
        })
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })
}
