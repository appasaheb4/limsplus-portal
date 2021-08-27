import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"

@version(0.1)
class MethodsStore {
  @ignore @observable methods?: Models.Methods
  @observable listMethods?: Models.Methods[] = []
  @observable listMethodsCount: number = 0 

  constructor() {
    makeAutoObservable(this)
  }
   
  @computed get methodsService() {
    return new Services.MethodsService(
    )
  }

  @action fetchMethods(page?,limit?) {
    this.methodsService.listMethods(page,limit).then((res) => {
      if (!res.success) return alert(res.message)
      this.listMethodsCount = res.data.count
      this.listMethods = res.data.methods
    })
  }

  @action updateMethods(methods: Models.Methods) {
    this.methods = methods
  }
}

export default MethodsStore
