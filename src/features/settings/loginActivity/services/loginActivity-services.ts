/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
import {client, ServiceResponse} from '@/library/modules/apolloClient';
import {LIST, FILTER} from './mutation';
import {stores} from '@/stores';
class LoginActivityService {
  listLoginActivity = (page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: LIST,
          variables: {input: {page, limit}},
        })
        .then((response: any) => {
          stores.loginActivityStore.updateLoginActivityList(response.data);
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
          if (!response.data.filterLoginActivitys.success)
            return this.listLoginActivity();
          stores.loginActivityStore.filterLoginActivityList(response.data);
          stores.uploadLoadingFlag(true);
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });
}

export default LoginActivityService;
