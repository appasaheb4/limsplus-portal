import * as Clients from "@lp/library/clients";
import * as Models from "../models";

const RELATIVE_PATH = "/banner";

export const addBanner = (banner: any) =>
  new Promise<any>((resolve, reject) => {
    const client = Clients.createLimsPlusClient();
    client
      .post(`${RELATIVE_PATH}/addBanner`, banner)
      .then((res) => {
        resolve(res.data.data as Models.IBanner);
      })
      .catch((error) => {
        reject({ error });
      });
  });

export const listBanner = () =>
  new Promise<Models.IBanner[]>((resolve, reject) => {
    const client = Clients.createLimsPlusClient();
    client
      .get(`${RELATIVE_PATH}/listBanner`)
      .then((res) => {
        resolve(res.data.data);
      })
      .catch((error) => {
        reject({ error });
      });
  });
