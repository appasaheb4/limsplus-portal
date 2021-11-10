import { Stores } from "./stores"
const startup = async () => {
  Stores.segmentMappingStore.fetchListSegmentMapping()
  Stores.segmentMappingStore.fetchmappingList()
  Stores.conversationMappingStore.fetchConversationMapping()
}  

export default startup
