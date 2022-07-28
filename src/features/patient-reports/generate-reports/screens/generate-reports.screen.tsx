import React, {useState} from 'react';
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

import {PdfPatientReport} from '../components';
import {PDFDownloadLink, PDFViewer} from '@react-pdf/renderer';

const GenerateReport = observer(() => {
  const {
    loading,
    patientManagerStore,
    routerStore,
    patientVisitStore,
    patientRegistrationStore,
    loginStore,
    generateReportsStore,
  } = useStores();

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm();
  setValue('species', patientManagerStore.patientManger.species);

  const [hideInputView, setHideInputView] = useState<boolean>(true);

  const onSubmitPatientManager = () => {};

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
            displayValue={
              patientRegistrationStore.defaultValues?.labId?.toString() || ''
            }
            onFilter={(labId: string) => {
              patientVisitStore.patientVisitService.filterByLabId({
                input: {
                  filter: {labId},
                },
              });
            }}
            onSelect={item => {
              generateReportsStore.generateReportsService.listPatientReports(
                item.labId,
              );
              console.log({item});
            }}
          />
        </div>
        <PageHeadingLabDetails store={loginStore} />
      </Header>
      {/* <PDFDownloadLink document={<PDFSampleDemo />} fileName='PFDSampleDemp'>
        {({loading, error}) =>
          loading ? (
            <button>Loading document...</button>
          ) : (
            <button>Download</button>
          )
        }
      </PDFDownloadLink> */}
      <PDFViewer
        style={{width: '100%', height: '100%', zIndex: 50}}
        showToolbar={false}
      >
        <PdfPatientReport data={generateReportsStore.patientReports} />
      </PDFViewer>
    </>
  );
});

export default GenerateReport;
