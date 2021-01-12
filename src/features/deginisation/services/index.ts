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
