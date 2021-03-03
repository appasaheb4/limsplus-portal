import React from "react"
import RootStore from "./rootStore"
import { AsyncTrunk } from "mobx-sync"

const trunk = new AsyncTrunk(RootStore, {
  storage: localStorage,
  storageKey: "__persist_mobx_stores__",
  delay: 1e3,
})

trunk.init()

const Contexts = {
  rootStore: React.createContext(RootStore),
  // loginStore: React.createContext(RootStore.loginStore),
  // userStore: React.createContext(RootStore.userStore),
  // labStore: React.createContext(RootStore.labStore),
  // deginisationStore: React.createContext(RootStore.deginisationStore),
  // departmentStore: React.createContext(RootStore.departmentStore),
  // roleStore: React.createContext(RootStore.roleStore),
  // bannerStore: React.createContext(RootStore.bannerStore),
  // roleMappingStore: React.createContext(RootStore.roleMappingStore),
  // labMappingStore: React.createContext(RootStore.labMappingStore),
  // roleRightsMappingStore: React.createContext(RootStore.roleRightsMappingStore),
  // loginActivityStore: React.createContext(RootStore.loginActivityStore),
  // communicationStore: React.createContext(RootStore.communicationStore),
}

export default Contexts
