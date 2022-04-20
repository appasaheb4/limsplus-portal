/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */

import {client, ServiceResponse} from '@/library/modules/apolloClient';
import {stores} from '@/stores';
import {
  LIST_PATIENT_TEST,
  REMOVE_PATIENT_TEST,
  UPDATE_PATIENT_VISIT,
  CREATE_PATIENT_TEST,
  FILTER_PATIENT_TEST,
  SEQUENCING_PATIENT_TEST_TESTID,
  CHECK_EXISTS_PATIENT,
  FILTER_BY_FIELDS_PATIENT_TEST,
  GET_PANEL_LIST,
} from './mutation-PT';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export class PatientTestService {
  listPatientTest = (page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      const env =
        stores.loginStore.login && stores.loginStore.login.environment;
      const role = stores.loginStore.login && stores.loginStore.login.role;
      client
        .mutate({
          mutation: LIST_PATIENT_TEST,
          variables: {input: {page, limit, env, role}},
        })
        .then((response: any) => {
          stores.patientTestStore.updateTestList(response.data);
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  addPatientTest = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: CREATE_PATIENT_TEST,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  deletePatientTest = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: REMOVE_PATIENT_TEST,
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
          mutation: FILTER_PATIENT_TEST,
          variables,
        })
        .then((response: any) => {
          if (!response.data.filterPatientTest.success)
            return this.listPatientTest();
          stores.patientTestStore.filterTestList(response.data);
          stores.uploadLoadingFlag(true);
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  sequencingTestId = () =>
    new Promise<any>((resolve, reject) => {
      const variables = {
        input: {
          filter: {
            _id: 'patientTest_TestId',
            collectionName: 'patientregistrations',
            documentType: 'patientTest',
          },
        },
      };
      client
        .mutate({
          mutation: SEQUENCING_PATIENT_TEST_TESTID,
          variables,
        })
        .then((response: any) => {
          stores.patientTestStore.updateTest({
            ...stores.patientTestStore.patientTest,
            testId: response.data.sequencing.data[0]?.seq + 1 || 1,
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
          mutation: FILTER_BY_FIELDS_PATIENT_TEST,
          variables,
        })
        .then((response: any) => {
          if (!response.data.filterByFieldsPatientVisit.success)
            return this.listPatientTest();
          stores.patientOrderStore.filterPatientOrderList({
            filterPatientOrder: {
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

  getPanelList = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: GET_PANEL_LIST,
          variables,
        })
        .then((response: any) => {
          stores.patientTestStore.updateTest({
            ...stores.patientTestStore.patientTest,
            panelList:
              response.data.getPatientTestPanelListByPanelCodes.panelList,
          });
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });
}
