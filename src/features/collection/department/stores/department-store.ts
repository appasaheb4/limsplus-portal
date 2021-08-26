import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import * as LibraryUtils from "@lp/library/utils"

@version(0.1)
class DepartmentStore {
  @observable listDepartment: Models.Department[] = []
  @observable listDepartmentCount: number = 0
  @ignore @observable department?: Models.Department
  @ignore @observable checkExitsCode?: boolean = false

  constructor() {
    makeAutoObservable(this)
    this.department = {
      ...this.department,
      autoRelease: false,
      requireReceveInLab: false,
      requireScainIn: false,
      routingDept: false,
      openingTime: LibraryUtils.moment().format("hh:mm a"),
      closingTime: LibraryUtils.moment().format("hh:mm a"),
    }
  }

  @action setExitsCode(status: boolean) {
    this.checkExitsCode = status
  }
  @computed get DepartmentService() {
    return new Services.DepartmentService()
  }

  @action fetchListDepartment(page?, limit?) {
    this.DepartmentService.listDepartment(page, limit).then((res) => {
      if (!res.success) return alert(res.message)
      this.listDepartment = res.data.department
      this.listDepartmentCount = res.data.count
    })
  }

  @action updateDepartment = (department: Models.Department) => {
    this.department = department
  }
}

export default DepartmentStore
