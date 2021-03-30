import { Stores } from "./stores"
const startup = async () => {
  Stores.segmentMappingStore.fetchListSegmentMapping()
  Stores.segmentMappingStore.fetchmappingList()
  Stores.encodeCharacterStore.fetchEncodeCharacter()
}

export default startup
