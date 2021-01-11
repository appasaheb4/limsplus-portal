import * as Clients from "@lp/library/clients";
import * as Models from "../models";

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
