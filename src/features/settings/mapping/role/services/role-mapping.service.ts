/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
import {client, ServiceResponse} from '@/core-services/graphql/apollo-client';
import {
  LIST,
  REMOVE_RECORD,
  CREATE_RECORD,
  UPDATE_RECORD,
  FILTER,
} from './mutation';
import {stores} from '@/stores';

export class RoleMappingService {
  addRoleMapping = (variables: any) =>
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
  roleMappingList = (page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: LIST,
          variables: {input: {page, limit}},
        })
        .then((response: any) => {
          stores.roleMappingStore.updateRoleMappingList(response.data);
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });
  deleteRoleMapping = (variables: any) =>
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

  update = async (variables: any) =>
    new Promise<any>(async (resolve, reject) => {
      await client
        .mutate({
          mutation: UPDATE_RECORD,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
        })
        .catch(error => {
          console.log({error});
          reject(new ServiceResponse<any>(0, error.message, undefined));
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
          if (!response.data.filterRoleMapping.success)
            return this.roleMappingList();
          stores.roleMappingStore.filterRoleMappingList(response.data);
          stores.uploadLoadingFlag(true);
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });
}
