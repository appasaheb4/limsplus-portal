import {stores} from '@lp/stores'
const startup = async () => {
  stores.segmentMappingStore.fetchListSegmentMapping()
}  

export default startup
