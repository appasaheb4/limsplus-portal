import * as Clients from "@lp/library/clients";
import * as Models from "../models";

const RELATIVE_PATH = "/department";

export const listDepartment = () =>
  new Promise<Models.IDepartment[]>((resolve, reject) => {
    const client = Clients.createLimsPlusClient();
    client
      .get(`${RELATIVE_PATH}/listDepartment`)
      .then((res) => {
        resolve(res.data.data);
      })
      .catch((error) => {
        reject({ error });
      });
  });
  export const adddepartment= (lab?: Models.IDepartment) =>
  new Promise<any>((resolve, reject) => {
    const client = Clients.createLimsPlusClient();
    client
      .post(`${RELATIVE_PATH}/adddepartment`, lab)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject({ error });
      });
  });

export const deletedepartment = (id: string) =>
  new Promise<Models.IDepartment[]>((resolve, reject) => {
    const client = Clients.createLimsPlusClient();
    client
      .delete(`${RELATIVE_PATH}/deletedepartment/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject({ error });
      });
  });