/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
import * as Models from '../models';
import _ from 'lodash';
import { client, ServiceResponse } from '@/core-services/graphql/apollo-client';
import { SectionService } from '@/features/master/section/services';
import { stores } from '@/stores';
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
  FILTER_BY_FIELDS_SPECIFIC_PLAB,
} from './mutation';

export class MasterPanelService {
  listPanelMaster = (page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: LIST,
          variables: { input: { page, limit } },
        })
        .then((response: any) => {
          stores.masterPanelStore.updatePanelMasterList(response.data);
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  addPanelMaster = (variables: any) =>
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
          stores.masterPanelStore.updateMasterPanel(new Models.MasterPanel({}));
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  versionUpgradePanelMaster = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: VERSION_UPGRADE,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
          stores.masterPanelStore.updateMasterPanel(new Models.MasterPanel({}));
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  duplicatePanelMaster = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: DUPLICATE_RECORD,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
          stores.masterPanelStore.updateMasterPanel(new Models.MasterPanel({}));
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  deletePanelMaster = (variables: any) =>
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
          stores.masterPanelStore.updateMasterPanel(new Models.MasterPanel({}));
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
        .findSectionListByDeptCode({ input: { code } })
        .then(res => {
          stores.masterPanelStore.updateSectionListByDeptCode(res);
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
          if (!response.data.filterPanelMaster.success)
            return this.listPanelMaster();
          stores.masterPanelStore.filterPanelMasterList(response.data);
          stores.uploadLoadingFlag(false);
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
          if (!response.data.filterByFieldsPanelMaster.success)
            return this.listPanelMaster();
          stores.masterPanelStore.filterPanelMasterList({
            filterPanelMaster: {
              data: response.data.filterByFieldsPanelMaster.data,
              paginatorInfo: {
                count:
                  response.data.filterByFieldsPanelMaster.paginatorInfo.count,
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

  filterByFieldsSpecificPLab = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      stores.uploadLoadingFlag(false);
      client
        .mutate({
          mutation: FILTER_BY_FIELDS_SPECIFIC_PLAB,
          variables,
        })
        .then((response: any) => {
          if (!response.data.filterByFieldsSpecificPLabPanelMaster.success)
            return this.listPanelMaster();
          stores.masterPanelStore.filterPanelMasterList({
            filterPanelMaster: {
              data: response.data.filterByFieldsSpecificPLabPanelMaster.data,
              paginatorInfo: {
                count:
                  response.data.filterByFieldsSpecificPLabPanelMaster
                    .paginatorInfo.count,
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
