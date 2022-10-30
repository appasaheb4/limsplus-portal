/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */

import {client, ServiceResponse} from '@/core-services/graphql/apollo-client';
import {stores} from '@/stores';
import {
  FONT_SETTING_LIST,
  CREATE_FONT_SETTING,
  REMOVE_FONT_SETTING,
  FIND_BY_FIELDS,
  FILTER_BY_FIELDS,
} from './mutation-font-setting';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export class FontSettingService {
  listFontSetting = (page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      const environment =
        stores.loginStore.login && stores.loginStore.login.environment;
      const role = stores.loginStore.login && stores.loginStore.login.role;
      client
        .mutate({
          mutation: FONT_SETTING_LIST,
          variables: {input: {page, limit, environment, role}},
        })
        .then((response: any) => {
          stores.reportSettingStore.updateFontSettingList(response.data);
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  addFontSetting = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: CREATE_FONT_SETTING,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  deleteFontSetting = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: REMOVE_FONT_SETTING,
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
          if (!response.data.filterByFieldsPageSetting.success)
            return this.listFontSetting();
          stores.reportSettingStore.filterFontSettingList({
            filterByFieldsFontSetting: {
              data: response.data.filterByFieldsFontSetting.data,
              paginatorInfo: {
                count:
                  response.data.filterByFieldsFontSetting.paginatorInfo.count,
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
