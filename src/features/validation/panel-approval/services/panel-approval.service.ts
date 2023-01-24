/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
import {client, ServiceResponse} from '@/core-services/graphql/apollo-client';
import {stores} from '@/stores';
import {
  PANEL_APPROVAL_LIST,
  FIND_BY_FIELDS_TRANSACTION_LINE,
} from './mutation-panel-approval';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export class PanelApprovalService {
  listTransactionHeader = (page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: PANEL_APPROVAL_LIST,
          variables: {input: {page, limit}},
        })
        .then((response: any) => {
          stores.panelApprovalStore.updatePendingPanelApproval(response.data);
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
}
