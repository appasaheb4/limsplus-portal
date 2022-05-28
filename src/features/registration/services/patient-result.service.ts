/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */

import {client, ServiceResponse} from '@/library/modules/apollo-client';
import {stores} from '@/stores';
import {
  LIST_PATIENT_RESULT,
  LIST_PATIENT_RESULT_WITH_LABID,
  FILTER_PATIENT_RESULT,
  FILTER_PATIENT_RESULT_WITH_LABID,
  FILTER_BY_FIELDS,
} from './mutation-pr';

export class PatientResultService {
  listPatientResultWithLabId = (filter?: any, page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      const env =
        stores.loginStore.login && stores.loginStore.login.environment;
      const role = stores.loginStore.login && stores.loginStore.login.role;
      client
        .mutate({
          mutation: LIST_PATIENT_RESULT_WITH_LABID,
          variables: {input: {filter, page, limit, env, role}},
        })
        .then((response: any) => {
          stores.patientResultStore.updatePatientResultListWithLabId(
            response.data,
          );
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  listPatientResult = (filter?: any, page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      const env =
        stores.loginStore.login && stores.loginStore.login.environment;
      const role = stores.loginStore.login && stores.loginStore.login.role;
      client
        .mutate({
          mutation: LIST_PATIENT_RESULT,
          variables: {input: {filter, page, limit, env, role}},
        })
        .then((response: any) => {
          stores.patientResultStore.updatePatientResult(response.data);
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  filterWithLabId = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      stores.uploadLoadingFlag(false);
      client
        .mutate({
          mutation: FILTER_PATIENT_RESULT_WITH_LABID,
          variables,
        })
        .then((response: any) => {
          if (!response.data.filterPatientResultWithLabId.success)
            return this.listPatientResultWithLabId({
              labId: variables.input.filter?.labId,
            });
          stores.patientResultStore.filterPatientResultListWithLabid(
            response.data,
          );
          stores.uploadLoadingFlag(true);
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });
  filter = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      stores.uploadLoadingFlag(false);
      client
        .mutate({
          mutation: FILTER_PATIENT_RESULT,
          variables,
        })
        .then((response: any) => {
          if (!response.data.filterPatientResultWithLabId.success)
            return this.listPatientResult();
          stores.patientResultStore.filterPatientResultList(response.data);
          stores.uploadLoadingFlag(true);
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  filterByFields = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      stores.uploadLoadingFlag(false);
      client
        .mutate({
          mutation: FILTER_BY_FIELDS,
          variables,
        })
        .then((response: any) => {
          if (!response.data.filterByFieldsPatientResult.success)
            return this.listPatientResult();
          stores.patientResultStore.filterPatientResultList({
            filterPatientResult: {
              patientResultList:
                response.data.filterByFieldsPatientResult.patientResultList,
              paginatorInfo: {
                count:
                  response.data.filterByFieldsPatientResult.paginatorInfo.count,
              },
            },
          });
          stores.uploadLoadingFlag(true);
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });
}
