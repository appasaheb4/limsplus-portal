import { action, computed, makeObservable, observable } from "mobx"
import _ from "lodash"

export class Store {
  private isLoading: boolean

  constructor() {
    this.isLoading = false

    makeObservable<Store, any>(this, {
      isLoading: observable,
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
}
