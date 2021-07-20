import React from "react"

import { PossibleResultsStore } from "./possibleResults-store"

export const Stores = {
  possibleResultsStore: new PossibleResultsStore(),
}

export const Contexts = {
  possibleResultsContext: React.createContext(Stores.possibleResultsStore),
}    
