/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */

import {
  client,
  clientLocal,
  ServiceResponse,
} from '@/core-services/graphql/apollo-client';
import {CONNECT, CREATE_TRANSMITTED_MESSAGE} from './mutation';
export class HostCommunicationService {
  connectHostCommunication = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      clientLocal
        .mutate({
          mutation: CONNECT,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  createTransmittedMessage = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: CREATE_TRANSMITTED_MESSAGE,
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
