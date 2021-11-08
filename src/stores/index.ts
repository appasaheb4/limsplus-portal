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
import { MasterPanelStore } from "@lp/features/collection/masterPanel/stores/masterPanel-store"
import { TestPanelMappingStore } from "@lp/features/collection/testPanelMapping/stores/testPanelMapping-store"
import { MasterPackageStore } from "@lp/features/collection/masterPackage/stores/masterPackage-store"
import { SampleContainerStore } from "@lp/features/collection/sampleContainer/stores/sampleContainer-store"
import { SampleTypeStore } from "@lp/features/collection/sampleType/stores/sampleType-store"
import { MethodsStore } from "@lp/features/collection/methods/stores/methods-store"
import { TestSampleMappingStore } from "@lp/features/collection/testSampleMapping/stores/testSampleMapping-store"
import { CorporateClientsStore } from "@lp/features/collection/corporateClients/stores/corporateClients-store"
import { DoctorsStore } from "@lp/features/collection/doctors/stores/doctors-store"
import { RegistrationLocationsStore } from "@lp/features/collection/registrationLocations/stores/registrationLocations-store"

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
  masterPanelStore!: MasterPanelStore
  testPanelMappingStore!: TestPanelMappingStore
  masterPackageStore!: MasterPackageStore
  sampleContainerStore!: SampleContainerStore
  sampleTypeStore!: SampleTypeStore
  methodsStore!: MethodsStore
  testSampleMappingStore!: TestSampleMappingStore
  corporateClientsStore!: CorporateClientsStore
  doctorsStore!: DoctorsStore
  registrationLocationsStore!: RegistrationLocationsStore

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
    this.masterPanelStore = new MasterPanelStore()
    this.testPanelMappingStore = new TestPanelMappingStore()
    this.masterPackageStore = new MasterPackageStore()
    this.sampleContainerStore = new SampleContainerStore()
    this.sampleTypeStore = new SampleTypeStore()
    this.methodsStore = new MethodsStore()
    this.testSampleMappingStore = new TestSampleMappingStore()
    this.corporateClientsStore = new CorporateClientsStore()
    this.doctorsStore = new DoctorsStore()
    this.registrationLocationsStore = new RegistrationLocationsStore()

    // settings
    this.userStore = new UserStore()
    this.environmentStore = new EnvironmentStore()
  }
  updateLoginStore() {
    this.loginStore = new LoginStore()
  }
}

export const stores = new Stores()
export const StoresContext = React.createContext(stores)
export const useStores = () => React.useContext(StoresContext)
