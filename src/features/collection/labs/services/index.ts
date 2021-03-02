import * as Clients from "@lp/library/clients";
import * as Models from "../models";

import LabService from './lab-services'
export{LabService}

const RELATIVE_PATH = "/lab";

export const listLabs = () =>
  new Promise<Models.Labs[]>((resolve, reject) => {
    const client = Clients.createLimsPlusClient();
    client
      .get(`${RELATIVE_PATH}/listlabs`)
      .then((res) => {
        resolve(res.data.data);
      })
      .catch((error) => {
        reject({ error });
      });
  });

export const addLab = (lab?: Models.Labs) =>
  new Promise<any>((resolve, reject) => {
    const client = Clients.createLimsPlusClient();
    client
      .post(`${RELATIVE_PATH}/addLab`, lab)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject({ error });
      });
  });

export const deleteLab = (id: string) =>
  new Promise<any>((resolve, reject) => {
    const client = Clients.createLimsPlusClient();
    client
      .delete(`${RELATIVE_PATH}/deleteLab/${id}`)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject({ error });
      });
  });
