/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */

import {client, ServiceResponse} from '@/core-services/graphql/apollo-client';
import {stores} from '@/stores';
import {
  LIST_PATIENT_MANAGER,
  REMOVE_PATIENT_MANAGER,
  UPDATE_PATIENT_MANAGER,
  FILTER_PATIENT_MANAGER,
  COUNTER_PATIENT_MANAGER_PID,
  CHECK_EXISTS_PATIENT,
  FILTER_BY_FIELDS_PATIENT_MANAGER,
  CREATE_PATIENT_MANAGER,
  CREATE_BY_FILE_IMPORT_EXPORT,
  FILTER_OPTION_LIST,
  GET_PATIENT_REG_RECORDS,
} from './mutation-pm';

export class PatientManagerService {
  listPatientManager = (filter: any, page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      const env =
        stores.loginStore.login && stores.loginStore.login.environment;
      const role = stores.loginStore.login && stores.loginStore.login.role;
      client
        .mutate({
          mutation: LIST_PATIENT_MANAGER,
          variables: {input: {filter, page, limit, env, role}},
        })
        .then((response: any) => {
          stores.patientManagerStore.updatePatientManagerList(response.data);
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  addPatientManager = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: CREATE_PATIENT_MANAGER,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  createPatientManagerByFileImportExport = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: CREATE_BY_FILE_IMPORT_EXPORT,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  deletePatientManager = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: REMOVE_PATIENT_MANAGER,
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
          mutation: UPDATE_PATIENT_MANAGER,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  updateImage = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: UPDATE_PATIENT_MANAGER,
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
          mutation: FILTER_PATIENT_MANAGER,
          variables,
        })
        .then((response: any) => {
          if (!response.data.filterPatientManager.success)
            return this.listPatientManager({documentType: 'patientManager'});
          stores.patientManagerStore.filterPatientManagerList(response.data);
          stores.uploadLoadingFlag(true);
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  sequencingPid = () =>
    new Promise<any>((resolve, reject) => {
      const variables = {
        input: {
          filter: {
            id: 'patientManager_pId',
          },
        },
      };
      client
        .mutate({
          mutation: COUNTER_PATIENT_MANAGER_PID,
          variables,
        })
        .then((response: any) => {
          stores.patientManagerStore.updatePatientManager({
            ...stores.patientManagerStore.patientManger,
            pId: response.data.counter.data[0]?.seq + 1 || 1_000_000_000,
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
          mutation: FILTER_BY_FIELDS_PATIENT_MANAGER,
          variables,
        })
        .then((response: any) => {
          if (!response.data.filterByFieldsPatientManager.success)
            return this.listPatientManager({documentType: 'patientManager'});
          stores.patientManagerStore.filterPatientManagerList({
            filterPatientManager: {
              data: response.data.filterByFieldsPatientManager.data,
              paginatorInfo: {
                count:
                  response.data.filterByFieldsPatientManager.paginatorInfo
                    .count,
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

  getFilterOptionList = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: FILTER_OPTION_LIST,
          variables,
        })
        .then((response: any) => {
          stores.patientRegistrationStore.updateFilterOptionList(response.data);
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  getPatientRegRecords = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: GET_PATIENT_REG_RECORDS,
          variables,
        })
        .then((res: any) => {
          if (res.data.getPatientRegRecords?.success) {
            const {records} = res.data.getPatientRegRecords;
            // patient manager
            stores.patientManagerStore.updatePatientManagerList({
              patientManagers: {
                data: records?.patientManager,
                paginatorInfo: {
                  count: records?.patientManager?.length,
                },
              },
            });
            // patient visit
            stores.patientVisitStore.updatePatientVisitList({
              patientVisits: {
                data: records?.patientVisit,
                paginatorInfo: {
                  count: records?.patientVisit?.length,
                },
              },
            });
            // patient order
            stores.patientOrderStore.updatePatientOrderList({
              patientOrders: {
                data: records?.patientOrder,
                paginatorInfo: {
                  count: records?.patientOrder?.length,
                },
              },
            });
            // patient test
            stores.patientTestStore.updateTestList({
              patientTests: {
                data: records?.patientTest,
                paginatorInfo: {
                  count: records?.patientTest?.length,
                },
              },
            });
            // patient result
            stores.patientResultStore.updatePatientResultByLabId({
              patientResult: {
                data: records?.patientResult,
                paginatorInfo: {
                  count: records?.patientResult?.length,
                },
              },
            });
            // patient sample
            stores.patientSampleStore.updatePatientSampleList({
              patientSamples: {
                data: records?.patientSample,
                paginatorInfo: {
                  count: records?.patientSample?.length,
                },
              },
            });
          }
          resolve(res.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });
}
