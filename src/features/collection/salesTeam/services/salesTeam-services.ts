/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
import { client, ServiceResponse } from "@lp/library/modules/apolloClient"
import { stores } from "@lp/stores"

import {
  LIST,
  REMOVE_RECORD,
  CREATE_RECORD,
  UPDATE_RECORD,
  EXISTS_RECORD,
} from "./mutation"

export class SalesTeamService {
  listSalesTeam = (page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      const env = stores.loginStore.login && stores.loginStore.login.environment
      const role = stores.loginStore.login && stores.loginStore.login.role
      client
        .mutate({
          mutation: LIST,
          variables: { input: { page, limit, env, role } },
        })
        .then((response: any) => {
          console.log({data:response.data});
          
          stores.salesTeamStore.updateSalesTeamList(response.data)
          resolve(response.data)
        })
        .catch((error) => reject(error))
    })
  addSalesTeam = (variables: any) =>
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

  deleteSalesTeam = (variables: any) =>
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
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })

  checkExistsEnvCode = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
      .mutate({
        mutation: EXISTS_RECORD,
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
