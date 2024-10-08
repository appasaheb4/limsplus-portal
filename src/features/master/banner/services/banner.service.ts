/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 * @author limsplus
 */

import { client, ServiceResponse } from '@/core-services/graphql/apollo-client';
import { stores } from '@/stores';
import * as Model from '../models/index';
import {
  GET_BANNER_LIST_ALL,
  BANNER_LIST,
  REMOVE_BANNERS,
  UPDATE_BANNER,
  CREATE_BANNER,
  UPDATE_BANNER_IMAGE,
  FILTER,
} from './mutation';

export class BannerService {
  listAllBanner = () =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: GET_BANNER_LIST_ALL,
          variables: {
            input: {
              companyCode:
                (localStorage.getItem('companyCode') as string) || 'COMP0001',
            },
          },
        })
        .then((response: any) => {
          stores.bannerStore.updateListAllBanner(response.data);
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });
  listBanner = (page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: BANNER_LIST,
          variables: { input: { page, limit } },
        })
        .then((response: any) => {
          stores.bannerStore.updateBannerList(response.data);
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  addBanner = (banner: any) =>
    new Promise<any>(async (resolve, reject) => {
      await client
        .mutate({
          mutation: CREATE_BANNER,
          variables: banner,
        })
        .then((response: any) => {
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  deleteBanner = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: REMOVE_BANNERS,
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
          mutation: UPDATE_BANNER,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
          stores.bannerStore.updateBanner(new Model.Banner({}));
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  updateBannerImage = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: UPDATE_BANNER_IMAGE,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
          stores.bannerStore.updateBanner(new Model.Banner({}));
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
          if (!response.data.filterBanners.success) return this.listBanner();
          stores.bannerStore.filterBannerList(response.data);
          stores.uploadLoadingFlag(true);
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });
}
