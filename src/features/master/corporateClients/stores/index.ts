import React from "react"

import {CorporateClientsStore} from "./corporateClients-store"

export const Stores = {
  corporateClientsStore: new CorporateClientsStore(),
}
   
export const Contexts = {
  corporateClientsContext: React.createContext(Stores.corporateClientsStore),
}
