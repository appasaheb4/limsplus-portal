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

export const userList = () =>
  new Promise<Models.Users[]>((resolve, reject) => {
    const client = Clients.createLimsPlusClient();
    client
      .get(`${RELATIVE_PATH}/listUser`)
      .then((res) => {
        resolve(res.data.data);
      })
      .catch((error) => {
        reject({ error });
      });
  });

export const deleteUser = (id: string) =>
  new Promise<Models.Users[]>((resolve, reject) => {
    const client = Clients.createLimsPlusClient();
    client
      .delete(`${RELATIVE_PATH}/deleteUser/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject({ error });
      });
  });
