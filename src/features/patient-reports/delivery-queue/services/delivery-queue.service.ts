/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */

import {client, ServiceResponse} from '@/core-services/graphql/apollo-client';
import {stores} from '@/stores';
import {
  DELIVERY_QUEUE_LIST,
  UPDATE_DELIVERY_QUEUE,
  UPDATE_DELIVERY_QUEUE_BY_VISIT_IDS,
  FILTER,
} from './mutation-delivery-queue';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export class DeliveryQueueService {
  listDeliveryQueue = (page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      const environment =
        stores.loginStore.login && stores.loginStore.login.environment;
      const role = stores.loginStore.login && stores.loginStore.login.role;
      client
        .mutate({
          mutation: DELIVERY_QUEUE_LIST,
          variables: {input: {page, limit, environment, role}},
        })
        .then((response: any) => {
          stores.deliveryQueueStore.updateReportDeliveryList(response.data);
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  updateDeliveryQueue = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: UPDATE_DELIVERY_QUEUE,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });
  updateDeliveryQueueByVisitIds = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: UPDATE_DELIVERY_QUEUE_BY_VISIT_IDS,
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
      console.log({variables});
      stores.uploadLoadingFlag(false);
      client
        .mutate({
          mutation: FILTER,
          variables,
        })
        .then((response: any) => {
          if (!response.data.filterDeliveryQueue.success)
            return this.listDeliveryQueue();
          stores.deliveryQueueStore.filterReportDeliveryList(response.data);
          stores.uploadLoadingFlag(false);
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });
}
