import {makeObservable, action, observable, runInAction, computed} from 'mobx';
import Session from '@/library/modules/session';
import {Login, ForgotPassword} from '../models';
import * as Services from '../services';
import {stores} from '@/stores';
import Storage from '@/library/modules/storage';
// import { ignore } from "mobx-sync"

export class LoginStore {
  inputLogin!: Login;
  login!: Login;
  loginFailedCount: number;
  forgotPassword!: ForgotPassword;

  constructor() {
    this.login = new Login({});
    this.loginFailedCount = 0;
    makeObservable<LoginStore, any>(this, {
      inputLogin: observable,
      login: observable,
      loginFailedCount: observable,
      forgotPassword: observable,

      LoginService: computed,
      saveLogin: action,
      removeUser: action,
      removeLocalSession: action,
      updateInputUser: action,
      clearInputUser: action,
      updateLogin: action,
      updateLoginFailedCount: action,
      updateForgotPassword: action,
      isLoggedIn: action,
    });
    Session.initialize({name: 'limsplus'});
    runInAction(async () => {
      const session = await Session.getSession();
      if (session) {
        if (stores) stores.rootStore.updateSesssion(session);
        // this.login = session
      }
    });
  }

  get LoginService() {
    return new Services.LoginService();
  }

  saveLogin = async session => {
    localStorage.setItem('accessToken', session.accessToken);
    Session.saveSession(session);
    stores.rootStore.updateSesssion(session);
    this.login = session;
  };

  removeUser = (): Promise<any> => {
    return new Promise<any>(resolve => {
      if (Session.hasSession) {
        this.LoginService.logout({
          input: {
            loginActivityId: this.login?.loginActivityId,
            _id: this.login?._id,
            accessToken: this.login?.accessToken,
          },
        }).then(async res => {
          if (res.logout.success) {
            await Storage.removeItem(`__persist_mobx_stores_loginStore__`);
            await Storage.removeItem(`__persist_mobx_stores_routerStore__`);
            await Storage.removeItem(
              `__persist_mobx_stores_routerStore_SelectedCategory__`,
            );
            Session.deleteSession();
            stores.routerStore.updateUserRouter(undefined);
            runInAction(() => {
              this.login = new Login({});
            });
            resolve(res);
          } else {
            alert(res.logout.message);
          }
        });
      }
    });
  };

  removeLocalSession = (): Promise<boolean> => {
    return new Promise<boolean>(async resolve => {
      await Storage.removeItem(`__persist_mobx_stores_loginStore__`);
      await Storage.removeItem(`__persist_mobx_stores_routerStore__`);
      await Storage.removeItem(
        `__persist_mobx_stores_routerStore_SelectedCategory__`,
      );
      Session.deleteSession();
      stores.routerStore.updateUserRouter(undefined);
      runInAction(() => {
        this.login = new Login({});
      });
      resolve(true);
    });
  };

  updateInputUser(user: Login) {
    this.inputLogin = user;
  }

  clearInputUser() {
    this.inputLogin = new Login({});
  }

  updateLogin = async (login: Login) => {
    this.login = login;
  };

  updateLoginFailedCount(val: number) {
    this.loginFailedCount = val;
  }
  updateForgotPassword(details?: ForgotPassword | undefined) {
    if (details) this.forgotPassword = details;
    else this.forgotPassword = new ForgotPassword({});
  }

  isLoggedIn(): boolean {
    return !!this.login.userId;
  }
}
