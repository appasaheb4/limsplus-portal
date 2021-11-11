/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
 import { client, ServiceResponse } from "@lp/library/modules/apolloClient"
 import { LIST, REMOVE_RECORD,CREATE_RECORD,UPDATE_RECORD } from "./mutation"
 import {stores} from '@lp/stores'

class RoleMappingService  {
  addRoleMapping = (variables: any) =>
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
  roleMappingList = (page=0,limit=10) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: LIST,
          variables: { input: { page, limit } },
        })
        .then((response: any) => {
          stores.roleMappingStore.updateRoleMappingList(response.data)
          resolve(response.data)
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })
  deleteRoleMapping = (variables: any) =>
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

  updateRoleMapping = (variables: any) =>
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
}

export default RoleMappingService
