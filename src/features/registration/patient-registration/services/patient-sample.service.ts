/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */

import { client, ServiceResponse } from '@/core-services/graphql/apollo-client';
import { stores } from '@/stores';
import {
  LIST_PATIENT_SAMPLE,
  FILTER_PATIENT_SAMPLE,
  UPDATE_RECORD,
} from './mutation-ps';

export class PatientSampleService {
  listPatientSample = (filter?: any, page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      const env =
        stores.loginStore.login && stores.loginStore.login.environment;
      const role = stores.loginStore.login && stores.loginStore.login.role;
      client
        .mutate({
          mutation: LIST_PATIENT_SAMPLE,
          variables: { input: { filter, page, limit, env, role } },
        })
        .then((response: any) => {
          stores.patientSampleStore.updatePatientSampleList(response.data);
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
          mutation: FILTER_PATIENT_SAMPLE,
          variables,
        })
        .then((response: any) => {
          if (!response.data.filterPatientResult.success)
            return this.listPatientSample();
          stores.patientSampleStore.filterPatientSampleList(response.data);
          stores.uploadLoadingFlag(true);
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  updateFields = (variables: any) =>
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
}
