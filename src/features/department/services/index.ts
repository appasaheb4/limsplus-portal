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
