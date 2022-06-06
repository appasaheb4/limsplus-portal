/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
//import * as Models from "../models"
import {http} from '@/library/modules/http';

export class PatientRegistrationService {
  sessionManagementList = () =>
    new Promise<any[]>((resolve, reject) => {
      http
        .get('/settings/environment/listSessionManagement')
        .then((res: any) => {
          resolve(res.data.data);
        })
        .catch(error => {
          reject({error});
        });
    });
  addSessionManagement = (session: any) =>
    new Promise<any>((resolve, reject) => {
      session.documentType = 'session';
      http
        .post('/settings/environment/addSessionManagement', session)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject({error});
        });
    });

  deleteEnvironmentSettings = (id: string) =>
    new Promise<any>((resolve, reject) => {
      http
        .delete(`/settings/environment/deleteEnvironmentSettings/${id}`)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject({error});
        });
    });
  updateSingleFiled = (newValue: any) =>
    new Promise<any>((resolve, reject) => {
      http
        .post('/settings/environment/updateSingleFiled', newValue)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject({error});
        });
    });
}

export default PatientRegistrationService;
