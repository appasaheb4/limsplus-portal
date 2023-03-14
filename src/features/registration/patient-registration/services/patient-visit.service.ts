/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */

import {client, ServiceResponse} from '@/core-services/graphql/apollo-client';
import {stores} from '@/stores';
import {
  LIST_PATIENT_VISIT,
  REMOVE_PATIENT_VISIT,
  UPDATE_PATIENT_VISIT,
  CREATE_PATIENT_VISIT,
  FILTER_PATIENT_VISIT,
  COUNTER,
  CHECK_EXISTS_PATIENT,
  FILTER_BY_FIELDS_PATIENT_VISIT,
  CHECK_EXISTS_RECORD,
  FILTER_BY_LAB_ID_PATIENT_VISIT,
} from './mutation-pv';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export class PatientVisitService {
  listPatientVisit = (filter: any, page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      const env =
        stores.loginStore.login && stores.loginStore.login.environment;
      const role = stores.loginStore.login && stores.loginStore.login.role;
      client
        .mutate({
          mutation: LIST_PATIENT_VISIT,
          variables: {input: {filter, page, limit, env, role}},
        })
        .then((response: any) => {
          console.log({response});

          stores.patientVisitStore.updatePatientVisitList(response.data);
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  addPatientVisit = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: CREATE_PATIENT_VISIT,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  deletePatientVisit = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: REMOVE_PATIENT_VISIT,
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
          mutation: FILTER_PATIENT_VISIT,
          variables,
        })
        .then((response: any) => {
          if (!response.data.filterPatientVisit.success)
            return this.listPatientVisit({documentType: 'patientVisit'});
          stores.patientVisitStore.filterPatientVisitList(response.data);
          stores.uploadLoadingFlag(true);
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  filterByLabId = (variables?: any) =>
    new Promise<any>((resolve, reject) => {
      stores.uploadLoadingFlag(false);
      client
        .mutate({
          mutation: FILTER_BY_LAB_ID_PATIENT_VISIT,
          variables,
        })
        .then((response: any) => {
          if (!response.data.filterByLabIdPatientVisit.success)
            return alert(response.data.filterByLabIdPatientVisit.message);
          stores.patientVisitStore.updateLabIdList(response.data);
          stores.uploadLoadingFlag(true);
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  sequencingVisitId = () =>
    new Promise<any>((resolve, reject) => {
      const variables = {
        input: {
          filter: {
            id: 'patientVisit_visitId',
          },
        },
      };
      client
        .mutate({
          mutation: COUNTER,
          variables,
        })
        .then((response: any) => {
          stores.patientVisitStore.updatePatientVisit({
            ...stores.patientVisitStore.patientVisit,
            visitId: response.data.counter.data[0]?.seq + 1 || 1,
          });
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  sequencingLabId = () =>
    new Promise<any>((resolve, reject) => {
      const variables = {
        input: {
          filter: {
            id: 'patientVisit_labId',
          },
        },
      };
      client
        .mutate({
          mutation: COUNTER,
          variables,
        })
        .then((response: any) => {
          stores.patientVisitStore.updatePatientVisit({
            ...stores.patientVisitStore.patientVisit,
            labId: response.data.counter.data[0]?.seq + 1 || 100_000,
          });
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  checkExistsPatient = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: CHECK_EXISTS_PATIENT,
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
          mutation: FILTER_BY_FIELDS_PATIENT_VISIT,
          variables,
        })
        .then((response: any) => {
          if (!response.data.filterByFieldsPatientVisit.success)
            return this.listPatientVisit({documentType: 'patientVisit'});
          stores.patientVisitStore.filterPatientVisitList({
            filterPatientVisit: {
              data: response.data.filterByFieldsPatientVisit.data,
              paginatorInfo: {
                count:
                  response.data.filterByFieldsPatientVisit.paginatorInfo.count,
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

  checkExistsRecord = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: CHECK_EXISTS_RECORD,
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
