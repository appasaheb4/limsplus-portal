import * as Clients from "@lp/library/clients";
import * as Models from "@lp/features/users/models";

const RELATIVE_PATH = "/auth";

export const addUser = (user: Models.Users) =>
  new Promise<Models.Users>((resolve, reject) => {
    const client = Clients.createLimsPlusClient();
    client
      .post(`${RELATIVE_PATH}/addUser`, user)
      .then((res) => {
        resolve(res.data.data as Models.Users);
      })
      .catch((error) => {
        reject({ error });
      });
  });
