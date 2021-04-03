import React from "react"
import RootStore from "./rootStore"
import { AsyncTrunk } from "mobx-sync"

const trunk = new AsyncTrunk(RootStore, {
  storage: localStorage,
  storageKey: "__persist_mobx_stores__",
  delay: 1e3,
})

trunk.init()

export const Stores = {
  rootStore: new RootStore(),
}

export const Contexts = {
  rootStore: React.createContext(Stores.rootStore),
}
