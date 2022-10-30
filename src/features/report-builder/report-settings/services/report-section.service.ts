/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */

import {client, ServiceResponse} from '@/core-services/graphql/apollo-client';
import {stores} from '@/stores';
import {LIST_REPORT_SECTION} from './mutation-rep-sec';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export class ReportSectionService {
  listReportSection = () =>
    new Promise<any>((resolve, reject) => {
      client
        .query({
          query: LIST_REPORT_SECTION,
        })
        .then((response: any) => {
          stores.reportSettingStore.updateReportSectionList(response.data);
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });
}
