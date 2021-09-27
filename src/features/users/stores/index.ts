import React from "react"

import { UsersStore } from "./UsersStore"

export const Stores = {
  userStore: new UsersStore(),
}

export const Contexts = {
  userContext: React.createContext(Stores.userStore),
}
