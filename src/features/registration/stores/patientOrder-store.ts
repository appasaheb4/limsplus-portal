import { makeObservable, action, observable, computed } from "mobx"
import { PatientOrderService } from "../services"
import * as Models from "../models"

export class PatientOrderStore {
  patientOrder!: Models.PatientOrder
  listPatientOrder: Models.PatientOrder[] = []
  listPatientOrderCount!: number
  checkExistsOrderId!: boolean
  selectedItems!: Models.SelectedItems
  packageList!: any

  constructor() {
    this.listPatientOrder = []
    this.packageList = []
    this.listPatientOrderCount = 0
    this.checkExistsOrderId = false
    // this.patientOrder = {
    //   ...this.patientOrder,
    // }

    makeObservable<PatientOrderStore, any>(this, {
      patientOrder: observable,
      listPatientOrder: observable,
      listPatientOrderCount: observable,
      selectedItems: observable,
      packageList: observable,

      patientOrderService: computed,
      updatePatientOrderList: action,
      filterPatientOrderList: action,
      updatePatientOrder: action,
      updateSelectedItems: action,
      updatePackageList: action,
    })
  }

  get patientOrderService() {
    return new PatientOrderService()
  }

  updatePatientOrderList(res: any) {
    if (!res.patientOrders.success) return alert(res.patientOrders.message)
    this.listPatientOrder = res.patientOrders.data
    this.listPatientOrderCount = res.patientOrders.paginatorInfo.count
  }
    
  filterPatientOrderList(res: any) {
    this.listPatientOrder = res.filterPatientOrder.data
    this.listPatientOrderCount = res.filterPatientOrder.paginatorInfo.count
  }

  updatePatientOrder(input: Models.PatientOrder) {
    this.patientOrder = input
  }

  updateExistsOrderId(flag: boolean) {
    this.checkExistsOrderId = flag
  }

  updateSelectedItems(res: Models.SelectedItems) {
    this.selectedItems = res
  }

  updatePackageList(list: any[]) {
    this.packageList = list
  }
}
