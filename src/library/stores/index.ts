import React from "react"
import RootStore from "./rootStore"
import RouterStore from "./routerStore"


// import { AsyncTrunk } from "mobx-sync"
// import * as localStorage from '@lp/library/clients/storage-client'
   


export const Stores = {
  rootStore: new RootStore(),
  routerStore: new RouterStore(),
}


// const trunk = new AsyncTrunk(RouterStore, {
//   storage: localStorage as any,
//   storageKey: "__persist_mobx_stores__",
//   delay: 1e3,
// })

// trunk.init()

export const Contexts = {
  rootStore: React.createContext(Stores.rootStore),
  routerStore: React.createContext(Stores.routerStore),
}
