/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
import { client, ServiceResponse } from "@lp/library/modules/apolloClient"
import * as Models from "../models"
import { GET_ALL_ENVIRONMENT } from "./query"
import { ADD_ENVIRONMENT, DELETE_ENVIRONMENT, UPDATE_SINGEL } from "./mutation"
import { stores } from "@lp/stores"

export class EnvironmentService {
  listEnvironment = (filter: any, page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      client
        .query({
          query: GET_ALL_ENVIRONMENT,
          variables: { filter, page, limit },
        })
        .then((response: any) => {
          stores.environmentStore.updatEnvironmentVariableList(
            response.data.getAllEnvironment.data
          )
          stores.environmentStore.updateEnvironmentVariableCount(
            response.data.getAllEnvironment.getAllEnvironment
          )
          resolve(response.data)
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })

  addEnvironment = (variables: {
    input: Models.EnvironmentVariable | Models.EnvironmentSettings
  }) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: ADD_ENVIRONMENT,
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
          mutation: DELETE_ENVIRONMENT,
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
          mutation: UPDATE_SINGEL,
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
