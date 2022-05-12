import React from 'react';

import {RootStore} from './root-store';
import {RouterStore} from './router-store';
import {AppStore} from './app-store';
import {LoginStore} from '@/features/login/stores/login.store';
import {UserStore} from '@/features/settings/users/stores/user.store';
import {LookupStore} from '@/features/master/lookup/stores/lookup.store';
import {SectionStore} from '@/features/master/section/stores/section.store';

// master
import {BannerStore} from '@/features/master/banner/stores/banner.store';
import {LabStore} from '@/features/master/labs/stores/lab.store';
import {SalesTeamStore} from '@/features/master/sales-team/stores/sales-team.store';
import {DeginisationStore} from '@/features/master/deginisation/stores/deginisation.store';
import {DepartmentStore} from '@/features/master/department/stores/department.store';
import {AdministrativeDivisionsStore} from '@/features/master/administrativeDivisions/stores/administrative-divisions.store';
import {MasterAnalyteStore} from '@/features/master/masterAnalyte/stores/master-analyte.store';
import {TestAnalyteMappingStore} from '@/features/master/testAnalyteMapping/stores/test-analyte-mapping.store';
import {TestMasterStore} from '@/features/master/testMaster/stores/test-master.store';
import {DeliveryScheduleStore} from '@/features/master/deliverySchedule/stores/delivery-schedule.store';
import {MasterPanelStore} from '@/features/master/master-panel/stores/master-panel.store';
import {TestPanelMappingStore} from '@/features/master/testPanelMapping/stores/test-panel-mapping.store';
import {MasterPackageStore} from '@/features/master/masterPackage/stores/master-package.store';
import {SampleContainerStore} from '@/features/master/sampleContainer/stores/sample-container.store';
import {SampleTypeStore} from '@/features/master/sampleType/stores/sample-type.store';
import {MethodsStore} from '@/features/master/methods/stores/method.store';
import {TestSampleMappingStore} from '@/features/master/test-sample-mapping/stores/test-sample-mapping.store';
import {CorporateClientsStore} from '@/features/master/corporateClients/stores/corporate-clients.store';
import {DoctorsStore} from '@/features/master/doctors/stores/doctor.store';
import {RegistrationLocationsStore} from '@/features/master/registrationLocations/stores/registration-location.store';
import {PossibleResultsStore} from '@/features/master/possibleResults/stores/possible-result.store';
import {LibraryStore} from '@/features/master/library/stores/library.store';
import {PriceListStore} from '@/features/master/priceList/stores/price-list.store';
import {RefernceRangesStore} from '@/features/master/referenceRanges/stores/reference-ranges.store';

// communication
import {InterfaceManagerStore} from '@/features/communication/interfaceManager/stores/interface-manager.store';
import {DataConversationStore} from '@/features/communication/dataConversation/stores/data-conversation.store';
import {HostCommunicationStore} from '@/features/communication/hostCommunication/stores/host-communication.store';
import {SegmentMappingStore} from '@/features/communication/segmentMapping/stores/segment-mapping.store';

// setting
import {RoleStore} from '@/features/settings/roles/stores/role.store';
import {EnvironmentStore} from '@/features/settings/environment/stores/environment.store';
import {LoginActivityStore} from '@/features/settings/loginActivity/stores/login-activity.store';
import {RoleMappingStore} from '@/features/settings/mapping/role/stores/role-mapping.store';
import {ShortcutMenuStore} from '@/features/settings/shortcutMenu/stores/short-cut-menu.store';
import {NoticeBoardStore} from '@/features/settings/noticeBoard/stores/notice-board.store';

// registation
import {
  PatientManagerStore,
  PatientVisitStore,
  PatientOrderStore,
  PatientTestStore,
  PatientResultStore,
  PatientSampleStore,
  PatientRegistrationStore,
} from '@/features/registration/stores';

import {Store} from './store';
export class Stores extends Store {
  rootStore!: RootStore;
  appStore!: AppStore;
  routerStore!: RouterStore;
  loginStore!: LoginStore;

  // master
  bannerStore!: BannerStore;
  labStore!: LabStore;
  lookupStore!: LookupStore;
  sectionStore!: SectionStore;
  salesTeamStore!: SalesTeamStore;
  deginisationStore!: DeginisationStore;
  departmentStore!: DepartmentStore;
  administrativeDivisions!: AdministrativeDivisionsStore;
  roleStore!: RoleStore;
  masterAnalyteStore!: MasterAnalyteStore;
  testAnalyteMappingStore!: TestAnalyteMappingStore;
  testMasterStore!: TestMasterStore;
  deliveryScheduleStore!: DeliveryScheduleStore;
  masterPanelStore!: MasterPanelStore;
  testPanelMappingStore!: TestPanelMappingStore;
  masterPackageStore!: MasterPackageStore;
  sampleContainerStore!: SampleContainerStore;
  sampleTypeStore!: SampleTypeStore;
  methodsStore!: MethodsStore;
  testSampleMappingStore!: TestSampleMappingStore;
  corporateClientsStore!: CorporateClientsStore;
  doctorsStore!: DoctorsStore;
  registrationLocationsStore!: RegistrationLocationsStore;
  possibleResultsStore!: PossibleResultsStore;
  libraryStore!: LibraryStore;
  priceListStore!: PriceListStore;
  refernceRangesStore!: RefernceRangesStore;

  // communication
  interfaceManagerStore!: InterfaceManagerStore;
  dataConversationStore!: DataConversationStore;
  hostCommunicationStore!: HostCommunicationStore;
  segmentMappingStore!: SegmentMappingStore;

  // settings
  userStore!: UserStore;
  environmentStore!: EnvironmentStore;
  loginActivityStore!: LoginActivityStore;
  roleMappingStore!: RoleMappingStore;
  shortcutMenuStore!: ShortcutMenuStore;
  noticeBoardStore!: NoticeBoardStore;

  // registation
  patientManagerStore!: PatientManagerStore;
  patientVisitStore!: PatientVisitStore;
  patientOrderStore!: PatientOrderStore;
  patientTestStore!: PatientTestStore;
  patientResultStore!: PatientResultStore;
  patientSampleStore!: PatientSampleStore;
  patientRegistrationStore!: PatientRegistrationStore;

  constructor() {
    super();
    this.rootStore = new RootStore();
    this.appStore = new AppStore();
    this.routerStore = new RouterStore();
    this.loginStore = new LoginStore();

    this.bannerStore = new BannerStore();
    this.labStore = new LabStore();
    this.lookupStore = new LookupStore();
    this.sectionStore = new SectionStore();
    this.salesTeamStore = new SalesTeamStore();
    this.deginisationStore = new DeginisationStore();
    this.departmentStore = new DepartmentStore();
    this.administrativeDivisions = new AdministrativeDivisionsStore();
    this.roleStore = new RoleStore();
    this.masterAnalyteStore = new MasterAnalyteStore();
    this.testAnalyteMappingStore = new TestAnalyteMappingStore();
    this.deliveryScheduleStore = new DeliveryScheduleStore();
    this.testMasterStore = new TestMasterStore();
    this.masterPanelStore = new MasterPanelStore();
    this.testPanelMappingStore = new TestPanelMappingStore();
    this.masterPackageStore = new MasterPackageStore();
    this.sampleContainerStore = new SampleContainerStore();
    this.sampleTypeStore = new SampleTypeStore();
    this.methodsStore = new MethodsStore();
    this.testSampleMappingStore = new TestSampleMappingStore();
    this.corporateClientsStore = new CorporateClientsStore();
    this.doctorsStore = new DoctorsStore();
    this.registrationLocationsStore = new RegistrationLocationsStore();
    this.possibleResultsStore = new PossibleResultsStore();
    this.libraryStore = new LibraryStore();
    this.priceListStore = new PriceListStore();
    this.refernceRangesStore = new RefernceRangesStore();

    // communication
    this.interfaceManagerStore = new InterfaceManagerStore();
    this.dataConversationStore = new DataConversationStore();
    this.hostCommunicationStore = new HostCommunicationStore();
    this.segmentMappingStore = new SegmentMappingStore();

    // settings
    this.userStore = new UserStore();
    this.environmentStore = new EnvironmentStore();
    this.loginActivityStore = new LoginActivityStore();
    this.roleMappingStore = new RoleMappingStore();
    this.shortcutMenuStore = new ShortcutMenuStore();
    this.noticeBoardStore = new NoticeBoardStore();

    // registation
    this.patientManagerStore = new PatientManagerStore();
    this.patientVisitStore = new PatientVisitStore();
    this.patientOrderStore = new PatientOrderStore();
    this.patientTestStore = new PatientTestStore();
    this.patientResultStore = new PatientResultStore();
    this.patientSampleStore = new PatientSampleStore();
    this.patientRegistrationStore = new PatientRegistrationStore();
  }
}

export const stores = new Stores();
export const StoresContext = React.createContext(stores);
export const useStores = () => React.useContext(StoresContext);
