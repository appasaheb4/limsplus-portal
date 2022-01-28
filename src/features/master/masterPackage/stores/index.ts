import React from "react"

import {MasterPackageStore} from "./masterPackage-store"

export const Stores = {
  masterPackageStore: new MasterPackageStore(),
}
   
export const Contexts = {
  masterPackageContext: React.createContext(Stores.masterPackageStore),
}
