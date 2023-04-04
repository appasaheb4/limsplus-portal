import React from 'react';
import {observer} from 'mobx-react';
import {
  List,
  Form,
} from '@/library/components';
import {useStores} from '@/stores';

interface GeneralProps {
  label?: string;
}

export const General = observer(({label}: GeneralProps) => {
  const {reportSettingStore} = useStores();
  return (
    <List direction='col' space={1} justify='stretch' fill>
      <div className='flex flex-row flex-auto object-fill gap-2'>
        <Form.MultilineInput
          label='Print Department Name CSS'
          className='w-4/6'
          style={{color: '#ffffff', backgroundColor: '#000000'}}
          placeholder={"Like fontSize: 12,backgroundColor:'#000000'"}
          value={reportSettingStore.reportBody?.general?.printDepartmentNameCSS}
          onChange={printDepartmentNameCSS => {
            reportSettingStore.updateReportBody({
              ...reportSettingStore.reportBody,
              general: {
                ...reportSettingStore.reportBody?.general,
                printDepartmentNameCSS,
              },
            });
          }}
        />
        <Form.Toggle
          isToggleLabel={false}
          label='Print Department Name'
          className='w-2/6'
          value={reportSettingStore.reportBody?.general?.isPrintDepartmentName}
          onChange={isPrintDepartmentName => {
            reportSettingStore.updateReportBody({
              ...reportSettingStore.reportBody,
              general: {
                ...reportSettingStore.reportBody?.general,
                isPrintDepartmentName,
              },
            });
          }}
        />
      </div>
      <div className='flex flex-row flex-auto object-fill gap-2'>
        <Form.MultilineInput
          label='Package Name Print CSS'
          className='w-4/6'
          style={{color: '#ffffff', backgroundColor: '#000000'}}
          placeholder={"Like fontSize: 12,backgroundColor:'#000000'"}
          value={reportSettingStore.reportBody?.general?.packageNamePrintCSS}
          onChange={packageNamePrintCSS => {
            reportSettingStore.updateReportBody({
              ...reportSettingStore.reportBody,
              general: {
                ...reportSettingStore.reportBody?.general,
                packageNamePrintCSS,
              },
            });
          }}
        />
        <Form.Toggle
          isToggleLabel={false}
          label='Package Name Print'
          className='w-2/6'
          value={reportSettingStore.reportBody?.general?.isPackageNamePrint}
          onChange={isPackageNamePrint => {
            reportSettingStore.updateReportBody({
              ...reportSettingStore.reportBody,
              general: {
                ...reportSettingStore.reportBody?.general,
                isPackageNamePrint,
              },
            });
          }}
        />
      </div>
      <div className='flex flex-row flex-auto object-fill gap-2'>
        <Form.MultilineInput
          label='Report Grouping CSS'
          className='w-4/6'
          style={{color: '#ffffff', backgroundColor: '#000000'}}
          placeholder={"Like fontSize: 12,backgroundColor:'#000000'"}
          value={reportSettingStore.reportBody?.general?.reportGroupingCSS}
          onChange={reportGroupingCSS => {
            reportSettingStore.updateReportBody({
              ...reportSettingStore.reportBody,
              general: {
                ...reportSettingStore.reportBody?.general,
                reportGroupingCSS,
              },
            });
          }}
        />
        <Form.Toggle
          isToggleLabel={false}
          label='Report Grouping'
          className='w-2/6'
          value={reportSettingStore.reportBody?.general?.isReportGrouping}
          onChange={isReportGrouping => {
            reportSettingStore.updateReportBody({
              ...reportSettingStore.reportBody,
              general: {
                ...reportSettingStore.reportBody?.general,
                isReportGrouping,
              },
            });
          }}
        />
      </div>
      <div className='flex flex-row flex-auto object-fill gap-2'>
        <Form.MultilineInput
          label='Report Order CSS'
          className='w-4/6'
          style={{color: '#ffffff', backgroundColor: '#000000'}}
          placeholder={"Like fontSize: 12,backgroundColor:'#000000'"}
          value={reportSettingStore.reportBody?.general?.reportOrderCSS}
          onChange={reportOrderCSS => {
            reportSettingStore.updateReportBody({
              ...reportSettingStore.reportBody,
              general: {
                ...reportSettingStore.reportBody?.general,
                reportOrderCSS,
              },
            });
          }}
        />
        <Form.Toggle
          isToggleLabel={false}
          label='Report Order'
          className='w-2/6'
          value={reportSettingStore.reportBody?.general?.isReportOrder}
          onChange={isReportOrder => {
            reportSettingStore.updateReportBody({
              ...reportSettingStore.reportBody,
              general: {
                ...reportSettingStore.reportBody?.general,
                isReportOrder,
              },
            });
          }}
        />
      </div>
      <div className='flex flex-row flex-auto object-fill gap-2'>
        <Form.MultilineInput
          label='Method Flag CSS'
          className='w-4/6'
          style={{color: '#ffffff', backgroundColor: '#000000'}}
          placeholder={"Like fontSize: 12,backgroundColor:'#000000'"}
          value={reportSettingStore.reportBody?.general?.methodFlagCSS}
          onChange={methodFlagCSS => {
            reportSettingStore.updateReportBody({
              ...reportSettingStore.reportBody,
              general: {
                ...reportSettingStore.reportBody?.general,
                methodFlagCSS,
              },
            });
          }}
        />
        <Form.Toggle
          isToggleLabel={false}
          label='Method Flag'
          className='w-2/6'
          value={reportSettingStore.reportBody?.general?.isMethodFlag}
          onChange={isMethodFlag => {
            reportSettingStore.updateReportBody({
              ...reportSettingStore.reportBody,
              general: {
                ...reportSettingStore.reportBody?.general,
                isMethodFlag,
              },
            });
          }}
        />
      </div>
    </List>
  );
});
