/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
import { client, ServiceResponse } from "@/library/modules/apolloClient"
import { stores } from "@/stores"
import {
  LIST,
  REMOVE_RECORD,
  CREATE_RECORD,
  UPDATE_RECORD,
  VERSION_UPGRADE,
  DUPLICATE_RECORD,
  CHECK_EXISTS_RECORD,
  FILTER
} from "./mutation"
import * as Model from '../models'

export class TestAnalyteMappingService {
  listTestAnalyteMapping = (page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      const env = stores.loginStore.login && stores.loginStore.login.environment
      const role = stores.loginStore.login && stores.loginStore.login.role
      const lab = stores.loginStore.login && stores.loginStore.login.lab
      client
        .mutate({
          mutation: LIST,
          variables: { input: { page, limit, env, role, lab } },
        })
        .then((response: any) => {
          stores.testAnalyteMappingStore.updateTestAnalyteMappingList(response.data)
          resolve(response.data)
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })
  addTestAnalyteMapping = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: CREATE_RECORD,
          variables,
        })
        .then((response: any) => {
          resolve(response.data)
          stores.testAnalyteMappingStore.updateTestAnalyteMapping(new Model.TestAnalyteMapping({}))
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })
  versionUpgradeTestAnalyteMapping = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: VERSION_UPGRADE,
          variables,
        })
        .then((response: any) => {
          resolve(response.data)
          stores.testAnalyteMappingStore.updateTestAnalyteMapping(new Model.TestAnalyteMapping({}))
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })
  duplicateTestAnalyteMapping = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: DUPLICATE_RECORD,
          variables,
        })
        .then((response: any) => {
          resolve(response.data)
          stores.testAnalyteMappingStore.updateTestAnalyteMapping(new Model.TestAnalyteMapping({}))
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })

  deleteTestAnalyteMapping = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: REMOVE_RECORD,
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
          stores.testAnalyteMappingStore.updateTestAnalyteMapping(new Model.TestAnalyteMapping({}))
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })

  checkExitsRecords = (variables: any) =>
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

    filter = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      stores.uploadLoadingFlag(false)
      client
        .mutate({
          mutation: FILTER,
          variables,
        })
        .then((response: any) => {
          if (!response.data.filterTestAnalyteMappings.success)
            return this.listTestAnalyteMapping()
          stores.testAnalyteMappingStore.filterTestAnalyteMappingList(response.data)
          stores.uploadLoadingFlag(false)
          resolve(response.data)
        })  
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })
}

