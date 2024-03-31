import React from 'react';
import { observer } from 'mobx-react';
import { List, Form } from '@/library/components';
import { useStores } from '@/stores';
import { CSSMultiline } from '../..';

interface TestProps {
  label?: string;
}

export const Test = observer(({ label }: TestProps) => {
  const { reportSettingStore } = useStores();
  return (
    <List direction='col' space={1} justify='stretch' fill>
      <div className='flex flex-row flex-auto object-fill gap-2'>
        <CSSMultiline
          label='Print Test Name CSS'
          placeholder={"Like fontSize: 12,backgroundColor:'#000000'"}
          defaultValue={reportSettingStore.reportBody?.test?.printTestNameCSS}
          onChange={printTestNameCSS => {
            reportSettingStore.updateReportBody({
              ...reportSettingStore.reportBody,
              test: {
                ...reportSettingStore.reportBody?.test,
                printTestNameCSS,
              },
            });
          }}
        />
        <Form.Toggle
          isToggleLabel={false}
          label='Print Test Name'
          className='w-2/6'
          value={reportSettingStore.reportBody?.test?.isPrintTestName}
          onChange={isPrintTestName => {
            reportSettingStore.updateReportBody({
              ...reportSettingStore.reportBody,
              test: {
                ...reportSettingStore.reportBody?.test,
                isPrintTestName,
              },
            });
          }}
        />
      </div>

      <div className='flex flex-row flex-auto object-fill gap-2'>
        <CSSMultiline
          label='Method Name CSS'
          style={{ color: '#ffffff', backgroundColor: '#000000' }}
          placeholder={"Like fontSize: 12,backgroundColor:'#000000'"}
          defaultValue={reportSettingStore.reportBody?.test?.methodNameCSS}
          onChange={methodNameCSS => {
            reportSettingStore.updateReportBody({
              ...reportSettingStore.reportBody,
              test: {
                ...reportSettingStore.reportBody?.test,
                methodNameCSS,
              },
            });
          }}
        />
        <Form.Toggle
          isToggleLabel={false}
          label='Method Name'
          className='w-2/6'
          value={reportSettingStore.reportBody?.test?.isMethodName}
          onChange={isMethodName => {
            reportSettingStore.updateReportBody({
              ...reportSettingStore.reportBody,
              test: {
                ...reportSettingStore.reportBody?.test,
                isMethodName,
              },
            });
          }}
        />
      </div>

      <div className='flex flex-row flex-auto object-fill gap-2'>
        <CSSMultiline
          label='Test Interpretation CSS'
          style={{ color: '#ffffff', backgroundColor: '#000000' }}
          placeholder={"Like fontSize: 12,backgroundColor:'#000000'"}
          defaultValue={
            reportSettingStore.reportBody?.test?.testInterpretationCSS
          }
          onChange={testInterpretationCSS => {
            reportSettingStore.updateReportBody({
              ...reportSettingStore.reportBody,
              test: {
                ...reportSettingStore.reportBody?.test,
                testInterpretationCSS,
              },
            });
          }}
        />
        <Form.Toggle
          isToggleLabel={false}
          label='Test Interpretation'
          className='w-2/6'
          value={reportSettingStore.reportBody?.test?.isTestInterpretation}
          onChange={isTestInterpretation => {
            reportSettingStore.updateReportBody({
              ...reportSettingStore.reportBody,
              test: {
                ...reportSettingStore.reportBody?.test,
                isTestInterpretation,
              },
            });
          }}
        />
      </div>
    </List>
  );
});
