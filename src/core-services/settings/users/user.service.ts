/* eslint-disable unicorn/no-useless-undefined */
/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 * @author limsplus
 */
// modify
import {
  CHECK_EXISTS_USERID,
  UPDATE_USER,
  REMOVE_USER,
  CREATE_USER,
  CHECK_EXISTS_EMPCODE,
  UPDATE_IMAGE,
  PASSWORD_RESEND,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_BY_ADMIN,
  SWITCH_ACCESS,
  FIND_BY_FIELDS,
  LOGIN,
  GET_USER_BY_MATCH_USER_ID,
} from './mutation';

export class UserService {
  client: any;
  env: string;
  role: string;

  constructor(client: any, env: string, role: string) {
    this.client = client;
    this.env = env;
    this.role = role;
  }

  onLogin = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .mutate({
          mutation: LOGIN,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
        })
        .catch((error: any) => reject(error));
    });

  checkExitsUserId = (userId: string) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .mutate({
          mutation: CHECK_EXISTS_USERID,
          variables: {userId},
        })
        .then((response: any) => {
          resolve(response.data);
        })
        .catch((error: {message: any}) => reject(error));
    });

  addUser = async (variables: any) =>
    new Promise((resolve, reject) => {
      this.client
        .mutate({
          mutation: CREATE_USER,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
        })
        .catch((error: {message: any}) => reject(error));
    });

  deleteUser = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .mutate({
          mutation: REMOVE_USER,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
        })
        .catch((error: {message: any}) => reject(error));
    });

  updateSingleFiled = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .mutate({
          mutation: UPDATE_USER,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
        })
        .catch((error: {message: any}) => reject(error));
    });

  findUserByEmpCode = (empCode: string) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .mutate({
          mutation: CHECK_EXISTS_EMPCODE,
          variables: {empCode},
        })
        .then((response: any) => {
          resolve(response.data);
        })
        .catch((error: {message: any}) => reject(error));
    });

  uploadImage = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .mutate({
          mutation: UPDATE_IMAGE,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
        })
        .catch((error: {message: any}) => reject(error));
    });

  reSendPassword = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .mutate({
          mutation: PASSWORD_RESEND,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
        })
        .catch((error: {message: any}) => reject(error));
    });

  changePassword = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .mutate({
          mutation: CHANGE_PASSWORD,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
        })
        .catch((error: {message: any}) => reject(error));
    });

  changepasswordByAdmin = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .mutate({
          mutation: CHANGE_PASSWORD_BY_ADMIN,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
        })
        .catch((error: {message: any}) => reject(error));
    });

  switchAccess = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .mutate({
          mutation: SWITCH_ACCESS,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
        })
        .catch((error: {message: any}) => reject(error));
    });

  findByFields = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .mutate({
          mutation: FIND_BY_FIELDS,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
        })
        .catch((error: {message: any}) => reject(error));
    });

  getUserByMatchUserId = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .mutate({
          mutation: GET_USER_BY_MATCH_USER_ID,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
        })
        .catch((error: {message: any}) => reject(error));
    });
}
