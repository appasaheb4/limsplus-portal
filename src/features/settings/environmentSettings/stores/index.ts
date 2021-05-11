import React from "react"

import EnvironmentSettingsStore from "./environmentSettings-store"

export const Stores = {
  enviromentSettingsStore: new EnvironmentSettingsStore(),
}
   
export const Contexts = {
  enviromentSettingsContext: React.createContext(Stores.enviromentSettingsStore),
}
