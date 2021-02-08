import React from "react"
import RootStore from "./rootStore"
import { AsyncTrunk } from "mobx-sync"

const trunk = new AsyncTrunk(RootStore, {
  storage: localStorage,
  storageKey: "__persist_mobx_stores__",
  delay: 1e3,
})

trunk.init().then(() => {
  RootStore.labStore.fetchListLab()
  RootStore.bannerStore.fetchListBanner()
  RootStore.deginisationStore.fetchListDeginisation()
  RootStore.departmentStore.fetchListDepartment()
  RootStore.roleStore.fetchListRole()
  RootStore.userStore.loadUser()
  RootStore.roleMappingStore.fetchUserMappingList()
})

const Contexts = {
  rootStore: React.createContext(RootStore),
  userStore: React.createContext(RootStore.userStore),
  labStore: React.createContext(RootStore.labStore),
  deginisationStore: React.createContext(RootStore.deginisationStore),
  departmentStore: React.createContext(RootStore.departmentStore),
  roleStore: React.createContext(RootStore.roleStore),
  bannerStore: React.createContext(RootStore.bannerStore),
  roleMappingStore: React.createContext(RootStore.roleMappingStore),
  labMappingStore: React.createContext(RootStore.labMappingStore),
  roleRightsMappingStore: React.createContext(RootStore.roleRightsMappingStore),
}

export default Contexts
