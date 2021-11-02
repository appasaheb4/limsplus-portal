import React from "react"

import { RootStore } from "./rootStore"
import { RouterStore } from "./routerStore"
import { AppStore } from "./appStore"
import { LoginStore } from "@lp/features/login/stores/LoginStore"
import { UserStore } from "@lp/features/users/stores/UsersStore"
import { LookupStore } from "@lp/features/collection/lookup/stores/lookup-store"
import { SectionStore } from "@lp/features/collection/section/stores/section-store"
import { InterfaceManagerStore } from "@lp/features/communication/stores/interfaceManager-store"

// master
import { LabStore } from "@lp/features/collection/labs/stores/lab-store"
import { SalesTeamStore } from "@lp/features/collection/salesTeam/stores/salesTeam-store"
import { DeginisationStore } from "@lp/features/collection/deginisation/stores/deginisation-store"
import { DepartmentStore } from "@lp/features/collection/department/stores/department-store"
import { AdministrativeDivisionsStore } from "@lp/features/collection/administrativeDivisions/stores/administrativeDivisions-store"
import { RoleStore } from "@lp/features/collection/roles/stores/role-store"
import { MasterAnalyteStore } from "@lp/features/collection/masterAnalyte/stores/masterAnalyte-store"
import { TestAnalyteMappingStore } from "@lp/features/collection/testAnalyteMapping/stores/testAnalyteMapping-store"
import { TestMasterStore } from "@lp/features/collection/testMaster/stores/testMaster-store"
import { DeliveryScheduleStore } from "@lp/features/collection/deliverySchedule/stores/deliverySchedule-store"

// setting
import { EnvironmentStore } from "@lp/features/settings/environment/stores/EnvironmentStore"

import { Store } from "./Store"
export class Stores extends Store {
  rootStore!: RootStore
  appStore!: AppStore
  routerStore!: RouterStore
  loginStore!: LoginStore
  userStore!: UserStore

  // master
  labStore!: LabStore
  lookupStore!: LookupStore
  sectionStore!: SectionStore
  interfaceManagerStore!: InterfaceManagerStore
  salesTeamStore!: SalesTeamStore
  deginisationStore!: DeginisationStore
  departmentStore!: DepartmentStore
  administrativeDivisions!: AdministrativeDivisionsStore
  roleStore!: RoleStore
  masterAnalyteStore!: MasterAnalyteStore
  testAnalyteMappingStore!: TestAnalyteMappingStore
  testMasterStore!: TestMasterStore
  deliveryScheduleStore!: DeliveryScheduleStore

  // settings
  environmentStore!: EnvironmentStore

  constructor() {
    super()
    this.rootStore = new RootStore()
    this.appStore = new AppStore()
    this.routerStore = new RouterStore()
    this.loginStore = new LoginStore()

    this.labStore = new LabStore()
    this.lookupStore = new LookupStore()
    this.sectionStore = new SectionStore()
    this.interfaceManagerStore = new InterfaceManagerStore()
    this.salesTeamStore = new SalesTeamStore()
    this.deginisationStore = new DeginisationStore()
    this.departmentStore = new DepartmentStore()
    this.administrativeDivisions = new AdministrativeDivisionsStore()
    this.roleStore = new RoleStore()
    this.masterAnalyteStore = new MasterAnalyteStore()
    this.testAnalyteMappingStore = new TestAnalyteMappingStore()
    this.deliveryScheduleStore = new DeliveryScheduleStore()
    this.testMasterStore = new TestMasterStore()

    // settings
    this.environmentStore = new EnvironmentStore()
    setTimeout(() => {
      this.userStore = new UserStore()
    }, 100)  
  }
  updateLoginStore() {
    this.loginStore = new LoginStore()
  }
}

export const stores = new Stores()
export const StoresContext = React.createContext(stores)
export const useStores = () => React.useContext(StoresContext)
