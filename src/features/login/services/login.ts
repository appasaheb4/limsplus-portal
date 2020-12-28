import * as Clients from "@lp/library/clients";
import * as Models from "@lp/features/login/models";

const RELATIVE_PATH = "/auth";

export const onLogin = (user: Models.Login) =>
  new Promise<Models.Login>((resolve, reject) => {
    const client = Clients.createLimsPlusClient();
    client
      .post(`${RELATIVE_PATH}/login`, user)
      .then((res) => {
        resolve(res.data.data as Models.Login);
      })
      .catch((error) => {
        reject({ error });
      });
  });
