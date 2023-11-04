/* eslint-disable */
import React, { useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import { ModalIdleTimeout } from '@/library/components';
import Wrapper from './components/wrapper.component';
import Sidebar from './components/sidebar.component';
import Main from './components/main.component';
import Navbar from './components/navbar.component';
import Content from './components/content.component';
import Footer from './components/footer.component';
import Settings from './components/setting.component';
import { useHistory, withRouter } from 'react-router-dom';
import { useIdleTimer } from 'react-idle-timer';

import { toJS } from 'mobx';

import Storage from '@/library/modules/storage';

import { stores } from '@/stores';

import { RouterFlow } from '@/flows';
import { eventEmitter } from '@/core-utils';

// master
import * as Banner from '@/features/master/banner';
import * as Deginisation from '@/features/master/deginisation';
import * as Lab from '@/features/master/labs';
import * as Role from '@/features/settings/roles';
import * as Department from '@/features/master/department';
import * as User from '@/features/settings/users';
import * as RoleMappping from '@/features/settings/mapping/role';
import * as Environment from '@/features/settings/environment';
import * as Lookup from '@/features/master/lookup';
import * as MasterAnalyte from '@/features/master/master-analyte';
import * as TestMaster from '@/features/master/test-master';
import * as PanelMaster from '@/features/master/master-panel';
import * as SampleContainer from '@/features/master/sample-container';
import * as SampleType from '@/features/master/sample-type';
import * as TestSampleMapping from '@/features/master/test-sample-mapping';
import * as TestAnalyteMapping from '@/features/master/test-analyte-mapping';
import * as TestPanelMapping from '@/features/master/test-panel-mapping';
import * as PackageMaster from '@/features/master/master-package';
import * as Methods from '@/features/master/methods';
import * as Doctors from '@/features/master/doctors';
import * as RegistrationLocations from '@/features/master/registration-locations';
import * as CorporateClients from '@/features/master/corporate-clients';
import * as DeliverySchdule from '@/features/master/delivery-schedule';
import * as AdministrativeDivisions from '@/features/master/administrative-divisions';
import * as SalesTeam from '@/features/master/sales-team';
import * as Section from '@/features/master/section';
import * as PossibleResults from '@/features/master/possible-results';
import * as Library from '@/features/master/library';
import * as PriceList from '@/features/master/price-list';
import * as ReferenceRanges from '@/features/master/reference-ranges';
import * as CommentManager from '@/features/master/comment-manager';

// communication
import * as InterfaceManager from '@/features/communication/interface-manager';
import * as DataConveration from '@/features/communication/data-conversation';
import * as HostCommunication from '@/features/communication/host-communication';
import * as InstResultMapping from '@/features/communication/instrument-result-mapping';
import * as TransmittedMessage from '@/features/communication/transmitted-message';
import * as SegmentMapping from '@/features/communication/segment-mapping';

// result entry
import * as GeneralResultEntry from '@/features/result-entry/general-result-entry';

// registration
import * as PatientRegistration from '@/features/registration/patient-registration';
import * as ClientRegistration from '@/features/registration/client-registration';

// report builder
import * as ReportSettings from '@/features/report-builder/report-settings';

// Patient Report
import * as GenerateReport from '@/features/patient-reports/generate-reports';

// Account Receivable
import * as TransactionDetails from '@/features/account-receivable/transaction-details';
import * as Payment from '@/features/account-receivable/payment';
import * as Receipt from '@/features/account-receivable/receipt';

// Validations
import * as PanelApproval from '@/features/validation/panel-approval';

// enquiry
import * as EventLog from '@/features/enquiry/event-logs';

export const RouterService = () => {
  const history: any = useHistory();
  const refreshPage = () => {
    history.replace(window.location.pathname);
  };
  return refreshPage();
};

const Dashboard = ({ children }) => {
  const [modalIdleTime, setModalIdleTime] = useState<any>();
  const history = useHistory();

  const refreshPage = () => {
    history.replace(window.location.pathname);
  };

  const loadApi = async (pathname?: string) => {
    const currentLocation = window.location;
    pathname = pathname || currentLocation.pathname;
    if (pathname !== '/' && stores && stores.loginStore.login) {
      // for every table filer access filter data
      global.filter = undefined;
      // common use api
      await Deginisation.startup();
      await Lab.startup();
      await Role.startup();
      await Department.startup();
      await User.startup();
      await Lookup.startup();
      // lookup item fetch
      RouterFlow.getLookupValues(pathname).then(items => {
        stores.routerStore.updateLookupItems(items);
      });
      // footer view update
      stores.appStore.updateFooterView({ visible: true });
      // specific api load
      if (pathname === '/settings/users') {
        await CorporateClients.startup();
        await RegistrationLocations.startup();
      }
      if (pathname === '/collection/lab') {
        await PriceList.startup();
        await CorporateClients.startup();
      }
      if (pathname === '/collection/banner') await Banner.startup();
      if (
        pathname === '/collection/master-analyte' ||
        pathname === '/collection/test-analyte-mapping' ||
        pathname === '/collection/possible-results' ||
        pathname === '/collection/reference-ranges'
      ) {
        await MasterAnalyte.startup();
        await Methods.startup();
        await InterfaceManager.startup();
        await Library.startup();
      }
      if (
        pathname === '/collection/test-master' ||
        pathname === '/collection/test-sample-mapping' ||
        pathname === '/collection/test-analyte-mapping' ||
        pathname === '/collection/test-panel-mapping'
      ) {
        await TestMaster.startup();
        await Methods.startup();
        await Library.startup();
      }
      if (
        pathname === '/collection/master-panel' ||
        pathname === '/collection/test-panel-mapping' ||
        pathname === '/collection/master-package' ||
        pathname === '/collection/library' ||
        pathname === '/collection/price-list'
      ) {
        await PanelMaster.startup();
        await Methods.startup();
        await Library.startup();
        await ReportSettings.loadTemplatePatientResultList();
      }
      if (
        pathname === '/collection/sample-container' ||
        pathname === '/collection/test-sample-mapping'
      )
        await SampleContainer.startup();
      if (
        pathname === '/collection/sample-type' ||
        pathname === '/collection/test-sample-mapping'
      )
        await SampleType.startup();
      if (pathname === '/collection/test-sample-mapping') {
        await TestSampleMapping.startup();
        await Department.startup();
      }
      if (pathname === '/collection/test-analyte-mapping')
        await TestAnalyteMapping.startup();
      if (pathname === '/collection/test-panel-mapping')
        await TestPanelMapping.startup();
      if (pathname === '/collection/master-package') {
        await PackageMaster.startup();
      }
      if (pathname === '/collection/methods') await Methods.startup();
      if (pathname === '/collection/doctors') {
        await Doctors.startup();
        await AdministrativeDivisions.startup();
        await RegistrationLocations.startup();
        await SalesTeam.startup();
      }
      if (pathname === '/collection/registration-locations') {
        await RegistrationLocations.startup();
        await AdministrativeDivisions.startup();
        await PriceList.startup();
      }
      if (
        pathname === '/collection/corporate-clients' ||
        pathname === '/collection/registration-locations' ||
        pathname === '/collection/price-list'
      ) {
        await CorporateClients.startup();
        await AdministrativeDivisions.startup();
        await SalesTeam.startup();
        await PriceList.startup();
      }
      if (
        pathname === '/collection/delivery-schedule' ||
        pathname === '/collection/test-master' ||
        pathname === '/collection/master-panel'
      )
        await DeliverySchdule.startup();
      if (
        pathname === '/collection/administrative-divisions' ||
        pathname === '/collection/sales-team' ||
        pathname === '/collection/lab'
      )
        await AdministrativeDivisions.startup();
      if (
        pathname === '/collection/sales-team' ||
        pathname === '/collection/lab'
      )
        await SalesTeam.startup();
      if (pathname === '/collection/section') await Section.startup();
      if (pathname === '/collection/possible-results')
        await PossibleResults.startup();
      if (pathname === '/collection/library') await Library.startup();
      if (pathname === '/collection/price-list') await PriceList.startup();
      if (pathname === '/collection/reference-ranges') {
        await ReferenceRanges.startup();
        await InterfaceManager.startup();
      }
      if (pathname === '/collection/comment-manager') {
        await CommentManager.startup();
        await Library.startup();
        await InterfaceManager.startup();
      }
      // settings
      if (pathname === '/settings/environment') await Environment.startup();
      if (pathname === '/settings/mapping/role-mapping')
        await RoleMappping.startup();
      if (pathname === '/communication/interface-manager')
        await InterfaceManager.startup();
      if (pathname === '/communication/mapping/conversation-mapping')
        await DataConveration.startup();
      if (pathname === '/communication/mapping/segment-mapping') {
        await InterfaceManager.startup();
        await SegmentMapping.startup();
      }
      if (pathname === '/communication/host-communication') {
        await InterfaceManager.startup();
        await DataConveration.startup();
        await SegmentMapping.startup();
      }
      if (pathname === '/communication/instrument-result-mapping') {
        await InstResultMapping.startup();
      }
      if (pathname === '/communication/transmitted-message') {
        await TransmittedMessage.startup();
      }
      // registration
      if (pathname === '/registration/patient') {
        await PatientRegistration.startup();
        await Doctors.startup();
        await AdministrativeDivisions.startup();
        await RegistrationLocations.startup();
        await CorporateClients.startup();
        await PanelMaster.startup();
      }
      if (pathname === '/registration/client') {
        await ClientRegistration.startup();
      }
      // result entry
      if (pathname === '/result-entry/general') {
        await GeneralResultEntry.startup();
      }
      if (pathname === '/report-builder/report-settings') {
        await ReportSettings.startup();
        await Library.startup();
      }

      if (pathname === '/patient-reports/generate-report') {
        stores.appStore.updateFooterView({ visible: false });
        stores.reportSettingStore.templatePatientResultService.listTemplatePatientResult();
        await GenerateReport.startup();
        //await ReportSettings.startup();
      } else {
        stores.appStore.updateFooterView({ visible: true });
      }
      if (pathname === '/account-receivable/transaction-details') {
        await TransactionDetails.startup();
      }
      if (pathname === '/account-receivable/payment') {
        await TransactionDetails.startup();
        await Payment.startup();
      }
      if (pathname === '/account-receivable/receipt') {
        await Receipt.startup();
      }
      // validation
      if (pathname === '/validation/panel-approval') {
        await PanelApproval.startup();
      }
      // enquiry
      if (pathname === '/enquiry/event-log') {
        await EventLog.startup();
      }
      stores;
    }
    stores.appStore.updateLoadApi({ count: 1 });
  };

  const router = async () => {
    let router: any = toJS(stores.loginStore.login);
    if (router?.userId) {
      if (router && !stores.routerStore.userRouter) {
        router = router.roleMapping.router;
        stores.routerStore.updateUserRouter(router);
        global.router = router;
      }
    } else {
      stores.loginStore.removeLocalSession().then(() => {
        history.push('/');
      });
    }
  };

  const permission = async () => {
    let selectedCategory: any = await Storage.getItem(
      `__persist_mobx_stores_routerStore_SelectedCategory__`,
    );
    if (selectedCategory) {
      const permission = await RouterFlow.getPermission(
        toJS(stores.routerStore.userRouter),
        selectedCategory.category,
        selectedCategory.item,
      );
      const selectedComp = await RouterFlow.selectedComponents(
        toJS(stores.routerStore.userRouter),
        selectedCategory.category,
        selectedCategory.item,
      );
      stores.routerStore.updateSelectedComponents(selectedComp);
      stores.routerStore.updateUserPermission(permission);
    } else {
      history.push('/dashboard/default');
    }
  };

  useEffect(() => {
    // buz reload page after not showing delete and update so added settimeout
    stores.rootStore.isLogin().then(isLogin => {
      if (!isLogin) history.push('/');
      if (isLogin) {
        router();
        setTimeout(async () => {
          await permission();
        }, 1000);
      }
    });
    eventEmitter.on('reload', data => {
      refreshPage();
    });
    eventEmitter.on('loadApi', data => {
      stores.rootStore.isLogin().then(isLogin => {
        if (isLogin) {
          loadApi();
        }
      });
    });
  }, []);

  // issue come realod then going default dashboard page so added dependancy
  // useEffect(() => {
  //   stores.rootStore.isLogin().then(isLogin => {
  //     loadApi();
  //     // if (!isLogin && !isLogined) history.push('/');
  //     // else {
  //     //   let count = 0;
  //     //   history.listen(async (location, action) => {
  //     //     await loadApi();
  //     //     count = 1;
  //     //   });
  //     //   count == 0 && loadApi();
  //     // }
  //   });
  //   window.scrollTo(0, 0);
  // }, [history.pathname]);

  useEffect(
    () =>
      history.listen(() => {
        stores.rootStore.isLogin().then(isLogin => {
          if (isLogin) {
            loadApi();
          }
        });
      }),
    [],
  );

  // idle item session time
  const handleOnIdle = event => {
    stores.loginStore
      .removeUser()
      .then(async res => {
        if (res.logout.success) {
          setModalIdleTime({
            show: true,
            title: 'Your Session timeout!',
            subTitle: 'Please login again.',
          });
        }
      })
      .catch(() => {
        alert('Your session not timeout. Please try agian.');
      });
  };

  const { getLastActiveTime } = useIdleTimer({
    timeout: 1000 * 60 * (stores.loginStore.login?.sessionTimeoutCount || 10),
    onIdle: handleOnIdle,
    debounce: 500,
  });

  return (
    <React.Fragment>
      <Wrapper>
        <Sidebar />
        <Main className='main dark:bg-boxdark  dark:text-white'>
          <Navbar />
          <Content>{children}</Content>
          <Footer />
        </Main>
      </Wrapper>
      <Settings />
      <ModalIdleTimeout
        {...modalIdleTime}
        onClick={() => {
          history.push('/');
          sessionStorage.removeItem('session');
        }}
      />
    </React.Fragment>
  );
};

export default Dashboard;
