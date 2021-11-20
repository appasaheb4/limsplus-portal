import React from "react"

import { RootStore } from "./rootStore"
import { RouterStore } from "./routerStore"
import { AppStore } from "./appStore"
import { LoginStore } from "@lp/features/login/stores/LoginStore"
import { UserStore } from "@lp/features/settings/users/stores/UsersStore"
import { LookupStore } from "@lp/features/collection/lookup/stores/lookup-store"
import { SectionStore } from "@lp/features/collection/section/stores/section-store"

// master
import { BannerStore } from "@lp/features/collection/banner/stores/banner-store"
import { LabStore } from "@lp/features/collection/labs/stores/lab-store"
import { SalesTeamStore } from "@lp/features/collection/salesTeam/stores/salesTeam-store"
import { DeginisationStore } from "@lp/features/collection/deginisation/stores/deginisation-store"
import { DepartmentStore } from "@lp/features/collection/department/stores/department-store"
import { AdministrativeDivisionsStore } from "@lp/features/collection/administrativeDivisions/stores/administrativeDivisions-store"
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
import { PossibleResultsStore } from "@lp/features/collection/possibleResults/stores/possibleResults-store"
import { LibraryStore } from "@lp/features/collection/library/stores/library-store"
import { PriceListStore } from "@lp/features/collection/priceList/stores/priceList-store"
import { RefernceRangesStore } from "@lp/features/collection/referenceRanges/stores/referenceRanges-store"

// communication
import { InterfaceManagerStore } from "@lp/features/communication/interfaceManager/stores/interfaceManager-store"
import { DataConversationStore } from "@lp/features/communication/dataConversation/stores/dataConversation-store"
import { HostCommunicationStore } from "@lp/features/communication/hostCommunication/stores/hostCommunication-store"
import { SegmentMappingStore } from "@lp/features/communication/segmentMapping/stores/segmentMapping-store"

// setting
import { RoleStore } from "@lp/features/settings/roles/stores/role-store"
import { EnvironmentStore } from "@lp/features/settings/environment/stores/EnvironmentStore"
import { LoginActivityStore } from "@lp/features/settings/loginActivity/stores/loginActivity-store"
import { RoleMappingStore } from "@lp/features/settings/mapping/role/stores/rolemapping-store"
import { ShortcutMenuStore } from "@lp/features/settings/shortcutMenu/stores/shortcutMenu-store"
import { NoticeBoardStore } from "@lp/features/settings/noticeBoard/stores/noticeBoard-store"

import { Store } from "./Store"
export class Stores extends Store {
  rootStore!: RootStore
  appStore!: AppStore
  routerStore!: RouterStore
  loginStore!: LoginStore

  // master
  bannerStore!: BannerStore
  labStore!: LabStore
  lookupStore!: LookupStore
  sectionStore!: SectionStore
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
  possibleResultsStore!: PossibleResultsStore
  libraryStore!: LibraryStore
  priceListStore!: PriceListStore
  refernceRangesStore!: RefernceRangesStore

  // communication
  interfaceManagerStore!: InterfaceManagerStore
  dataConversationStore!: DataConversationStore
  hostCommunicationStore!: HostCommunicationStore
  segmentMappingStore!: SegmentMappingStore

  // settings
  userStore!: UserStore
  environmentStore!: EnvironmentStore
  loginActivityStore!: LoginActivityStore
  roleMappingStore!: RoleMappingStore
  shortcutMenuStore!: ShortcutMenuStore
  noticeBoardStore!: NoticeBoardStore
     
  constructor() {
    super()
    this.rootStore = new RootStore()
    this.appStore = new AppStore()
    this.routerStore = new RouterStore()
    this.loginStore = new LoginStore()

    this.bannerStore = new BannerStore()
    this.labStore = new LabStore()
    this.lookupStore = new LookupStore()
    this.sectionStore = new SectionStore()
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
    this.possibleResultsStore = new PossibleResultsStore()
    this.libraryStore = new LibraryStore()
    this.priceListStore = new PriceListStore()
    this.refernceRangesStore = new RefernceRangesStore()

    // communication
    this.interfaceManagerStore = new InterfaceManagerStore()
    this.dataConversationStore = new DataConversationStore()
    this.hostCommunicationStore = new HostCommunicationStore()
    this.segmentMappingStore = new SegmentMappingStore()

    // settings
    this.userStore = new UserStore()
    this.environmentStore = new EnvironmentStore()
    this.loginActivityStore = new LoginActivityStore()
    this.roleMappingStore = new RoleMappingStore()
    this.shortcutMenuStore = new ShortcutMenuStore()
    this.noticeBoardStore = new NoticeBoardStore()
  }
}

export const stores = new Stores()
export const StoresContext = React.createContext(stores)
export const useStores = () => React.useContext(StoresContext)
