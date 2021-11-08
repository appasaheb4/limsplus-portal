import { version, ignore } from "mobx-sync"
import { makeObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"

@version(0.1)
export class MethodsStore {
  @ignore @observable methods!: Models.Methods
  @observable listMethods: Models.Methods[]
  @observable listMethodsCount: number
  @ignore @observable checkExitsEnvCode: boolean

  constructor() {
    this.listMethods = []
    this.listMethodsCount = 0
    this.checkExitsEnvCode = false
    makeObservable<MethodsStore, any>(this, {
      methods: observable,
      listMethods: observable,
      listMethodsCount: observable,
      checkExitsEnvCode: observable,
    })
  }

  @computed get methodsService() {
    return new Services.MethodsService()
  }

  @action fetchMethods(page?, limit?) {
    this.methodsService.listMethods(page, limit)
  }

  @action updateMethodsList(res: any) {
    if (!res.methods.success) return alert(res.methods.message)
    this.listMethodsCount = res.methods.paginatorInfo.count
    this.listMethods = res.methods.data 
  }

  @action updateMethods(methods: Models.Methods) {
    this.methods = methods
  }

  @action updateExitsEnvCode(status: boolean) {
    this.checkExitsEnvCode = status
  }
}
