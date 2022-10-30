/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
import * as Models from '../models';
import {client, ServiceResponse} from '@/core-services/graphql/apollo-client';
import {stores} from '@/stores';

import {
  LIST,
  REMOVE_RECORDS,
  CREATE_RECORD,
  UPDATE_RECORD,
  CHECK_EXISTS_RECORD,
  FILTER,
  LIBRARYS_BY_CODE,
  FILTER_BY_FIELDS,
  FIND_BY_FIELDS,
} from './mutation';

export class MasterAnalyteService {
  listLibrary = (page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      const env =
        stores.loginStore.login && stores.loginStore.login.environment;
      const role = stores.loginStore.login && stores.loginStore.login.role;
      const lab = stores.loginStore.login && stores.loginStore.login.lab;
      client
        .mutate({
          mutation: LIST,
          variables: {input: {page, limit, env, role, lab}},
        })
        .then((response: any) => {
          stores.libraryStore.updateLibraryList(response.data);
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });
  addLibrary = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      console.log({variables});

      client
        .mutate({
          mutation: CREATE_RECORD,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });
  deleteLibrary = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: REMOVE_RECORDS,
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
          stores.libraryStore.updateLibrary(new Models.Library({}));
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  checkExistsRecords = (variables: any) =>
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

  filter = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      stores.uploadLoadingFlag(false);
      client
        .mutate({
          mutation: FILTER,
          variables,
        })
        .then((response: any) => {
          if (!response.data.filterLibrarys.success) return this.listLibrary();
          stores.libraryStore.filterLibraryList(response.data);
          stores.uploadLoadingFlag(true);
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  librarysByCode = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: LIBRARYS_BY_CODE,
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
          if (!response.data.filterByFieldsLibrarys.success)
            return this.listLibrary();
          stores.libraryStore.filterLibraryList({
            filterLibrarys: {
              data: response.data.filterByFieldsLibrarys.data,
              paginatorInfo: {
                count: response.data.filterByFieldsLibrarys.paginatorInfo.count,
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
