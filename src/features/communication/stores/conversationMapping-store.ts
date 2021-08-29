import { ignore, version } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"

import * as Services from "../services"

@version(0.1)
class ConversationMappingStore {
  @ignore @observable conversationMapping?: Models.ConversationMapping
  @observable listConversationMapping?: Models.ConversationMapping[] = []
  @observable listConversationMappingCount: number = 0
  @ignore @observable updateItem?: Models.UpdateItem

  constructor() {
    makeAutoObservable(this)
  }

  @computed get conversationMappingService() {
    return new Services.CommunicationService()
  }

  @action fetchConversationMapping(page?, limit?) {
    this.conversationMappingService
      .listConversationMapping(page, limit)
      .then((res) => {
        if (!res.success) return alert(res.message)
        this.listConversationMapping = res.data.conversationMapping
        this.listConversationMappingCount = res.data.count
      })
  }

  @action updateConversationMapping = (
    conversationMapping: Models.ConversationMapping
  ) => {
    this.conversationMapping = conversationMapping
  }
  @action changeUpdateItem = (item: Models.UpdateItem) => {
    this.updateItem = item
  }
}

export default ConversationMappingStore
