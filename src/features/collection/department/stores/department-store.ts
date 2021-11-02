import { version, ignore } from "mobx-sync"
import { makeObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import * as LibraryUtils from "@lp/library/utils"

@version(0.1)
export class DepartmentStore {
  @observable listDepartment!: Models.Department[]
  @observable listDepartmentCount: number = 0
  @ignore @observable department!: Models.Department
  @ignore @observable checkExitsCode: boolean = false

  constructor() {
    this.listDepartment = []
    this.department = {
      ...this.department,
      autoRelease: false,
      requireReceveInLab: false,
      requireScainIn: false,
      routingDept: false,
      openingTime: LibraryUtils.moment().format("hh:mm a"),
      closingTime: LibraryUtils.moment().format("hh:mm a"),
    }
    makeObservable<DepartmentStore, any>(this, {
      listDepartment: observable,
      listDepartmentCount: observable,
      department: observable,
      checkExitsCode: observable,
    })
  }

  @action setExitsCode(status: boolean) {
    this.checkExitsCode = status
  }
  @computed get DepartmentService() {
    return new Services.DepartmentService()
  }

  @action fetchListDepartment(page?, limit?) {
    this.DepartmentService.listDepartment(page, limit)
  }

  @action updateDepartmentList(res: any) {
    if (!res.departments.success) return alert(res.departments.message)
    this.listDepartment = res.departments.data
    this.listDepartmentCount = res.departments.paginatorInfo.count
  }

  @action updateDepartment = (department: Models.Department) => {
    this.department = department
  }
}

