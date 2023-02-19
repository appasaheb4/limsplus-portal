import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {
  Toast,
  Buttons,
  Grid,
  List,
  Form,
  Svg,
  ModalConfirm,
  AutoCompleteFilterSingleSelectMultiFieldsDisplay,
  ModalView,
  ModalViewProps,
} from '@/library/components';
import {useStores} from '@/stores';

interface PanelProps {
  label?: string;
}

export const Panel = observer(({label}: PanelProps) => {
  const {reportSettingStore} = useStores();
  return (
    <List direction='col' space={1} justify='stretch' fill>
      <div className='flex flex-row flex-auto object-fill gap-2'>
        <Form.MultilineInput
          label='Print Panel Name CSS'
          className='w-4/6'
          style={{color: '#ffffff', backgroundColor: '#000000'}}
          placeholder={"Like fontSize: 12,backgroundColor:'#000000'"}
          value={reportSettingStore.reportBody?.panel?.printPanelNameCSS}
          onChange={printPanelNameCSS => {
            reportSettingStore.updateReportBody({
              ...reportSettingStore.reportBody,
              panel: {
                ...reportSettingStore.reportBody?.panel,
                printPanelNameCSS,
              },
            });
          }}
        />
        <Form.Toggle
          isToggleLabel={false}
          label='Print Panel Name'
          className='w-2/6'
          value={reportSettingStore.reportBody?.panel?.isPrintPanelName}
          onChange={isPrintPanelName => {
            reportSettingStore.updateReportBody({
              ...reportSettingStore.reportBody,
              panel: {
                ...reportSettingStore.reportBody?.panel,
                isPrintPanelName,
              },
            });
          }}
        />
      </div>

      <div className='flex flex-row flex-auto object-fill gap-2'>
        <Form.MultilineInput
          label='Method Name CSS'
          className='w-4/6'
          style={{color: '#ffffff', backgroundColor: '#000000'}}
          placeholder={"Like fontSize: 12,backgroundColor:'#000000'"}
          value={reportSettingStore.reportBody?.panel?.methodNameCSS}
          onChange={methodNameCSS => {
            reportSettingStore.updateReportBody({
              ...reportSettingStore.reportBody,
              panel: {
                ...reportSettingStore.reportBody?.panel,
                methodNameCSS,
              },
            });
          }}
        />
        <Form.Toggle
          isToggleLabel={false}
          label='Method Name'
          className='w-2/6'
          value={reportSettingStore.reportBody?.panel?.isMethodName}
          onChange={isMethodName => {
            reportSettingStore.updateReportBody({
              ...reportSettingStore.reportBody,
              panel: {
                ...reportSettingStore.reportBody?.panel,
                isMethodName,
              },
            });
          }}
        />
      </div>

      <div className='flex flex-row flex-auto object-fill gap-2'>
        <Form.MultilineInput
          label='Panel Interpretation CSS'
          className='w-4/6'
          style={{color: '#ffffff', backgroundColor: '#000000'}}
          placeholder={"Like fontSize: 12,backgroundColor:'#000000'"}
          value={reportSettingStore.reportBody?.panel?.panelInterpretationCSS}
          onChange={panelInterpretationCSS => {
            reportSettingStore.updateReportBody({
              ...reportSettingStore.reportBody,
              panel: {
                ...reportSettingStore.reportBody?.panel,
                panelInterpretationCSS,
              },
            });
          }}
        />
        <Form.Toggle
          isToggleLabel={false}
          label='Panel Interpretation'
          className='w-2/6'
          value={reportSettingStore.reportBody?.panel?.isPanelInterpretation}
          onChange={isPanelInterpretation => {
            reportSettingStore.updateReportBody({
              ...reportSettingStore.reportBody,
              panel: {
                ...reportSettingStore.reportBody?.panel,
                isPanelInterpretation,
              },
            });
          }}
        />
      </div>
    </List>
  );
});
