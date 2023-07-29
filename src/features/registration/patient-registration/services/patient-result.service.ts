/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
import _ from 'lodash';
import {client, ServiceResponse} from '@/core-services/graphql/apollo-client';
import {stores} from '@/stores';
import {
  LIST_PATIENT_RESULT,
  LIST_PATIENT_RESULT_WITH_LABID,
  FILTER_PATIENT_RESULT,
  FILTER_PATIENT_RESULT_WITH_LABID,
  FILTER_BY_FIELDS,
  PATIENT_LIST_FOR_GENERAL_RES_ENTRY,
  GET_PATIENT_RESULT_DISTINCT,
  UPDATE_RECORD,
  UPDATE_BY_FIELDS_RECORD,
  RELOAD_RECORD,
  PATIENT_RESULT_RECORDS,
  UPDATE_FIELDS_BY_IDS,
  UPDATE_STATUS_RECORD,
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
          // stores.patientResultStore.updatePatientResultListWithLabId(
          //   response.data,
          // );
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  listPatientResult = (filter, page = 0, limit = 10) =>
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

  listPatientResultNotAutoUpdate = (filter, page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      const env =
        stores.loginStore.login && stores.loginStore.login.environment;
      const role = stores.loginStore.login && stores.loginStore.login.role;
      client
        .mutate({
          mutation: PATIENT_RESULT_RECORDS,
          variables: {input: {filter, page, limit, env, role}},
        })
        .then((response: any) => {
          stores.patientResultStore.updatePatientResultNotAutoUpdate(
            response.data,
          );
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
            return this.listPatientResult({
              pLab: stores.loginStore.login?.lab,
              // resultStatus: 'P',
              // testStatus: 'P',
              finishResult: 'P',
            });
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
            return this.listPatientResult({
              pLab: stores.loginStore.login?.lab,
              // resultStatus: 'P',
              // testStatus: 'P',
              finishResult: 'P',
            });
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

  patientListForGeneralResultEntry = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      stores.uploadLoadingFlag(false);
      const filter = _.pickBy(
        variables.input.filter,
        v => v !== null && v !== undefined && v !== '',
      );
      client
        .mutate({
          mutation: PATIENT_LIST_FOR_GENERAL_RES_ENTRY,
          variables: {
            ...variables,
            input: {filter},
          },
        })
        .then((response: any) => {
          if (!response.data.patientResultListForGenResEntry.success) {
            return this.listPatientResultNotAutoUpdate({
              pLab: stores.loginStore.login?.lab,
              finishResult: 'P',
            });
          } else {
            let data: any =
              response.data.patientResultListForGenResEntry.patientResultList;
            data = data.map(item => {
              return {
                ...item,
                testReportOrder: item?.extraData?.testReportOrder,
                analyteReportOrder: item?.extraData?.analyteReportOrder,
              };
            });
            data = _.sortBy(data, [
              'labId',
              'testReportOrder',
              'analyteReportOrder',
            ]);
            stores.patientResultStore.patientResultListForGeneralResEntry({
              patientResultListForGenResEntry: {
                patientResultList: data,
                paginatorInfo: {
                  count:
                    response.data.patientResultListForGenResEntry.paginatorInfo
                      .count,
                },
              },
            });
          }
          stores.uploadLoadingFlag(true);
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  getPatientResultDistinct = () =>
    new Promise<any>((resolve, reject) => {
      client
        .query({
          query: GET_PATIENT_RESULT_DISTINCT,
        })
        .then((response: any) => {
          stores.patientResultStore.updateDistinctPatientResult(response.data);
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  updateSingleFiled = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: UPDATE_RECORD,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  updateByFields = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: UPDATE_BY_FIELDS_RECORD,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  reloadRecordByPatientOrder = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: RELOAD_RECORD,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  updateFinishResultStatus = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: UPDATE_FIELDS_BY_IDS,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  updateStatus = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: UPDATE_STATUS_RECORD,
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
