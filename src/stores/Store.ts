import { action, computed, makeObservable, observable } from "mobx"
import _ from "lodash"

export class Store {
  private isLoading: boolean
  flagLoading: boolean;

  constructor() {    
    this.isLoading = false;
    this.flagLoading = true;  

   
    makeObservable<Store, any>(this, {
      isLoading: observable,
      flagLoading:observable,
      loading: computed,
      setLoading: action,
    })
  } 

  get loading(): boolean {
    return this.isLoading
  }

  setLoading(flag: boolean): void {
    this.isLoading = _.isNil(flag) || flag
  }

  uploadLoadingFlag(loading: boolean){
    this.flagLoading = loading;
  }
}
