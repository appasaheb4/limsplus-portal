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
  REMOVE_RECORD,
  CREATE_RECORD,
  UPDATE_RECORD,
  EXISTS_RECORD,
  FILTER,
  FILTER_BY_FIELDS,
  FIND_BY_FIELDS,
  GET_SALES_HIERARCHYLIST,
} from './mutation';

export class SalesTeamService {
  listSalesTeam = (page = 0, limit = 10) =>
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
          stores.salesTeamStore.updateSalesTeamList(response.data);
          resolve(response.data);
        })
        .catch(error => reject(error));
    });

  addSalesTeam = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: CREATE_RECORD,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
          stores.salesTeamStore.updateSalesTeam(new Models.SalesTeam({}));
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  deleteSalesTeam = (variables: any) =>
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

  updateSingleFiled = (variables: any) =>
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

  checkExistsEnvCode = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: EXISTS_RECORD,
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
          if (!response.data.filterSalesTeams.success)
            return this.listSalesTeam();
          stores.salesTeamStore.filterSalesTeamList(response.data);
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
          if (!response.data.filterByFieldsSalesTeams.success)
            return this.listSalesTeam();
          stores.salesTeamStore.filterSalesTeamList({
            filterSalesTeams: {
              data: response.data.filterByFieldsSalesTeams.data,
              paginatorInfo: {
                count:
                  response.data.filterByFieldsSalesTeams.paginatorInfo.count,
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

  getSalesHierarchyList = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: GET_SALES_HIERARCHYLIST,
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
