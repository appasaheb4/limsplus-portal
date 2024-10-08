/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 * @author limsplus
 */

import { Http, http } from '@/library/modules/http';
import { stores } from '@/stores';
import { client, ServiceResponse } from '@/core-services/graphql/apollo-client';
import * as Models from '../models';

import {
  USER_LIST,
  UPDATE_USER,
  REMOVE_USER,
  CREATE_USER,
  CHECK_EXISTS_EMPCODE,
  UPDATE_IMAGE,
  PASSWORD_RESEND,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_BY_ADMIN,
  SWITCH_ACCESS,
  FILTER_USERS_BY_KEY,
  FILTER,
  FILTER_BY_FIELDS,
  FIND_BY_FIELDS,
  GET_USER_BY_MATCH_USER_ID,
  FIND_BY_FIELDS_AND_UNIQUE_USER_ID,
  CHECK_EXISTS_USERID,
} from './mutation';
// import { UserService as ServiceUser } from '@/lp-core-service/settings/users';

export class UserService {
  env = stores.loginStore.login && stores.loginStore.login.environment;
  role = stores.loginStore.login && stores.loginStore.login.role;
  // serviceUser = new ServiceUser(
  //   client,
  //   stores.loginStore.login && stores.loginStore.login.environment,
  //   stores.loginStore.login && stores.loginStore.login.role,
  // );
  userList = (page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: USER_LIST,
          variables: {
            input: {
              page,
              limit,
              env: this.env,
              role: this.role,
            },
          },
        })
        .then((response: any) => {
          stores.userStore.updateUserList(response.data);
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  addUser = async (variables: any) =>
    new Promise((resolve, reject) => {
      client
        .mutate({
          mutation: CREATE_USER,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
          stores.userStore.updateUser(new Models.Users({}));
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  deleteUser = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: REMOVE_USER,
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
          mutation: UPDATE_USER,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
          stores.userStore.updateUser(new Models.Users({}));
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  findUserByEmpCode = (empCode: string) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: CHECK_EXISTS_EMPCODE,
          variables: { empCode },
        })
        .then((response: any) => {
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  uploadImage = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: UPDATE_IMAGE,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
          stores.userStore.updateUser(new Models.Users({}));
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  reSendPassword = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: PASSWORD_RESEND,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  changePassword = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: CHANGE_PASSWORD,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
          stores.userStore.updateChangePassword(new Models.ChangePassword({}));
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  changepasswordByAdmin = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: CHANGE_PASSWORD_BY_ADMIN,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
          stores.userStore.updateChangePassword(new Models.ChangePassword({}));
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  switchAccess = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: SWITCH_ACCESS,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  loginActivityList = (details: any) =>
    new Promise<any>((resolve, reject) => {
      http
        .post('/auth/loginActivityList', details)
        .then((response: any) => {
          const serviceResponse = Http.handleResponse<any>(response);
          resolve(serviceResponse);
        })
        .catch(error => {
          reject(new ServiceResponse<any>(0, error.message, undefined));
        });
    });

  userFilterByKey = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      stores.uploadLoadingFlag(false);
      client
        .mutate({
          mutation: FILTER_USERS_BY_KEY,
          variables,
        })
        .then((response: any) => {
          stores.userStore.updateUserFilterList(response.data);
          stores.uploadLoadingFlag(true);
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
          if (!response.data.filterUsers.success) return this.userList();
          stores.userStore.filterUserList(response.data);
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
          if (!response.data.filterByFieldsUser.success) return this.userList();
          stores.userStore.filterUserList({
            filterUsers: {
              data: response.data.filterByFieldsUser.data,
              paginatorInfo: {
                count: response.data.filterByFieldsUser.paginatorInfo.count,
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

  findByFieldsAndUniqueUserId = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: FIND_BY_FIELDS_AND_UNIQUE_USER_ID,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  checkExitsUserId = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: CHECK_EXISTS_USERID,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
        })
        .catch((error: { message: any }) => reject(error));
    });

  getUserByMatchUserId = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: GET_USER_BY_MATCH_USER_ID,
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
