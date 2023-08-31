import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import _ from 'lodash';
import {AutoCompleteFilterSingleSelectMultiFieldsDisplay} from '@/library/components';
import {useStores} from '@/stores';

interface InvestigationDetailsProps {
  investigationType: string;
  isError?: boolean;
  onSelect: (items: any) => void;
}

export const InvestigationDetails = observer(
  ({investigationType, isError, onSelect}: InvestigationDetailsProps) => {
    const {
      loading,
      masterPanelStore,
      masterPackageStore,
      testMasterStore,
      masterAnalyteStore,
      commentManagerStore,
    } = useStores();

    useEffect(() => {
      if (investigationType) investigationMasterLoad();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [investigationType]);

    const investigationMasterLoad = (type = investigationType) => {
      if (type)
        switch (type) {
          case 'PANEL':
            return masterPanelStore.masterPanelService.listPanelMaster();
          case 'PACKAGE':
            return masterPackageStore.masterPackageService.listPackageMaster();
          case 'TEST':
            return testMasterStore.testMasterService.listTestMaster();
          case 'ANALYTE':
            return masterAnalyteStore.masterAnalyteService.listAnalyteMaster();
          default:
            alert('Not found data. Please contact to admin');
        }
    };

    const getInvestigationDetails = (
      type = commentManagerStore.commentManager.investigationType,
    ) => {
      if (type)
        switch (type) {
          case 'PANEL':
            return {
              list: masterPanelStore.listMasterPanel,
              fields: ['panelCode', 'panelName'],
              filterFun: value =>
                masterPanelStore.masterPanelService.filterByFields({
                  input: {
                    filter: {
                      fields: ['panelCode', 'panelName'],
                      srText: value,
                    },
                    page: 0,
                    limit: 10,
                  },
                }),
            };
          case 'PACKAGE':
            return {
              list: _.uniqBy(
                masterPackageStore?.listMasterPackage,
                'packageCode',
              ),
              fields: ['packageCode', 'packageName'],
              filterFun: value =>
                masterPackageStore.masterPackageService.filterByFields({
                  input: {
                    filter: {
                      fields: ['packageCode', 'packageName'],
                      srText: value,
                    },
                    page: 0,
                    limit: 10,
                  },
                }),
            };
          case 'TEST':
            return {
              list: testMasterStore.listTestMaster,
              fields: ['testCode', 'testName'],
              filterFun: value =>
                testMasterStore.testMasterService.filterByFields({
                  input: {
                    filter: {
                      fields: ['testCode', 'testName'],
                      srText: value,
                    },
                    page: 0,
                    limit: 10,
                  },
                }),
            };
          case 'ANALYTE':
            return {
              list: masterAnalyteStore.listMasterAnalyte,
              fields: ['analyteCode', 'analyteName'],
              filterFun: value =>
                masterAnalyteStore.masterAnalyteService.filterByFields({
                  input: {
                    filter: {
                      fields: ['analyteCode', 'analyteName'],
                      srText: value,
                    },
                    page: 0,
                    limit: 10,
                  },
                }),
            };
          default:
            alert('Not found data. Please contact to admin');
        }
    };
    return (
      <div>
        <AutoCompleteFilterSingleSelectMultiFieldsDisplay
          loader={loading}
          data={{
            list: getInvestigationDetails()?.list,
            displayKey: getInvestigationDetails()?.fields,
          }}
          placeholder='Search'
          hasError={isError}
          onFilter={(value: string) => {
            getInvestigationDetails()?.filterFun(value);
          }}
          onSelect={item => {
            onSelect({
              investigationCode:
                item[getInvestigationDetails()?.fields[0] as string],
              investigationName:
                item[getInvestigationDetails()?.fields[1] as string],
            });
          }}
        />
      </div>
    );
  },
);
