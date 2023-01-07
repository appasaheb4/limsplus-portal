import React, {useState} from 'react';
import {observer} from 'mobx-react';
import _ from 'lodash';
import {
  Tooltip,
  Icons,
  Header,
  PageHeading,
  PageHeadingLabDetails,
} from '@/library/components';
import {useForm} from 'react-hook-form';
import {pdf} from '@react-pdf/renderer';
import printjs from 'print-js';

import '@/library/assets/css/accordion.css';
import {useStores} from '@/stores';
import {logos} from '@/library/assets';

import {
  ADCPdf,
  ADCWithoutHeaderFooterPdf,
  ADCMedicalReportPdf,
} from '../components';

import 'react-accessible-accordion/dist/fancy-example.css';

const ReportTemplate = observer(() => {
  const {
    loading,
    patientManagerStore,
    routerStore,
    administrativeDivisions,
    doctorsStore,
    loginStore,
  } = useStores();

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm();
  setValue('species', patientManagerStore.patientManger.species);

  const templates = [
    {
      tempCode: 'TEMP0004',
      title: 'AARVAK DIAGNOSTIC CENTER',
      component: ADCPdf,
      tooltipText: 'Print',
      icon: Icons.IconBs.BsPrinter,
    },
    {
      tempCode: 'TEMP0005',
      title: 'AARVAK DIAGNOSTIC CENTER MEDICAL REPORT',
      component: ADCMedicalReportPdf,
      tooltipText: 'Print',
      icon: Icons.IconBs.BsPrinter,
    },
  ];

  return (
    <>
      <Header>
        <PageHeading title={routerStore.selectedComponents?.title || ''} />
        <PageHeadingLabDetails store={loginStore} />
      </Header>

      <div className='flex'>
        <div className={'flex flex-row p-2 rounded-lg gap-4 flex-wrap '}>
          {templates?.map(item => (
            <div className='flex flex-col xl:w-60 shadow-2xl p-2 rounded-md items-center justify-center gap-2 sm:w-100'>
              <img src={logos.aarvakDiagnosticCenter} />
              <h4 className='text-center'>{`${item.tempCode}-${item.title}`}</h4>
              <div>
                <Tooltip tooltipText='Print'>
                  <Icons.IconContext
                    color='#000'
                    size='20'
                    onClick={async () => {
                      const Comp = item.component;
                      const blob = await pdf(<Comp />).toBlob();
                      const blobURL = URL.createObjectURL(blob);
                      printjs(blobURL);
                    }}
                  >
                    {Icons.getIconTag(item.icon)}
                  </Icons.IconContext>
                </Tooltip>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <ADCMedicalReportPdf height={600} /> */}
    </>
  );
});

export default ReportTemplate;
