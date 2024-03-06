import { action, computed, makeObservable, observable } from 'mobx';

export class Store {
  private isLoading: boolean;
  flagLoading: boolean;
  isBackendDown: boolean;

  constructor() {
    this.isLoading = false;
    this.flagLoading = true;
    this.isBackendDown = false;
    this;
    makeObservable<Store, any>(this, {
      isLoading: observable,
      flagLoading: observable,
      loading: computed,
      setLoading: action,
    });
  }

  get loading(): boolean {
    return this.isLoading;
  }

  updateBackendDown(statusBackend: boolean) {
    this.isBackendDown = statusBackend;
  }

  setLoading(flag: boolean): void {
    this.isLoading = flag || false;
  }

  uploadLoadingFlag(loading: boolean) {
    this.flagLoading = loading;
  }
}
