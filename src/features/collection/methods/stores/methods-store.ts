import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import { Stores } from "@lp/features/login/stores"

@version(0.1)
class MethodsStore {
  @ignore @observable methods?: Models.Methods
  @observable listMethods?: Models.Methods[] = []

  constructor() {
    makeAutoObservable(this)
  }
   
  @computed get methodsService() {
    return new Services.MethodsService(
    )
  }

  fetchMethods() {
    this.methodsService.listMethods().then((res) => {
      this.listMethods = res
    })
  }

  @action updateMethods(methods: Models.Methods) {
    this.methods = methods
  }
}

export default MethodsStore
