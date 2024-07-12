/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */

import { client, ServiceResponse } from '@/core-services/graphql/apollo-client';
import { stores } from '@/stores';
import {
  TRANSACTION_HEADER_LIST,
  FIND_BY_FIELDS_TRANSACTION_LINE,
  FILTER_BY_FIELDS,
} from './mutation-transaction-details';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export class TransactionDetailsService {
  listTransactionHeader = (page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      const environment =
        stores.loginStore.login && stores.loginStore.login.environment;
      const role = stores.loginStore.login && stores.loginStore.login.role;
      client
        .mutate({
          mutation: TRANSACTION_HEADER_LIST,
          variables: { input: { page, limit, environment, role } },
        })
        .then((response: any) => {
          stores.transactionDetailsStore.updateTransactionHeaderList(
            response.data,
          );
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  findByFieldsTransactionLine = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: FIND_BY_FIELDS_TRANSACTION_LINE,
          variables,
        })
        .then((response: any) => {
          stores.transactionDetailsStore.updateTransactionListList(
            response.data,
          );
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  // updateTransactionDetails = (variables: any) =>
  //   new Promise<any>((resolve, reject) => {
  //     client
  //       .mutate({
  //         mutation: UPDATE_DELIVERY_QUEUE,
  //         variables,
  //       })
  //       .then((response: any) => {
  //         resolve(response.data);
  //       })
  //       .catch(error =>
  //         reject(new ServiceResponse<any>(0, error.message, undefined)),
  //       );
  //   });

  filterByFields = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      stores.uploadLoadingFlag(false);
      client
        .mutate({
          mutation: FILTER_BY_FIELDS,
          variables,
        })
        .then((response: any) => {
          if (!response.data.filterByFieldsTransactionDetails.success)
            return this.listTransactionHeader();
          stores.transactionDetailsStore.updateTransactionHeaderList({
            transactionHeaders: {
              data: response.data.filterByFieldsTransactionDetails.data,
              paginatorInfo: {
                count:
                  response.data.filterByFieldsTransactionDetails.paginatorInfo
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
}
