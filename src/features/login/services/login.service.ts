/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 * @author limsplus
 */

import {client, ServiceResponse} from '@/core-services/graphql/apollo-client';
import {
  LOGIN,
  STATUS_UPDATE,
  LOGOUT,
  FORGOT_PASSWORD,
  SESSION_ALLOWED_LOGOUT,
} from './mutation';
export class LoginService {
  onLogin = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: LOGIN,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  accountStatusUpdate = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: STATUS_UPDATE,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });
  forgotPassword = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: FORGOT_PASSWORD,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  logout = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: LOGOUT,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  sessionAllowedLogout = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: SESSION_ALLOWED_LOGOUT,
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
