/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */

import { client, ServiceResponse } from '@/core-services/graphql/apollo-client';
import { stores } from '@/stores';
import {
  BILL_SUMMARY_LIST,
  GENERATE_BILL,
  GET_BILLING_LIST,
  FILTER,
} from './mutation-receipt';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export class BillSummaryService {
  listBillSummary = (page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: BILL_SUMMARY_LIST,
          variables: { input: { page, limit } },
        })
        .then((response: any) => {
          stores.billSummaryStore.updateBillSummaryList(response.data);
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });
  generateBill = variables =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: GENERATE_BILL,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  getBillingList = variables =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: GET_BILLING_LIST,
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
      client
        .mutate({
          mutation: FILTER,
          variables,
        })
        .then((response: any) => {
          if (!response.data.filterReceipt.success)
            return this.listBillSummary();
          stores.receiptStore.updateReceiptList({
            receipts: {
              data: response.data.filterReceipt?.data,
              paginatorInfo: {
                ...response.data.filterReceipt?.paginatorInfo,
              },
            },
          });
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });
}
