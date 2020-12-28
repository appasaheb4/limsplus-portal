import * as Services from "../services";

export const onLogin = (loginStore: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      console.log({ loginStore });

      if (
        loginStore.inputLogin.lab &&
        loginStore.inputLogin.userId &&
        loginStore.inputLogin.password
      ) {
        Services.Login.onLogin(loginStore.inputLogin).then((res: any) => {
          console.log({ res });

          resolve(res);
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
