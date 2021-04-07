import { ignore, version } from "mobx-sync"
import { action, observable, computed } from "mobx"
import * as Models from "../models"

import * as Services from "../services"
//import { Stores } from "@lp/features/login/stores"

@version(0.1)
class ConversationMappingStore {
  @ignore @observable conversationMapping?: Models.ConversationMapping
  @observable listConversationMapping?: Models.ConversationMapping[] = []

  @action fetchConversationMapping() {
    this.conversationMappingService
      .listConversationMapping()
      .then((conversation) => {
        this.listConversationMapping = conversation
      })
  }

  @computed get conversationMappingService() {
    return new Services.CommunicationService()
  }

  @action updateConversationMapping = (
    conversationMapping: Models.ConversationMapping
  ) => {
    this.conversationMapping = conversationMapping
  }
}

export default ConversationMappingStore
