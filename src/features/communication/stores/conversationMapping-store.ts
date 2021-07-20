import { ignore, version } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"

import * as Services from "../services"
import { Stores as LoginStores } from "@lp/features/login/stores"

@version(0.1)
class ConversationMappingStore {
  @ignore @observable conversationMapping?: Models.ConversationMapping
  @observable listConversationMapping?: Models.ConversationMapping[] = []
  @ignore @observable updateItem?: Models.UpdateItem

  constructor() {
    makeAutoObservable(this)
  }

  @computed get conversationMappingService() {
    return new Services.CommunicationService()
  }

  @action fetchConversationMapping() {
    this.conversationMappingService
      .listConversationMapping()
      .then((conversation) => {
        this.listConversationMapping = conversation
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
