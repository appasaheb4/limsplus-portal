/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */

import {client, ServiceResponse} from '@/core-services/graphql/apollo-client';
import {stores} from '@/stores';
import {
  SECTION_SETTING_LIST,
  CREATE_SECTION_SETTING,
  REMOVE_SECTION_SETTING,
  FILTER_BY_FIELDS,
  FIND_BY_FIELDS,
} from './mutation-section-setting';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export class SectionSettingService {
  listSectionSetting = (page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      const environment =
        stores.loginStore.login && stores.loginStore.login.environment;
      const role = stores.loginStore.login && stores.loginStore.login.role;
      client
        .mutate({
          mutation: SECTION_SETTING_LIST,
          variables: {input: {page, limit, environment, role}},
        })
        .then((response: any) => {
          stores.reportSettingStore.updateSectionSettingList(response.data);
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  addSectionSetting = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: CREATE_SECTION_SETTING,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  deleteSectionSetting = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: REMOVE_SECTION_SETTING,
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
          mutation: FILTER_BY_FIELDS,
          variables,
        })
        .then((response: any) => {
          if (!response.data.filterByFieldsSectionSetting.success)
            return this.listSectionSetting();
          stores.reportSettingStore.filterSectionSettingList({
            filterSectionSettings: {
              data: response.data.filterByFieldsSectionSetting.data,
              paginatorInfo: {
                count:
                  response.data.filterByFieldsSectionSetting.paginatorInfo
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
}
