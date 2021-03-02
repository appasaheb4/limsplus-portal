import * as Clients from "@lp/library/clients";
import * as Models from "../models";

import RoleService from './role-services'
export{RoleService}

const RELATIVE_PATH = "/role";

export const listRole = () =>
  new Promise<Models.IRole[]>((resolve, reject) => {
    const client = Clients.createLimsPlusClient();
    client
      .get(`${RELATIVE_PATH}/listRole`)
      .then((res) => {
        resolve(res.data.data);
      })
      .catch((error) => {
        reject({ error });
      });
  });
export const addrole = (lab?: Models.IRole) =>
  new Promise<any>((resolve, reject) => {
    const client = Clients.createLimsPlusClient();
    client
      .post(`${RELATIVE_PATH}/addRole`, lab)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject({ error });
      });
  });

export const deleterole = (id: string) =>
  new Promise<any>((resolve, reject) => {
    const client = Clients.createLimsPlusClient();
    client
      .delete(`${RELATIVE_PATH}/deleteRole/${id}`)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject({ error });
      });
  });
