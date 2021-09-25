import React from "react"

import {EnvironmentStore} from "./environment-store"

export const Stores = {
  enviromentStore: new EnvironmentStore(),
}
   
export const Contexts = {
  enviromentContext: React.createContext(Stores.enviromentStore),
}
