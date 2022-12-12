/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */

import {client, ServiceResponse} from '@/core-services/graphql/apollo-client';
import {PATIENT_REPORT_LIST} from './mutation-generate-reports';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import {stores} from '@/stores';
dayjs.extend(utc);

export class GenerateReportsService {
  listPatientReports = labId =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: PATIENT_REPORT_LIST,
          variables: {input: {labId}},
        })
        .then((response: any) => {
          //stores.generateReportsStore.updatePatientReports(response.data);
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });
}
