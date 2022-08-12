/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */

import {client, ServiceResponse} from '@/library/modules/apollo-client';
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

  getPatientReportAndPageBrandingFromLabId = (labId: number) =>
    new Promise<any>((resolve, reject) => {
      this.listPatientReports(labId).then(async res => {
        const {data, success} = res?.getPatientReports;
        if (success) {
          try {
            const getPageBranding =
              await stores.reportSettingStore.pageBrandingService.findByFields({
                input: {
                  filter: {
                    tempCode: data?.reportTemplate.split('-')[0]?.slice(0, -1),
                    brandingTitle: data?.reportTemplate.split('-')[1].slice(1),
                  },
                },
              });
            if (getPageBranding.findByFieldsPageBranding.success)
              resolve({
                patientReport: data,
                pageBranding:
                  getPageBranding.findByFieldsPageBranding?.data.length > 0
                    ? getPageBranding.findByFieldsPageBranding?.data[0]
                    : {},
              });
            else reject({message: 'Not found page branding'});
          } catch (error) {
            reject({message: 'Not found page branding'});
          }
        } else reject({message: 'Not found patient report'});
      });
    });
}
