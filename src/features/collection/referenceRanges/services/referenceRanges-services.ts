/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
import { client, ServiceResponse } from "@lp/library/modules/apolloClient"
import { stores } from "@lp/stores"
import { GET_ALL_REFERENCERANGES } from "./query"
import {
  ADD_REFERENCERANGES,
  VERSION_UPGRADE,
  DELETE_RECORD,
  DUPLICATE_RECORD,
  UPDATE_SINGE_FILED,
  CHECK_EXITS_RECORD,
} from "./mutation"
export class ReferenceRangesService {
  listReferenceRanges = (page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      const env = stores.loginStore.login && stores.loginStore.login.environment
      const role = stores.loginStore.login && stores.loginStore.login.role
      const lab = stores.loginStore.login && stores.loginStore.login.lab
      client
        .query({
          query: GET_ALL_REFERENCERANGES,
          variables: { page, limit, env, role, lab },
        })
        .then((response: any) => {
          console.log({ response })

          resolve(response.data)
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })

  addReferenceRanges = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: ADD_REFERENCERANGES,
          variables,
        })
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })

  deleteReferenceRanges = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      console.log({ variables })
      client
        .mutate({
          mutation: DELETE_RECORD,
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

  versionUpgradeReferenceRanges = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: VERSION_UPGRADE,
          variables,
        })
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })

  duplicateReferenceRanges = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: DUPLICATE_RECORD,
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
          mutation: UPDATE_SINGE_FILED,
          variables,
        })
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })

  checkExitsRecord = (variables) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: CHECK_EXITS_RECORD,
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
