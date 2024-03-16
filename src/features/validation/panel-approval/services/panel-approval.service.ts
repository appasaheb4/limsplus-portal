/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */

import { client, ServiceResponse } from '@/core-services/graphql/apollo-client';
import { stores } from '@/stores';
import {
  PANEL_APPROVAL_LIST,
  UPDATE_RECORD,
  UPDATE_BY_IDS_RECORD,
  FILTER,
  FIND,
} from './mutation-panel-approval';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export class PanelApprovalService {
  listPanelApproval = ({
    page = 0,
    limit = 20,
    isNotEqualToApproved = false,
    validationLevel = stores.loginStore.login?.validationLevel,
  }) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: PANEL_APPROVAL_LIST,
          variables: {
            input: { page, limit, isNotEqualToApproved, validationLevel },
          },
        })
        .then((response: any) => {
          stores.panelApprovalStore.updatePanelApproval(response.data);
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  update = (variables: any) =>
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

  updateByIds = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: UPDATE_BY_IDS_RECORD,
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
          if (!response.data.filterPanelApproval.success)
            return this.listPanelApproval({});
          stores.panelApprovalStore.filterPanelApproval(response.data);
          stores.uploadLoadingFlag(false);
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  find = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: FIND,
          variables,
        })
        .then((response: any) => {
          stores.panelApprovalStore.updatePanelApproval({
            panelApprovals: {
              data: response.data.findByFieldsPanelApproval.data,
              paginatorInfo: {
                count: response.data.findByFieldsPanelApproval.data?.length,
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
