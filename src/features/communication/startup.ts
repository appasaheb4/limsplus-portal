import { Stores } from "./stores"
const startup = async () => {
  Stores.segmentMappingStore.fetchListSegmentMapping()
  Stores.segmentMappingStore.fetchmappingList()
  Stores.interfaceManagerStore.fetchEncodeCharacter()
  Stores.conversationMappingStore.fetchConversationMapping()
}  

export default startup
