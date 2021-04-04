import React from "react"

import HostCommunicationStore from "./hostCommunication-store"
import SegmentMappingStore from "./segmentMapping-store"
import ConversationMappingStore from "./conversationMapping-store"
import EncodeCharacterStore from "./encodeCharacter-store"

export const Stores = {
  hostCommunicationStore: new HostCommunicationStore(),
  segmentMappingStore: new SegmentMappingStore(),
  conversationMappingStore: new ConversationMappingStore(),
  encodeCharacterStore: new EncodeCharacterStore(),
}
  
export const Contexts = {
  hostCommunicationContext: React.createContext(Stores.hostCommunicationStore),
  segmentMappingContext: React.createContext(Stores.segmentMappingStore),
  conversationMappingContext: React.createContext(Stores.conversationMappingStore),
  encodeCharacterContext: React.createContext(Stores.encodeCharacterStore),
}
