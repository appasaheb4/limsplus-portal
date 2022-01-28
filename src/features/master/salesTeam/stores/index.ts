import React from "react"

import { SalesTeamStore } from "./salesTeam-store"

export const Stores = {
  salesTeamStore: new SalesTeamStore(),
}
   
export const Contexts = {
  salesTeamContext: React.createContext(Stores.salesTeamStore),
}
