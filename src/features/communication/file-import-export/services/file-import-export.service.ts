/* eslint-disable unicorn/no-array-for-each */
/* eslint-disable unicorn/no-array-reduce */
/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
import {client, ServiceResponse} from '@/core-services/graphql/apollo-client';
import {stores} from '@/stores';
import {
  LIST,
  REMOVE_RECORD,
  UPDATE_RECORD,
  IMPORT_RECORDS,
  FILTER,
  FIND_BY_FIELDS,
  CREATE_RECORD,
  FILTER_BY_FIELDS,
} from './mutation';

export class FileImportExportService {
  listFileImportExport = (transferType = 'IMPORT_FILE', page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: LIST,
          variables: {input: {page, limit, transferType}},
        })
        .then((res: any) => {
          stores.fileImportExportStore.updateFileImportExportList(res.data);
          resolve(res.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  import = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: IMPORT_RECORDS,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  create = (variables: any) =>
    new Promise<any>((resolve, reject) => {
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

  delete = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: REMOVE_RECORD,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  update = (variables: any) =>
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

  filter = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      stores.uploadLoadingFlag(false);
      client
        .mutate({
          mutation: FILTER,
          variables,
        })
        .then((response: any) => {
          if (!response.data.filterClientRegistration.success)
            return this.listFileImportExport();
          stores.clientRegistrationStore.filterClientRegistrationList(
            response.data,
          );
          stores.uploadLoadingFlag(true);
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
          if (!response.data.filterByFieldsFileImportExport.success)
            return this.listFileImportExport();
          stores.fileImportExportStore.updateFileImportExportList({
            fileImportExports: {
              data: response.data.filterByFieldsFileImportExport.data,
              paginatorInfo: {
                count:
                  response.data.filterByFieldsFileImportExport.paginatorInfo
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
      client
        .mutate({
          mutation: FIND_BY_FIELDS,
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
