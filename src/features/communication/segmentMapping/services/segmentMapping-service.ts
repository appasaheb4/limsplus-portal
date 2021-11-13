/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
import { client, ServiceResponse } from "@lp/library/modules/apolloClient"
import { stores } from "@lp/stores"
import {
  LIST,
  CREATE_RECORD,
  REMOVE_RECORD,
  UPDATE_RECORD,
  IMPORT_RECORDS,
} from "./mutation"
import {MappingValues} from '../../models'

export class SegmentMappingService {
  listSegmentMapping = (page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      const env = stores.loginStore.login && stores.loginStore.login.environment
      const role = stores.loginStore.login && stores.loginStore.login.role
      client
        .mutate({
          mutation: LIST,
          variables: { input: { page, limit, env, role } },
        })
        .then((response: any) => {
          const data = response.data.segmentMappings.data
          const group = data.reduce((r: any, a: any) => {
            r[a.segments] = [...(r[a.segments] || []), a]
            return r
          }, {})
          const entries = Object.entries(group)
          //console.log({ group, entries })
          const values: any = []
          for (const groupSegment of entries) {
            const segmentList: any = groupSegment[1]
            segmentList.sort((a, b) => {
              return a.field_no - b.field_no
            })
            segmentList.forEach((item) => {
              values.push(item)
            })
          }
          stores.segmentMappingStore.updateListSegmentMapping({
            segmentMappings: {
              ...response.data.segmentMappings,
              data: values,
            },
          })
          resolve(response.data)
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })

  mappingList = (page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      const env = stores.loginStore.login && stores.loginStore.login.environment
      const role = stores.loginStore.login && stores.loginStore.login.role
      client
        .mutate({
          mutation: LIST,
          variables: { input: { page, limit, env, role } },
        })
        .then((response: any) => {
          const data = response.data.segmentMappings.data
          const mapping: any[] = []
          const values: MappingValues[] = []
          data.forEach((item: any) => {
            if (
              item.equipmentType === "ERP" &&
              (item.dataFlowFrom === "Host &gt; LIS" ||
                item.dataFlowFrom === "Host > LIS")
            ) {
              values.push({
                segments: item.segments,
                field: `${item.segments?.toLowerCase()}.${item.element_name
                  ?.toLowerCase()
                  .replaceAll(" ", "_")}`,
                component: [Number(item.field_no), 1],
                field_no: Number(item.field_no),
                default: "",
              })
            }
          })
          const group = values.reduce((r: any, a: any) => {
            r[a.segments] = [...(r[a.segments] || []), a]
            return r
          }, {})
          //console.log({ group })
          const entries = Object.entries(group)
          entries.forEach((item: any) => {
            mapping.push({
              [item[0].toLowerCase() || ""]: { values: item[1] },
            })
          })  
          stores.segmentMappingStore.updateMappingList({
            segmentMappings: { ...response.data.segmentMappings, data: mapping },
          })
          resolve(response.data)
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })

  importSegmentMapping = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: IMPORT_RECORDS,
          variables,
        })
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })

  addSegmentMapping = (variables: any) =>
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

  deleteSegmentMapping = (variables: any) =>
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
      console.log({ variables })

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
