/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */

import { client, ServiceResponse } from '@/core-services/graphql/apollo-client';
import { stores } from '@/stores';
import {
  RECEIPTS_LIST,
  RECEIPTS,
  PAYMENT_RECEIPT_UPLOAD,
  SEND_SMS,
  FILTER,
} from './mutation-receipt';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export class BillSummaryService {
  listReceipt = (page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: RECEIPTS_LIST,
          variables: { input: { page, limit } },
        })
        .then((response: any) => {
          stores.receiptStore.updateReceiptList(response.data);
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });
  generatePaymentReceipt = variables =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: RECEIPTS,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  paymentReceiptUpload = variables =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: PAYMENT_RECEIPT_UPLOAD,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  sendSMS = variables =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: SEND_SMS,
          variables,
        })
        .then((response: any) => {
          console.log({ response });
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
          if (!response.data.filterReceipt.success) return this.listReceipt();
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
