import { ignore, version } from "mobx-sync"
import { action, observable } from "mobx"
import * as Models from "../models"

// import * as Services from "../services"
//import { Stores } from "@lp/features/login/stores"

@version(0.1)
class ConversationMappingStore  {
  @ignore @observable conversationMapping?: Models.ConversationMapping
  @observable listConversationMapping?: Models.ConversationMapping[] = []

  @action updateConversationMapping = (
    conversationMapping: Models.ConversationMapping
  ) => {
    this.conversationMapping = conversationMapping
  }

  @action pushListArray = (newValue?: Models.ConversationMapping) => {
    if (newValue) {
      console.log({ newValue })

      this.listConversationMapping?.push(newValue)
    }
  }
}

export default ConversationMappingStore
