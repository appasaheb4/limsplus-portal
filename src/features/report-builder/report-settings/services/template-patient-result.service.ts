/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 * @developer www.github.com/appasaheb4
 */

import {client, ServiceResponse} from '@/core-services/graphql/apollo-client';
import {stores} from '@/stores';
import {
  TEMPLATE_PATIENT_RESULT_LIST,
  CREATE_TEMPLATE_PATIENT_RESULT,
  REMOVE_TEMPLATE_PATIENT_RESULT,
  UPDATE_TEMPLATE_PATIENT_RESULT,
  FIND_BY_FIELDS,
  FILTER_BY_FIELDS,
  TEMP_PATIENT_RESULT_BY_TEMP_CODES,
} from './mutation-template-patient-result.service';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export class TemplatePatientResultService {
  listTemplatePatientResult = (page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      const environment =
        stores.loginStore.login && stores.loginStore.login.environment;
      const role = stores.loginStore.login && stores.loginStore.login.role;
      client
        .mutate({
          mutation: TEMPLATE_PATIENT_RESULT_LIST,
          variables: {input: {page, limit, environment, role}},
        })
        .then((response: any) => {
          stores.reportSettingStore.updateTemplatePatientResultList(
            response.data,
          );
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  addTemplatePatientResult = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: CREATE_TEMPLATE_PATIENT_RESULT,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  removeTemplatePatientResult = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: REMOVE_TEMPLATE_PATIENT_RESULT,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  update = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: UPDATE_TEMPLATE_PATIENT_RESULT,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  findByFields = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      stores.uploadLoadingFlag(false);
      client
        .mutate({
          mutation: FIND_BY_FIELDS,
          variables,
        })
        .then((response: any) => {
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
          if (!response.data.filterByFieldsTemplatePatientResult.success)
            return this.listTemplatePatientResult();
          stores.reportSettingStore.updateTemplatePatientResultList({
            templatePatientResults: {
              data: response.data.filterByFieldsTemplatePatientResult.data,
              paginatorInfo: {
                count:
                  response.data.filterByFieldsTemplatePatientResult
                    .paginatorInfo.count,
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

  getTempPatientResultListByTempCodes = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: TEMP_PATIENT_RESULT_BY_TEMP_CODES,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });
}
