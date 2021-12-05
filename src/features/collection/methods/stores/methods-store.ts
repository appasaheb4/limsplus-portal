import { makeObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"

export class MethodsStore {
  methods!: Models.Methods
  listMethods: Models.Methods[]
  listMethodsCopy!: Models.Methods[]
  listMethodsCount: number
  checkExitsEnvCode: boolean

  constructor() {
    this.listMethods = []
    this.listMethodsCount = 0
    this.checkExitsEnvCode = false

    makeObservable<MethodsStore, any>(this, {
      methods: observable,
      listMethods: observable,
      listMethodsCount: observable,
      checkExitsEnvCode: observable,

      methodsService: computed,
      fetchMethods: action,
      updateMethodsList: action,
      updateMethods: action,
      updateExitsEnvCode: action,
    })
  }

  get methodsService() {
    return new Services.MethodsService()
  }

  fetchMethods(page?, limit?) {
    this.methodsService.listMethods(page, limit)
  }

  updateMethodsList(res: any) {
    if(!Array.isArray(res)){
      if (!res.methods.success) return alert(res.methods.message)
      this.listMethodsCount = res.methods.paginatorInfo.count
      this.listMethods = res.methods.data
      this.listMethodsCopy = res.methods.data
  }else{
    this.listMethods = res
  }
    }
    
  
  filterMethodsList(res: any){
    this.listMethodsCount = res.filterMethods.paginatorInfo.count
    this.listMethods = res.filterMethods.data
  }

  updateMethods(methods: Models.Methods) {
    this.methods = methods
  }

  updateExitsEnvCode(status: boolean) {
    this.checkExitsEnvCode = status
  }
}
