import React from "react"

import CommunicationStore from "./communication-store"
import SegmentMappingStore from "./segmentMapping-store"
import ConversationMappingStore from "./conversationMapping-store"

export const Stores = {
  communicationStore: new CommunicationStore(),
  segmentMappingStore: new SegmentMappingStore(),
  conversationMappingStore: new ConversationMappingStore(),
}

export const Contexts = {
  communicationContext: React.createContext(Stores.communicationStore),
  segmentMappingContext: React.createContext(Stores.segmentMappingStore),
  conversationMappingContext: React.createContext(Stores.conversationMappingStore),
}
