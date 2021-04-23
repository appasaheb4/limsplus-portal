import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import { Stores } from "@lp/features/login/stores"

@version(0.1)
class DepartmentStore {
  @observable listDepartment: Models.IDepartment[] = []
  @ignore @observable department?: Models.IDepartment
  @ignore @observable checkExitsCode?: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  private init() {
    return {
      lab: "",
      code: "",
      name: "",
    }
  }

  fetchListDepartment() {
    Services.listDepartment().then((res) => {
      //console.log({ department: res });
      this.listDepartment = res
    })
  }

  @action setExitsCode(status: boolean) {
    this.checkExitsCode = status
  }
  @computed get DepartmentService() {
    return new Services.DepartmentService(Stores.loginStore.login?.token as string)
  }

  @action updateDepartment = (department: Models.IDepartment) => {
    this.department = department
  }

  @action clear() {
    this.department = this.init()
  }
}

export default DepartmentStore
