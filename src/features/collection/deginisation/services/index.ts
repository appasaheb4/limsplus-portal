import * as Clients from "@lp/library/clients";
import * as Models from "../models";

const RELATIVE_PATH = "/deginisation";

export const listDeginisation = () =>
  new Promise<Models.IDeginisation[]>((resolve, reject) => {
    const client = Clients.createLimsPlusClient();
    client
      .get(`${RELATIVE_PATH}/listDeginisation`)
      .then((res) => {
        resolve(res.data.data);
      })
      .catch((error) => {
        reject({ error });
      });
  });

export const addDeginisation = (deginisation?: Models.IDeginisation) =>
  new Promise<any>((resolve, reject) => {
    const client = Clients.createLimsPlusClient();
    client
      .post(`${RELATIVE_PATH}/addDeginisation`, deginisation)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject({ error });
      });
  });

export const deleteDeginisation = (id: string) =>
  new Promise<Models.IDeginisation[]>((resolve, reject) => {
    const client = Clients.createLimsPlusClient();
    client
      .delete(`${RELATIVE_PATH}/deleteDeginisation/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject({ error });
      });
  });
