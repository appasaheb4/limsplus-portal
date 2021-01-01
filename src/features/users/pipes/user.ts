import * as Services from "../services";
import * as Models from "../models";

export const addUser = (userStore: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      console.log({ user: userStore.user });

      Services.Users.addUser(userStore.user).then((res: any) => {
        console.log({ res });
        resolve(res.data);
      });
    } catch (error) {
      reject(error);
    }
  });
};
