import React from "react"

import RootStore from "./rootStore"
import RouterStore from "./routerStore"
import AppStore from "./appStore"
import {LoginStore} from "@lp/features/login/stores/login-store"
import { UsersStore } from "@lp/features/users/stores/UsersStore"
import LookupStore from "@lp/features/collection/lookup/stores/lookup-store"
import SectionStore from "@lp/features/collection/section/stores/section-store"
import { InterfaceManagerStore } from "@lp/features/communication/stores/interfaceManager-store"


import { Store } from "./Store"
import { action } from "mobx"

export class Stores extends Store {
  rootStore!: RootStore
  appStore!: AppStore
  routerStore!: RouterStore
  loginStore!: LoginStore
  userStore!: UsersStore
  lookupStore!: LookupStore
  sectionStore!: SectionStore
  interfaceManagerStore!: InterfaceManagerStore
  
  constructor() {
    super()
    this.rootStore = new RootStore()
    this.appStore = new AppStore()
    this.routerStore = new RouterStore()
    this.loginStore = new LoginStore()
   // this.userStore = new UsersStore()
    this.lookupStore = new LookupStore()
    this.sectionStore = new SectionStore()
    this.interfaceManagerStore = new InterfaceManagerStore()
  }
  
  updateLoginStore() {
    this.loginStore = new LoginStore()
  }
}

export const stores = new Stores()
export const StoresContext = React.createContext(stores)
export const useStores = () => React.useContext(StoresContext)
