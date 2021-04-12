import React from "react"
import RootStore from "./rootStore"
import RouterStore from "./routerStore"




   
export const Stores = {
  rootStore: new RootStore(),
  routerStore: new RouterStore(),
}



export const Contexts = {
  rootStore: React.createContext(Stores.rootStore),
  routerStore: React.createContext(Stores.routerStore),
}
