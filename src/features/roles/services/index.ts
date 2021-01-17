import * as Clients from "@lp/library/clients";
import * as Models from "../models";

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
