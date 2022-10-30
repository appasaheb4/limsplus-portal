/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
import {client, ServiceResponse} from '@/core-services/graphql/apollo-client';
import {SectionService} from '@/features/master/section/services';
import {stores} from '@/stores';
import _ from 'lodash';
import {
  LIST,
  CREATE_RECORD,
  REMOVE_RECORD,
  UPDATE_RECORD,
  VERSION_UPGRADE,
  DUPLICATE_RECORD,
  CHECK_EXISTS_RECORD,
  FILTER,
  FILTER_BY_FIELDS,
  FIND_BY_FIELDS,
} from './mutation';

import * as Model from '../models';

export class TestMasterService {
  listTestMaster = (page = 0, limit = 10) =>
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
          stores.testMasterStore.updateTestMasterList(response.data);
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });
  addTestMaster = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      const input = _.omitBy(
        variables.input,
        v => _.isUndefined(v) || _.isNull(v) || v === '',
      );
      variables = {
        ...variables,
        input,
      };
      client
        .mutate({
          mutation: CREATE_RECORD,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
          stores.testMasterStore.updateTestMaster(new Model.TestMaster({}));
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  versionUpgradeTestMaster = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: VERSION_UPGRADE,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
          stores.testMasterStore.updateTestMaster(new Model.TestMaster({}));
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  duplicateTestMaster = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: DUPLICATE_RECORD,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
          stores.testMasterStore.updateTestMaster(new Model.TestMaster({}));
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  deleteTestMaster = (variables: any) =>
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

  updateFileds = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: UPDATE_RECORD,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
          stores.testMasterStore.updateTestMaster(new Model.TestMaster({}));
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  checkExitsLabEnvCode = (variables: any) =>
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

  findSectionListByDeptCode = (code: string) =>
    new Promise<any>(resolve => {
      new SectionService()
        .findSectionListByDeptCode({input: {code}})
        .then(res => {
          stores.testMasterStore.updateSectionListByDeptCode(res);
          resolve(res);
        });
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
          if (!response.data.filterTestMaster.success)
            return this.listTestMaster();
          stores.testMasterStore.filterTestMasterList(response.data);
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
          if (!response.data.filterByFieldsTestMaster.success)
            return this.listTestMaster();
          stores.testMasterStore.filterTestMasterList({
            filterTestMaster: {
              data: response.data.filterByFieldsTestMaster.data,
              paginatorInfo: {
                count:
                  response.data.filterByFieldsTestMaster.paginatorInfo.count,
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
