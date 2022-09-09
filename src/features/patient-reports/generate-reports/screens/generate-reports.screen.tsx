import React, {useRef, useState} from 'react';
import {observer} from 'mobx-react';
import _ from 'lodash';
import {
  Buttons,
  List,
  Grid,
  Svg,
  Toast,
  Form,
  AutoCompleteFilterSingleSelectMultiFieldsDisplay,
  Header,
  PageHeading,
  PageHeadingLabDetails,
} from '@/library/components';
import {lookupItems, lookupValue} from '@/library/utils';
import {useForm, Controller} from 'react-hook-form';
import {FormHelper} from '@/helper';

import '@/library/assets/css/accordion.css';
import {useStores} from '@/stores';
import {RouterFlow} from '@/flows';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

import {
  PdfTPRTemp0001,
  PdfTPRTemp0002,
} from '@features/report-builder/report-template/components';
import {PDFViewer, PDFDownloadLink} from '@react-pdf/renderer';

const GenerateReport = observer(() => {
  const {
    loading,
    patientManagerStore,
    routerStore,
    patientVisitStore,
    patientRegistrationStore,
    loginStore,
    generateReportsStore,
    reportSettingStore,
  } = useStores();
  const [tempCode, setTempCode] = useState('');

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm();
  setValue('species', patientManagerStore.patientManger.species);

  const getTemplate = (tempCode: string, data: any) => {
    switch (tempCode) {
      case 'TEMP0001':
        return <PdfTPRTemp0001 data={data} />;
      case 'TEMP0002':
        return <PdfTPRTemp0002 data={data} />;
      default:
        return (
          <div className='justify-center items-center'>
            <h4 className='text-center mt-10 text-red'>
              Template not found. Please select correct template code and labId.
              🚨
            </h4>
          </div>
        );
        break;
    }
  };

  return (
    <>
      <Header>
        <div className='flex flex-row gap-2 items-center'>
          <PageHeading title={routerStore.selectedComponents?.title || ''} />
          <AutoCompleteFilterSingleSelectMultiFieldsDisplay
            loader={loading}
            placeholder='Lab Id'
            className='h-4'
            data={{
              list: _.uniqBy(
                patientVisitStore.labIdList?.filter(
                  item => item.labId !== undefined,
                ),
                'labId',
              ),
              displayKey: ['labId'],
            }}
            onFilter={(labId: string) => {
              patientVisitStore.patientVisitService.filterByLabId({
                input: {
                  filter: {labId},
                },
              });
            }}
            onSelect={item => {
              generateReportsStore.generateReportsService
                .getPatientReportAndPageBrandingFromLabId(item.labId)
                .then(res => {
                  console.log({res});

                  generateReportsStore.updatePatientReports(res?.patientReport);
                  generateReportsStore.updatePageBranding(res?.pageBranding);
                })
                .catch(errors => {
                  return Toast.error({
                    message: `😔 ${errors.message}`,
                  });
                });
            }}
          />
          <AutoCompleteFilterSingleSelectMultiFieldsDisplay
            loader={loading}
            placeholder='Template code'
            className='h-4'
            data={{
              list: reportSettingStore.templatePatientResultList,
              displayKey: ['templateCode', 'templateTitle'],
            }}
            onFilter={(labId: string) => {
              // patientVisitStore.patientVisitService.filterByLabId({
              //   input: {
              //     filter: {labId},
              //   },
              // });
            }}
            onSelect={item => {
              setTempCode(item.templateCode);
            }}
          />
        </div>
        <PageHeadingLabDetails store={loginStore} />
      </Header>
      {window.innerWidth <= 768 ? (
        <PDFDownloadLink
          document={
            <>
              {getTemplate(tempCode, {
                patientReports: generateReportsStore.patientReports,
                pageBranding: generateReportsStore.pageBranding,
              })}
            </>
          }
          fileName='Patient Reports'
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            minHeight: '100%',
          }}
        >
          {({loading, error}) =>
            loading ? (
              <button>Loading document...</button>
            ) : (
              <button className='border-2 p-2 rounded-md bg-blue-500 text-white'>
                Pdf Patient Reports
              </button>
            )
          }
        </PDFDownloadLink>
      ) : (
        <>
          {getTemplate(tempCode, {
            patientReports: generateReportsStore.patientReports,
            pageBranding: generateReportsStore.pageBranding,
          })}
        </>
      )}
    </>
  );
});
export default GenerateReport;
