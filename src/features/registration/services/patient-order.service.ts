/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */

import {client, ServiceResponse} from '@/library/modules/apollo-client';
import {stores} from '@/stores';
import {
  LIST_PATIENT_ORDER,
  REMOVE_PATIENT_ORDER,
  UPDATE_PATIENT_VISIT,
  CREATE_PATIENT_ORDER,
  FILTER_PATIENT_ORDER,
  COUNTER_PATIENT_ORDER_ORDERID,
  CHECK_EXISTS_PATIENT_ORDER,
  FILTER_BY_FIELDS_PATIENT_ORDER,
  GET_PACKAGES_LIST,
} from './mutation-po';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export class PatientOrderService {
  listPatientOrder = (filter: any, page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      const env =
        stores.loginStore.login && stores.loginStore.login.environment;
      const role = stores.loginStore.login && stores.loginStore.login.role;
      client
        .mutate({
          mutation: LIST_PATIENT_ORDER,
          variables: {input: {filter, page, limit, env, role}},
        })
        .then((response: any) => {
          stores.patientOrderStore.updatePatientOrderList(response.data);
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  addPatientOrder = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: CREATE_PATIENT_ORDER,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  deletePatientOrder = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: REMOVE_PATIENT_ORDER,
          variables,
        })
        .then((response: any) => {
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
          mutation: UPDATE_PATIENT_VISIT,
          variables,
        })
        .then((response: any) => {
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
          mutation: FILTER_PATIENT_ORDER,
          variables,
        })
        .then((response: any) => {
          if (!response.data.filterPatientOrder.success)
            return this.listPatientOrder({documentType: 'patientOrder'});
          stores.patientOrderStore.filterPatientOrderList(response.data);
          stores.uploadLoadingFlag(true);
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  sequencingOrderId = () =>
    new Promise<any>((resolve, reject) => {
      const variables = {
        input: {
          filter: {
            id: 'patientOrder_orderId',
          },
        },
      };
      client
        .mutate({
          mutation: COUNTER_PATIENT_ORDER_ORDERID,
          variables,
        })
        .then((response: any) => {
          stores.patientOrderStore.updatePatientOrder({
            ...stores.patientOrderStore.patientOrder,
            orderId: response.data.counter.data[0]?.seq + 1 || 1,
          });
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  checkExistsRecords = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: CHECK_EXISTS_PATIENT_ORDER,
          variables,
        })
        .then((response: any) => {
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
          mutation: FILTER_BY_FIELDS_PATIENT_ORDER,
          variables,
        })
        .then((response: any) => {
          if (!response.data.filterByFieldsPatientOrder.success)
            return this.listPatientOrder({documentType: 'patientOrder'});
          stores.patientOrderStore.filterPatientOrderList({
            filterPatientOrder: {
              data: response.data.filterByFieldsPatientOrder.data,
              paginatorInfo: {
                count:
                  response.data.filterByFieldsPatientOrder.paginatorInfo.count,
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

  getPackageList = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: GET_PACKAGES_LIST,
          variables,
        })
        .then((response: any) => {
          console.log({response});

          stores.patientOrderStore.updatePackageList(
            response.data.getPatientOrderPackagesList.packageList,
          );
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });
}
