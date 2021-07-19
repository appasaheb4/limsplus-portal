import React from "react"
import RootStore from "./rootStore"
import RouterStore from "./routerStore"
import AppStore from "./appStore"




   
export const Stores = {
  rootStore: new RootStore(),
  routerStore: new RouterStore(),
  appStore: new AppStore()
}



export const Contexts = {
  rootStore: React.createContext(Stores.rootStore),
  routerStore: React.createContext(Stores.routerStore),
  appStore: React.createContext(Stores.appStore)
}
