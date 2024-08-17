import React from 'react';

import { Store } from './store';

import { RootStore } from './root.store';
import { RouterStore } from './router.store';
import { AppStore } from './app.store';
import { LoginStore } from '@/features/login/stores/login.store';
import { UserStore } from '@/features/settings/users/stores/user.store';
import { SectionStore } from '@/features/master/section/stores/section.store';

// master
import { BannerStore } from '@/features/master/banner/stores/banner.store';
import { LabStore } from '@/features/master/labs/stores/lab.store';
import { SalesTeamStore } from '@/features/master/sales-team/stores/sales-team.store';
import { DeginisationStore } from '@/features/master/deginisation/stores/deginisation.store';
import { DepartmentStore } from '@/features/master/department/stores/department.store';
import { AdministrativeDivisionsStore } from '@/features/master/administrative-divisions/stores/administrative-divisions.store';
import { MasterAnalyteStore } from '@/features/master/master-analyte/stores/master-analyte.store';
import { TestAnalyteMappingStore } from '@/features/master/test-analyte-mapping/stores/test-analyte-mapping.store';
import { TestMasterStore } from '@/features/master/test-master/stores/test-master.store';
import { DeliveryScheduleStore } from '@/features/master/delivery-schedule/stores/delivery-schedule.store';
import { MasterPanelStore } from '@/features/master/master-panel/stores/master-panel.store';
import { TestPanelMappingStore } from '@/features/master/test-panel-mapping/stores/test-panel-mapping.store';
import { MasterPackageStore } from '@/features/master/master-package/stores/master-package.store';
import { SampleContainerStore } from '@/features/master/sample-container/stores/sample-container.store';
import { SampleTypeStore } from '@/features/master/sample-type/stores/sample-type.store';
import { MethodsStore } from '@/features/master/methods/stores/method.store';
import { TestSampleMappingStore } from '@/features/master/test-sample-mapping/stores/test-sample-mapping.store';
import { CorporateClientsStore } from '@/features/master/corporate-clients/stores/corporate-clients.store';
import { DoctorsStore } from '@/features/master/doctors/stores/doctor.store';
import { RegistrationLocationsStore } from '@/features/master/registration-locations/stores/registration-location.store';
import { PossibleResultsStore } from '@/features/master/possible-results/stores/possible-result.store';
import { LibraryStore } from '@/features/master/library/stores/library.store';
import { PriceListStore } from '@/features/master/price-list/stores/price-list.store';
import { RefernceRangesStore } from '@/features/master/reference-ranges/stores/reference-ranges.store';
import { CommentManagerStore } from '@/features/master/comment-manager/stores/comment-manager.store';

// communication
import { InterfaceManagerStore } from '@/features/communication/interface-manager/stores/interface-manager.store';
import { DataConversationStore } from '@/features/communication/data-conversation/stores/data-conversation.store';
import { HostCommunicationStore } from '@/features/communication/host-communication/stores/host-communication.store';
import { SegmentMappingStore } from '@/features/communication/segment-mapping/stores/segment-mapping.store';
import { InstResultMappingStore } from '@/features/communication/instrument-result-mapping/stores/inst-result-mapping.store';
import { TransmittedMessageStore } from '@/features/communication/transmitted-message/stores/transmitted-message.store';

// report builder
import { ReportSettingStore } from '@/features/report-builder/report-settings/stores';

// setting
import { RoleStore } from '@/features/settings/roles/stores/role.store';
import { EnvironmentStore } from '@/features/settings/environment/stores/environment.store';
import { LoginActivityStore } from '@/features/settings/login-activity/stores/login-activity.store';
import { RoleMappingStore } from '@/features/settings/mapping/role/stores/role-mapping.store';
import { ShortcutMenuStore } from '@/features/settings/shortcut-menu/stores/short-cut-menu.store';
import { NoticeBoardStore } from '@/features/settings/notice-board/stores/notice-board.store';
import { CompanyStore } from '@/features/settings/company/stores';
import { LookupStore } from '@/features/settings/lookup/stores/lookup.store';

// registation
import {
  PatientManagerStore,
  PatientVisitStore,
  PatientOrderStore,
  PatientTestStore,
  PatientResultStore,
  PatientSampleStore,
  PatientRegistrationStore,
  ImportFromFileStore,
} from '@/features/registration/patient-registration/stores';
import { ClientRegistrationStore } from '@/features/registration/client-registration/stores';

// Result Entry
import { GeneralResultEntryStore } from '@/features/result-entry/general-result-entry/stores';

// Patient Report
import { DeliveryQueueStore } from '@/features/patient-reports/delivery-queue/stores';
import { GenerateReportsStore } from '@/features/patient-reports/generate-reports/stores';

// Account Receivable
import { TransactionDetailsStore } from '@/features/account-receivable/transaction-details/stores';
import { PaymentStore } from '@/features/account-receivable/payment/stores';
import { ReceiptStore } from '@/features/account-receivable/receipt/stores';
import { BillSummaryStore } from '@/features/account-receivable/bill-summary/stores';

// validation
import { PanelApprovalStore } from '@/features/validation/panel-approval/stores';

// enquiry
import { EventLogsStore } from '@/features/enquiry/event-logs/stores';
import { TatMasterStore } from '@/features/master/tat-master/stores/tat-master.store';
import { HolidayMasterStore } from '@/features/master/holiday-master/stores/holiday-master.store';

export class Stores extends Store {
  rootStore!: RootStore;
  appStore!: AppStore;
  routerStore!: RouterStore;
  loginStore!: LoginStore;

  // master
  bannerStore!: BannerStore;
  labStore!: LabStore;
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
  commentManagerStore!: CommentManagerStore;
  tatMasterStore!: TatMasterStore;
  holidayMasterStore!: HolidayMasterStore;

  // communication
  interfaceManagerStore!: InterfaceManagerStore;
  dataConversationStore!: DataConversationStore;
  hostCommunicationStore!: HostCommunicationStore;
  segmentMappingStore!: SegmentMappingStore;
  instResultMappingStore!: InstResultMappingStore;
  transmittedMessageStore!: TransmittedMessageStore;

  // settings
  userStore!: UserStore;
  environmentStore!: EnvironmentStore;
  loginActivityStore!: LoginActivityStore;
  roleMappingStore!: RoleMappingStore;
  shortcutMenuStore!: ShortcutMenuStore;
  noticeBoardStore!: NoticeBoardStore;
  companyStore!: CompanyStore;
  lookupStore!: LookupStore;

  // registration
  patientManagerStore!: PatientManagerStore;
  patientVisitStore!: PatientVisitStore;
  patientOrderStore!: PatientOrderStore;
  patientTestStore!: PatientTestStore;
  patientResultStore!: PatientResultStore;
  patientSampleStore!: PatientSampleStore;
  patientRegistrationStore!: PatientRegistrationStore;
  clientRegistrationStore!: ClientRegistrationStore;
  importFromFileStore!: ImportFromFileStore;

  // result entry
  generalResultEntryStore!: GeneralResultEntryStore;

  // report builder
  reportSettingStore!: ReportSettingStore;

  // patient report
  deliveryQueueStore!: DeliveryQueueStore;
  generateReportsStore!: GenerateReportsStore;

  // account receivable
  transactionDetailsStore!: TransactionDetailsStore;
  paymentStore!: PaymentStore;
  receiptStore!: ReceiptStore;
  billSummaryStore!: BillSummaryStore;

  // validation
  panelApprovalStore!: PanelApprovalStore;

  // enquiry
  eventLogsStore!: EventLogsStore;

  constructor() {
    super();
    this.rootStore = new RootStore();
    this.appStore = new AppStore();
    this.routerStore = new RouterStore();
    this.loginStore = new LoginStore();

    this.bannerStore = new BannerStore();
    this.labStore = new LabStore();
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
    this.commentManagerStore = new CommentManagerStore();
    this.tatMasterStore = new TatMasterStore();
    this.holidayMasterStore = new HolidayMasterStore();

    // communication
    this.interfaceManagerStore = new InterfaceManagerStore();
    this.dataConversationStore = new DataConversationStore();
    this.hostCommunicationStore = new HostCommunicationStore();
    this.segmentMappingStore = new SegmentMappingStore();
    this.instResultMappingStore = new InstResultMappingStore();
    this.transmittedMessageStore = new TransmittedMessageStore();

    // settings
    this.userStore = new UserStore();
    this.environmentStore = new EnvironmentStore();
    this.loginActivityStore = new LoginActivityStore();
    this.roleMappingStore = new RoleMappingStore();
    this.shortcutMenuStore = new ShortcutMenuStore();
    this.noticeBoardStore = new NoticeBoardStore();
    this.companyStore = new CompanyStore();
    this.lookupStore = new LookupStore();

    // registration
    this.patientManagerStore = new PatientManagerStore();
    this.patientVisitStore = new PatientVisitStore();
    this.patientOrderStore = new PatientOrderStore();
    this.patientTestStore = new PatientTestStore();
    this.patientResultStore = new PatientResultStore();
    this.patientSampleStore = new PatientSampleStore();
    this.patientRegistrationStore = new PatientRegistrationStore();
    this.clientRegistrationStore = new ClientRegistrationStore();
    this.importFromFileStore = new ImportFromFileStore();

    // result entry
    this.generalResultEntryStore = new GeneralResultEntryStore();

    // report builder
    this.reportSettingStore = new ReportSettingStore();

    // patient report
    this.deliveryQueueStore = new DeliveryQueueStore();
    this.generateReportsStore = new GenerateReportsStore();

    // account receivable
    this.transactionDetailsStore = new TransactionDetailsStore();
    this.paymentStore = new PaymentStore();
    this.receiptStore = new ReceiptStore();
    this.billSummaryStore = new BillSummaryStore();

    // validation
    this.panelApprovalStore = new PanelApprovalStore();

    // enquiry
    this.eventLogsStore = new EventLogsStore();
  }
}

export const stores = new Stores();
export const StoresContext = React.createContext(stores);
export const useStores = () => React.useContext(StoresContext);
