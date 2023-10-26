import { makeObservable, action, observable } from 'mobx';
// import Session from '@/library/modules/session';
// import { stores } from '@/stores';

export class RootStore {
  processLoading: boolean;
  session!: any;
  modalTokenExpire!: any;

  constructor() {
    this.processLoading = false;
    makeObservable<RootStore, any>(this, {
      processLoading: observable,
      session: observable,
      modalTokenExpire: observable,

      setProcessLoading: action,
      isLogin: action,
      updateSesssion: action,
      updateModalTokenExpire: action,
    });
  }

  setProcessLoading(processLoading: boolean) {
    this.processLoading = processLoading;
  }

  async isLogin() {
    const isSession = await window.sessionStorage.getItem('session');
    if (isSession) {
      return true;
    }
    return false;
  }

  updateSesssion(value: any) {
    this.session = value;
  }

  // modals actions
  updateModalTokenExpire(details: any) {
    this.modalTokenExpire = details;
  }
}
