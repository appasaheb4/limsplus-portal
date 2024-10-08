/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
//import * as Models from "../models"
import {client, ServiceResponse} from '@/core-services/graphql/apollo-client';
import {UPDATE_SHORTCUT_MENU} from './mutation';

export class ShortcutMenuService {
  updateShortcutMenu = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: UPDATE_SHORTCUT_MENU,
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
