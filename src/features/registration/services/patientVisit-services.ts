/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */

import { client, ServiceResponse } from "@lp/library/modules/apolloClient"
import { stores } from "@lp/stores"
import {
  LIST_PATIENT_VISIT,
  REMOVE_PATIENT_MANAGER,
  UPDATE_PATIENT_MANAGER,
  CREATE_PATIENT_VISIT,
  FILTER_PATIENT_VISIT,
  SEQUENCING_PATIENT_VISIT_VISITID,
  CHECK_EXISTS_PATIENT,
  FILTER_BY_FIELDS_PATIENT_MANAGER,
} from "./mutation-PV"

export class PatientVisitService {
  listPatientVisit = (filter: any, page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      const env = stores.loginStore.login && stores.loginStore.login.environment
      const role = stores.loginStore.login && stores.loginStore.login.role
      client
        .mutate({
          mutation: LIST_PATIENT_VISIT,
          variables: { input: { filter, page, limit, env, role } },
        })
        .then((response: any) => {
          stores.patientVisitStore.updatePatientVisitList(response.data)
          resolve(response.data)
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })

  addPatientVisit = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      console.log({variables});
      
      client
        .mutate({
          mutation: CREATE_PATIENT_VISIT,
          variables,
        })
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })   

  deletePatientManager = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: REMOVE_PATIENT_MANAGER,
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
          mutation: UPDATE_PATIENT_MANAGER,
          variables,
        })
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })

  updateImage = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      console.log({ variables })
      client
        .mutate({
          mutation: UPDATE_PATIENT_MANAGER,
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
          mutation: FILTER_PATIENT_VISIT,
          variables,
        })
        .then((response: any) => {
          if (!response.data.filterPatientManager.success)
            return this.listPatientVisit({ documentType: "patientVisit" })
          stores.patientManagerStore.filterPatientManagerList(response.data)
          stores.uploadLoadingFlag(true)
          resolve(response.data)
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })

  sequencingVisitId = () =>
    new Promise<any>((resolve, reject) => {
      const variables = {
        input: {
          filter: {
            _id: "visitId",
            collectionName: "patientregistrations",
            documentType: "patientVisit",
          },
        },
      }
      client
        .mutate({
          mutation: SEQUENCING_PATIENT_VISIT_VISITID,
          variables,
        })
        .then((response: any) => {
          stores.patientVisitStore.updatePatientVisit({
            ...stores.patientVisitStore.patientVisit,
            visitId: response.data.sequencing.data[0]?.seq + 1 || 1,
          })
          resolve(response.data)
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })

  checkExistsPatient = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: CHECK_EXISTS_PATIENT,
          variables,
        })
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })

  filterByFields = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      stores.uploadLoadingFlag(false)
      client
        .mutate({
          mutation: FILTER_BY_FIELDS_PATIENT_MANAGER,
          variables,
        })
        .then((response: any) => {
          if (!response.data.filterByFieldsPatientManager.success)
            return this.listPatientVisit({ documentType: "patientVisit" })
          stores.patientManagerStore.filterPatientManagerList({
            filterPatientManager: {
              data: response.data.filterByFieldsPatientManager.data,
              paginatorInfo: {
                count:
                  response.data.filterByFieldsPatientManager.paginatorInfo.count,
              },
            },
          })
          stores.uploadLoadingFlag(true)
          resolve(response.data)
        })
        .catch((error) =>
          reject(new ServiceResponse<any>(0, error.message, undefined))
        )
    })
}
