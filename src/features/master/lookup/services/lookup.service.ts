/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */

import {client, ServiceResponse} from '@/library/modules/apollo-client';
import {stores} from '@/stores';
import {
  LOOKUPITEM_BY_PATH,
  LOOKUPITEM_BY_PATH_N_FIELD,
  LIST,
  CREATE_DOCUMENT_RECORD,
  REMOVE_DOCUMENT_RECORD,
  UPDATE_RECORD,
  GENERAL_SETTINGS_UPDATE,
  FILTER,
} from './mutation';
import * as Model from '../models';

export class LookupService {
  listLookup = (page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      const env =
        stores.loginStore.login && stores.loginStore.login.environment;
      const role = stores.loginStore.login && stores.loginStore.login.role;
      client
        .mutate({
          mutation: LIST,
          variables: {input: {page, limit, env, role}},
        })
        .then((response: any) => {
          stores.lookupStore.updateLookupList(response.data);
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  addLookup = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: CREATE_DOCUMENT_RECORD,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
          stores.lookupStore.updateLookup(new Model.Lookup({}));
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  deleteLookup = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: REMOVE_DOCUMENT_RECORD,
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
          mutation: UPDATE_RECORD,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
          stores.lookupStore.updateLookup(new Model.Lookup({}));
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });
  generalSettingsUpdate = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: GENERAL_SETTINGS_UPDATE,
          variables: variables,
        })
        .then((response: any) => {
          resolve(response.data);
          // stores.lookupStore.updateLookup(new Model.({}))
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  lookupItemsByPath = (path: string) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: LOOKUPITEM_BY_PATH,
          variables: {path},
        })
        .then((response: any) => {
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  lookupItemsByPathNField = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: LOOKUPITEM_BY_PATH_N_FIELD,
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
          mutation: FILTER,
          variables,
        })
        .then((response: any) => {
          if (!response.data.filterLookups.success) return this.listLookup();
          stores.lookupStore.filterLookupList(response.data);
          stores.uploadLoadingFlag(true);
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });
}
