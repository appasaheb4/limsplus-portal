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
  REMOVE_RECORD,
  CREATE_RECORD,
  UPDATE_RECORD,
  VERSION_UPGRADE,
  DUPLICATE_RECORD,
  CHECK_EXISTS_RECORD,
} from "./mutation"

class CorporateClientsService {
  listCorporateClients = (page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      const env = stores.loginStore.login && stores.loginStore.login.environment
      const role = stores.loginStore.login && stores.loginStore.login.role
      client
        .mutate({
          mutation: LIST,
          variables: { input: { page, limit, env, role } },
        })
        .then((response: any) => {
          stores.corporateClientsStore.updateCorporateClientsList(response.data)
          resolve(response.data)
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })
  addCorporateClients = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: CREATE_RECORD,
          variables,
        })
        .then((response: any) => {
          resolve(response.data)
          stores.corporateClientsStore.updateCorporateClients(new Models.CorporateClients({}))
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })
  versionUpgradeCorporateClient = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: VERSION_UPGRADE,
          variables,
        })
        .then((response: any) => {
          resolve(response.data)
          stores.corporateClientsStore.updateCorporateClients(new Models.CorporateClients({}))
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })
  duplicateCorporateClient = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: DUPLICATE_RECORD,
          variables,
        })
        .then((response: any) => {
          resolve(response.data)
          stores.corporateClientsStore.updateCorporateClients(new Models.CorporateClients({}))
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })
  deleteCorporateClients = (variables: any) =>
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
          stores.corporateClientsStore.updateCorporateClients(new Models.CorporateClients({}))
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })  
  checkExistsEnvCode = (variables: any) =>
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
}

export default CorporateClientsService
