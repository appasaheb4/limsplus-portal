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
  CREATE_RECORD,
  REMOVE_RECORD,
  UPDATE_RECORD,
  IMPORT_RECORDS,
  FILTER,
  FIND_BY_FIELDS,
  FETCH_KEY_VALUE,
  FETCH_KEYS_VALUE,
} from './mutation';
import {GET_COLLECTION_LIST} from '@/core-services/graphql/query';
import {GET_COLLECTION_FIELDS} from '@/core-services/graphql/mutation';
import {MappingValues} from '../../models';

export class SegmentMappingService {
  listSegmentMapping = (page = 0, limit = 10) =>
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
          const data = response.data.segmentMappings.data;
          const group = data.reduce((r: any, a: any) => {
            r[a.segments] = [...(r[a.segments] || []), a];
            return r;
          }, {});
          const entries = Object.entries(group);

          const values: any = [];
          for (const groupSegment of entries) {
            const segmentList: any = groupSegment[1];
            segmentList.sort((a, b) => {
              return a.field_no - b.field_no;
            });
            for (const item of segmentList) {
              values.push(item);
            }
          }
          stores.segmentMappingStore.updateListSegmentMapping({
            segmentMappings: {
              ...response.data.segmentMappings,
              data: values,
            },
          });
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  mappingList = (page = 0, limit = 10) =>
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
          const data = response.data.segmentMappings.data;
          const mapping: any[] = [];
          const values: MappingValues[] = [];
          data.forEach((item: any) => {
            if (
              item.equipmentType === 'ERP' &&
              (item.dataFlowFrom === 'Host &gt; LIS' ||
                item.dataFlowFrom === 'Host > LIS')
            ) {
              values.push({
                segments: item.segments,
                field: `${item.segments?.toLowerCase()}.${item.element_name
                  ?.toLowerCase()
                  .replaceAll(' ', '_')}`,
                component: [Number(item.field_no), 1],
                field_no: Number(item.field_no),
                default: '',
              });
            }
          });
          const group = values.reduce((r: any, a: any) => {
            r[a.segments] = [...(r[a.segments] || []), a];
            return r;
          }, {});

          const entries = Object.entries(group);
          entries.forEach((item: any) => {
            mapping.push({
              [item[0].toLowerCase() || '']: {values: item[1]},
            });
          });
          stores.segmentMappingStore.updateMappingList({
            segmentMappings: {...response.data.segmentMappings, data: mapping},
          });
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  importSegmentMapping = (variables: any) =>
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

  addSegmentMapping = (variables: any) =>
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

  deleteSegmentMapping = (variables: any) =>
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

  filter = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      stores.uploadLoadingFlag(false);
      client
        .mutate({
          mutation: FILTER,
          variables,
        })
        .then((response: any) => {
          if (!response.data.filterSegmentMappings.success)
            return this.listSegmentMapping();
          stores.segmentMappingStore.filterSegmentMappingList(response.data);
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

  getCollectionList = () =>
    new Promise<any>((resolve, reject) => {
      client
        .query({
          query: GET_COLLECTION_LIST,
        })
        .then((response: any) => {
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  getCollectionFields = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: GET_COLLECTION_FIELDS,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  fetchKeyValue = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: FETCH_KEY_VALUE,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  fetchKeysValue = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: FETCH_KEYS_VALUE,
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
