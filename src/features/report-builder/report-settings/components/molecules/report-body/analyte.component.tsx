import React from 'react';
import {observer} from 'mobx-react';
import {
  List,
  Form,
} from '@/library/components';
import {useStores} from '@/stores';

interface AnalyteProps {
  label?: string;
}

export const Analyte = observer(({label}: AnalyteProps) => {
  const {reportSettingStore} = useStores();
  return (
    <List direction='col' space={1} justify='stretch' fill>
      <div className='flex flex-row flex-auto object-fill gap-2'>
        <Form.MultilineInput
          label='Print Analyte Name CSS'
          className='w-4/6'
          style={{color: '#ffffff', backgroundColor: '#000000'}}
          placeholder={"Like fontSize: 12,backgroundColor:'#000000'"}
          value={reportSettingStore.reportBody?.analyte?.printAnalyteNameCSS}
          onChange={printAnalyteNameCSS => {
            reportSettingStore.updateReportBody({
              ...reportSettingStore.reportBody,
              analyte: {
                ...reportSettingStore.reportBody?.analyte,
                printAnalyteNameCSS,
              },
            });
          }}
        />
        <Form.Toggle
          isToggleLabel={false}
          label='Print Analyte Name'
          className='w-2/6'
          value={reportSettingStore.reportBody?.analyte?.isPrintAnalyteName}
          onChange={isPrintAnalyteName => {
            reportSettingStore.updateReportBody({
              ...reportSettingStore.reportBody,
              analyte: {
                ...reportSettingStore.reportBody?.analyte,
                isPrintAnalyteName,
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
          value={reportSettingStore.reportBody?.analyte?.methodNameCSS}
          onChange={methodNameCSS => {
            reportSettingStore.updateReportBody({
              ...reportSettingStore.reportBody,
              analyte: {
                ...reportSettingStore.reportBody?.analyte,
                methodNameCSS,
              },
            });
          }}
        />
        <Form.Toggle
          isToggleLabel={false}
          label='Method Name'
          className='w-2/6'
          value={reportSettingStore.reportBody?.analyte?.isMethodName}
          onChange={isMethodName => {
            reportSettingStore.updateReportBody({
              ...reportSettingStore.reportBody,
              analyte: {
                ...reportSettingStore.reportBody?.analyte,
                isMethodName,
              },
            });
          }}
        />
      </div>

      <div className='flex flex-row flex-auto object-fill gap-2'>
        <Form.MultilineInput
          label='Header Item CSS'
          className='w-4/6'
          style={{color: '#ffffff', backgroundColor: '#000000'}}
          placeholder={"Like fontSize: 12,backgroundColor:'#000000'"}
          value={reportSettingStore.reportBody?.analyte?.headerItemCSS}
          onChange={headerItemCSS => {
            reportSettingStore.updateReportBody({
              ...reportSettingStore.reportBody,
              analyte: {
                ...reportSettingStore.reportBody?.analyte,
                headerItemCSS,
              },
            });
          }}
        />
        <Form.Toggle
          isToggleLabel={false}
          label='Header Item'
          className='w-2/6'
          value={reportSettingStore.reportBody?.analyte?.isHeaderItem}
          onChange={isHeaderItem => {
            reportSettingStore.updateReportBody({
              ...reportSettingStore.reportBody,
              analyte: {
                ...reportSettingStore.reportBody?.analyte,
                isHeaderItem,
              },
            });
          }}
        />
      </div>

      <div className='flex flex-row flex-auto object-fill gap-2'>
        <Form.MultilineInput
          label='ABN Flag CSS'
          className='w-4/6'
          style={{color: '#ffffff', backgroundColor: '#000000'}}
          placeholder={"Like fontSize: 12,backgroundColor:'#000000'"}
          value={reportSettingStore.reportBody?.analyte?.abnFlagCSS}
          onChange={abnFlagCSS => {
            reportSettingStore.updateReportBody({
              ...reportSettingStore.reportBody,
              analyte: {
                ...reportSettingStore.reportBody?.analyte,
                abnFlagCSS,
              },
            });
          }}
        />
        <Form.Toggle
          isToggleLabel={false}
          label='ABN Flag'
          className='w-2/6'
          value={reportSettingStore.reportBody?.analyte?.isAbnFlag}
          onChange={isAbnFlag => {
            reportSettingStore.updateReportBody({
              ...reportSettingStore.reportBody,
              analyte: {
                ...reportSettingStore.reportBody?.analyte,
                isAbnFlag,
              },
            });
          }}
        />
      </div>

      <div className='flex flex-row flex-auto object-fill gap-2'>
        <Form.MultilineInput
          label='Critical CSS'
          className='w-4/6'
          style={{color: '#ffffff', backgroundColor: '#000000'}}
          placeholder={"Like fontSize: 12,backgroundColor:'#000000'"}
          value={reportSettingStore.reportBody?.analyte?.criticalCSS}
          onChange={criticalCSS => {
            reportSettingStore.updateReportBody({
              ...reportSettingStore.reportBody,
              analyte: {
                ...reportSettingStore.reportBody?.analyte,
                criticalCSS,
              },
            });
          }}
        />
        <Form.Toggle
          isToggleLabel={false}
          label='Critical'
          className='w-2/6'
          value={reportSettingStore.reportBody?.analyte?.isCritical}
          onChange={isCritical => {
            reportSettingStore.updateReportBody({
              ...reportSettingStore.reportBody,
              analyte: {
                ...reportSettingStore.reportBody?.analyte,
                isCritical,
              },
            });
          }}
        />
      </div>

      <div className='flex flex-row flex-auto object-fill gap-2'>
        <Form.MultilineInput
          label='Lo Nor CSS'
          className='w-4/6'
          style={{color: '#ffffff', backgroundColor: '#000000'}}
          placeholder={"Like fontSize: 12,backgroundColor:'#000000'"}
          value={reportSettingStore.reportBody?.analyte?.loNorCSS}
          onChange={loNorCSS => {
            reportSettingStore.updateReportBody({
              ...reportSettingStore.reportBody,
              analyte: {
                ...reportSettingStore.reportBody?.analyte,
                loNorCSS,
              },
            });
          }}
        />
        <Form.Toggle
          isToggleLabel={false}
          label='Lo Nor'
          className='w-2/6'
          value={reportSettingStore.reportBody?.analyte?.isLoNor}
          onChange={isLoNor => {
            reportSettingStore.updateReportBody({
              ...reportSettingStore.reportBody,
              analyte: {
                ...reportSettingStore.reportBody?.analyte,
                isLoNor,
              },
            });
          }}
        />
      </div>

      <div className='flex flex-row flex-auto object-fill gap-2'>
        <Form.MultilineInput
          label='Hi Nor CSS'
          className='w-4/6'
          style={{color: '#ffffff', backgroundColor: '#000000'}}
          placeholder={"Like fontSize: 12,backgroundColor:'#000000'"}
          value={reportSettingStore.reportBody?.analyte?.hiNorCSS}
          onChange={hiNorCSS => {
            reportSettingStore.updateReportBody({
              ...reportSettingStore.reportBody,
              analyte: {
                ...reportSettingStore.reportBody?.analyte,
                hiNorCSS,
              },
            });
          }}
        />
        <Form.Toggle
          isToggleLabel={false}
          label='Hi Nor'
          className='w-2/6'
          value={reportSettingStore.reportBody?.analyte?.isHiNor}
          onChange={isHiNor => {
            reportSettingStore.updateReportBody({
              ...reportSettingStore.reportBody,
              analyte: {
                ...reportSettingStore.reportBody?.analyte,
                isHiNor,
              },
            });
          }}
        />
      </div>

      <div className='flex flex-row flex-auto object-fill gap-2'>
        <Form.MultilineInput
          label='Result Status CSS'
          className='w-4/6'
          style={{color: '#ffffff', backgroundColor: '#000000'}}
          placeholder={"Like fontSize: 12,backgroundColor:'#000000'"}
          value={reportSettingStore.reportBody?.analyte?.resultStatusCSS}
          onChange={resultStatusCSS => {
            reportSettingStore.updateReportBody({
              ...reportSettingStore.reportBody,
              analyte: {
                ...reportSettingStore.reportBody?.analyte,
                resultStatusCSS,
              },
            });
          }}
        />
        <Form.Toggle
          isToggleLabel={false}
          label='Result Status'
          className='w-2/6'
          value={reportSettingStore.reportBody?.analyte?.isResultStatus}
          onChange={isResultStatus => {
            reportSettingStore.updateReportBody({
              ...reportSettingStore.reportBody,
              analyte: {
                ...reportSettingStore.reportBody?.analyte,
                isResultStatus,
              },
            });
          }}
        />
      </div>

      <div className='flex flex-row flex-auto object-fill gap-2'>
        <Form.MultilineInput
          label='Method CSS'
          className='w-4/6'
          style={{color: '#ffffff', backgroundColor: '#000000'}}
          placeholder={"Like fontSize: 12,backgroundColor:'#000000'"}
          value={reportSettingStore.reportBody?.analyte?.methodCSS}
          onChange={methodCSS => {
            reportSettingStore.updateReportBody({
              ...reportSettingStore.reportBody,
              analyte: {
                ...reportSettingStore.reportBody?.analyte,
                methodCSS,
              },
            });
          }}
        />
        <Form.Toggle
          isToggleLabel={false}
          label='Method'
          className='w-2/6'
          value={reportSettingStore.reportBody?.analyte?.isMethod}
          onChange={isMethod => {
            reportSettingStore.updateReportBody({
              ...reportSettingStore.reportBody,
              analyte: {
                ...reportSettingStore.reportBody?.analyte,
                isMethod,
              },
            });
          }}
        />
      </div>

      <div className='flex flex-row flex-auto object-fill gap-2'>
        <Form.MultilineInput
          label='Reportable CSS'
          className='w-4/6'
          style={{color: '#ffffff', backgroundColor: '#000000'}}
          placeholder={"Like fontSize: 12,backgroundColor:'#000000'"}
          value={reportSettingStore.reportBody?.analyte?.reportableCSS}
          onChange={reportableCSS => {
            reportSettingStore.updateReportBody({
              ...reportSettingStore.reportBody,
              analyte: {
                ...reportSettingStore.reportBody?.analyte,
                reportableCSS,
              },
            });
          }}
        />
        <Form.Toggle
          isToggleLabel={false}
          label='Reportable'
          className='w-2/6'
          value={reportSettingStore.reportBody?.analyte?.isReportable}
          onChange={isReportable => {
            reportSettingStore.updateReportBody({
              ...reportSettingStore.reportBody,
              analyte: {
                ...reportSettingStore.reportBody?.analyte,
                isReportable,
              },
            });
          }}
        />
      </div>

      <div className='flex flex-row flex-auto object-fill gap-2'>
        <Form.MultilineInput
          label='Interpretation CSS'
          className='w-4/6'
          style={{color: '#ffffff', backgroundColor: '#000000'}}
          placeholder={"Like fontSize: 12,backgroundColor:'#000000'"}
          value={reportSettingStore.reportBody?.analyte?.interpretationCSS}
          onChange={interpretationCSS => {
            reportSettingStore.updateReportBody({
              ...reportSettingStore.reportBody,
              analyte: {
                ...reportSettingStore.reportBody?.analyte,
                interpretationCSS,
              },
            });
          }}
        />
        <Form.Toggle
          isToggleLabel={false}
          label='Interpretation'
          className='w-2/6'
          value={reportSettingStore.reportBody?.analyte?.isInterpretation}
          onChange={isInterpretation => {
            reportSettingStore.updateReportBody({
              ...reportSettingStore.reportBody,
              analyte: {
                ...reportSettingStore.reportBody?.analyte,
                isInterpretation,
              },
            });
          }}
        />
      </div>

      <div className='flex flex-row flex-auto object-fill gap-2'>
        <Form.MultilineInput
          label='Conclusion CSS'
          className='w-4/6'
          style={{color: '#ffffff', backgroundColor: '#000000'}}
          placeholder={"Like fontSize: 12,backgroundColor:'#000000'"}
          value={reportSettingStore.reportBody?.analyte?.conclusionCSS}
          onChange={conclusionCSS => {
            reportSettingStore.updateReportBody({
              ...reportSettingStore.reportBody,
              analyte: {
                ...reportSettingStore.reportBody?.analyte,
                conclusionCSS,
              },
            });
          }}
        />
        <Form.Toggle
          isToggleLabel={false}
          label='Conclusion'
          className='w-2/6'
          value={reportSettingStore.reportBody?.analyte?.isConclusion}
          onChange={isConclusion => {
            reportSettingStore.updateReportBody({
              ...reportSettingStore.reportBody,
              analyte: {
                ...reportSettingStore.reportBody?.analyte,
                isConclusion,
              },
            });
          }}
        />
      </div>

      <div className='flex flex-row flex-auto object-fill gap-2'>
        <Form.MultilineInput
          label='Print Analyte Interpretation CSS'
          className='w-4/6'
          style={{color: '#ffffff', backgroundColor: '#000000'}}
          placeholder={"Like fontSize: 12,backgroundColor:'#000000'"}
          value={
            reportSettingStore.reportBody?.analyte
              ?.printAnalyteInterpretationCSS
          }
          onChange={printAnalyteInterpretationCSS => {
            reportSettingStore.updateReportBody({
              ...reportSettingStore.reportBody,
              analyte: {
                ...reportSettingStore.reportBody?.analyte,
                printAnalyteInterpretationCSS,
              },
            });
          }}
        />
        <Form.Toggle
          isToggleLabel={false}
          label='Print Analyte Interpretation'
          className='w-2/6'
          value={
            reportSettingStore.reportBody?.analyte?.isPrintAnalyteInterpretation
          }
          onChange={isPrintAnalyteInterpretation => {
            reportSettingStore.updateReportBody({
              ...reportSettingStore.reportBody,
              analyte: {
                ...reportSettingStore.reportBody?.analyte,
                isPrintAnalyteInterpretation,
              },
            });
          }}
        />
      </div>
    </List>
  );
});
