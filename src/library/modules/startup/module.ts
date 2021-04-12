import { AsyncTrunk } from "mobx-sync"
import * as localStorage from "@lp/library/clients/storage-client"


const hydrateStore = async (key: string, storeInstance: any) => {
  try {  
    const trunk = new AsyncTrunk(storeInstance, {
      storage: localStorage as any,
      storageKey: `__persist_mobx_stores_${key}__`,
      delay: 1e3,
    })  
    await trunk.init(
      
    )
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

export default hydrateStore
