import { ignore, version } from "mobx-sync"
import { makeObservable, action, observable, computed } from "mobx"
import * as Models from "../models"

import * as Services from "../services"

interface UpdateItem {
  value: string | boolean | undefined | any[]
  dataField: string
  id: string
}

@version(0.1)
export class DataConversationStore {
  @ignore @observable dataConversation!: Models.DataConversation
  @observable listdataConversation: Models.DataConversation[]
  @observable listdataConversationCount: number
  @ignore @observable updateItem!: UpdateItem

  constructor() {
    this.listdataConversation = []
    this.listdataConversationCount = 0
    makeObservable<DataConversationStore, any>(this, {
      dataConversation: observable,
      listdataConversation: observable,
      listdataConversationCount: observable,
      updateItem: observable,
    })
  }

  @computed get dataConversationService() {
    return new Services.DataConversationService()
  }

  @action fetchDataConversation(page?, limit?) {
    this.dataConversationService.listDataConversation(page, limit)
  }

  @action updateDataConversationList(res: any) {
    if (!res.dataConversations.success) return alert(res.dataConversations.message)
    this.listdataConversation = res.dataConversations.data
    this.listdataConversationCount = res.dataConversations.paginatorInfo.count
  }

  @action updateDataConversation = (dataConversation: Models.DataConversation) => {
    this.dataConversation = dataConversation
  }
  @action changeUpdateItem = (item: UpdateItem) => {
    this.updateItem = item
  }
}
