import React from "react"

import HostCommunicationStore from "./hostCommunication-store"
import SegmentMappingStore from "./segmentMapping-store"
import ConversationMappingStore from "./conversationMapping-store"
import InterfaceManagerStore from "./interfaceManager-store" 
   
export const Stores = {
  hostCommunicationStore: new HostCommunicationStore(),
  segmentMappingStore: new SegmentMappingStore(),
  conversationMappingStore: new ConversationMappingStore(),
  interfaceManagerStore: new InterfaceManagerStore(),
}
    
export const Contexts = {
  hostCommunicationContext: React.createContext(Stores.hostCommunicationStore),
  segmentMappingContext: React.createContext(Stores.segmentMappingStore),
  conversationMappingContext: React.createContext(Stores.conversationMappingStore),
  einterfaceManagerContext: React.createContext(Stores.interfaceManagerStore),
}
