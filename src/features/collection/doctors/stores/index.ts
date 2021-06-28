import React from "react"

import DoctorsStore from "./doctors-store"
  
export const Stores = {
  methodsStore: new DoctorsStore(),
}  
      
export const Contexts = {
  methodsContext: React.createContext(Stores.methodsStore),
}
