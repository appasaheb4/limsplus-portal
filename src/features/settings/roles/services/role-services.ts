/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
import { client, ServiceResponse } from "@/library/modules/apolloClient"
import { stores } from "@/stores"
import {
  LIST,
  CREATE_RECORD,
  REMOVE_RECORD,
  UPDATE_RECORD,
  CHECK_EXISTS_RECORD,
  FILTER,
} from "./mutation"
import * as Model from "../models"

export class RoleService {
  listRole = (page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      const env = stores.loginStore.login && stores.loginStore.login.environment
      const role = stores.loginStore.login && stores.loginStore.login.role
      client
        .mutate({
          mutation: LIST,
          variables: { input: { page, limit, env, role } },
        })
        .then((response: any) => {
          stores.roleStore.updateRoleList(response.data)
          resolve(response.data)
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })

  addrole = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: CREATE_RECORD,
          variables,
        })
        .then((response: any) => {
          resolve(response.data)
          stores.roleStore.updateRole(new Model.Role({}))
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

  deleterole = (variables: any) =>
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
          stores.roleStore.updateRole(new Model.Role({}))
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
          if (!response.data.filterRoles.success) return this.listRole()
          stores.roleStore.filterRoleList(response.data)
          stores.uploadLoadingFlag(true)
          resolve(response.data)
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })
}
