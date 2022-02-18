import { version } from "mobx-sync"
import { makeObservable, action, observable, computed } from "mobx"
import {Labs,SelectedItems} from "../models"
import {LabService} from "../services"
import * as LibraryUtils from "@/library/utils"

@version(0.1)
export class LabStore {
  listLabs!: Labs[]
  listLabsCopy!: Labs[]
  listLabsCount: number = 0
  labs!: Labs
  checkExitsEnvCode: boolean = false
  selectedItems!: SelectedItems

  constructor() {
    this.listLabs = []
    this.labs = {
      ...this.labs,
      openingTime: LibraryUtils.moment().format("hh:mm a"),
      closingTime: LibraryUtils.moment().format("hh:mm a"),
      reportFormat: true,
      printLable: false
    }

    makeObservable<LabStore, any>(this, {
      listLabs: observable,
      listLabsCount: observable,
      labs: observable,
      checkExitsEnvCode: observable,
      selectedItems: observable,

      LabService: computed,
      fetchListLab: action,
      updateLabList: action,
      filterLabList: action,
      setExitsEnvCode: action,
      updateLabs: action,
    })
  }

  get LabService() {
    return new LabService()
  }

  fetchListLab(page?, limit?) {
    this.LabService.listLabs(page, limit)
  }

  updateLabList(res: any) {
    if (!Array.isArray(res)) {
      if (!res.labs.success) return alert(res.labs.message)
      this.listLabs = res.labs.data
      this.listLabsCopy = res.labs.data
      this.listLabsCount = res.labs.paginatorInfo.count
    } else {
      this.listLabs = res
    }
  }

  filterLabList(res: any) {
    this.listLabs = res.filterLabs.data
    this.listLabsCount = res.filterLabs.paginatorInfo.count
  }

  setExitsEnvCode(status: boolean) {
    this.checkExitsEnvCode = status
  }

  updateLabs = (labs: Labs) => {
    this.labs = labs
  }
  updateSelectedItems(items: SelectedItems | undefined) {
    if (items) this.selectedItems = items
    else this.selectedItems = new SelectedItems({})
  }
}
