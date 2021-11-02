import React from "react"

import RegistrationLocationsStore from "./registrationLocations-store"

export const Stores = {
  registrationLocationsStore: new RegistrationLocationsStore(),
}
   
export const Contexts = {
  registrationLocationsContext: React.createContext(
    Stores.registrationLocationsStore
  ),
}
