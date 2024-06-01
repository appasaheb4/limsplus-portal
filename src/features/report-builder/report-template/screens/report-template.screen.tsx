import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import {
  Tooltip,
  Icons,
  Header,
  PageHeading,
  PageHeadingLabDetails,
  MainPageHeading,
} from '@/library/components';
import { useForm } from 'react-hook-form';
import { pdf } from '@react-pdf/renderer';
import printjs from 'print-js';

import '@/library/assets/css/accordion.css';
import { useStores } from '@/stores';
import { logos } from '@/library/assets';

import {
  ADCPdf,
  ADCMedicalReportPdf,
  GeneflowLab,
  GeneflowLabW,
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
    formState: { errors },
    setValue,
  } = useForm();
  useEffect(() => {
    // Default value initialization
    setValue('species', patientManagerStore.patientManger.species);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientManagerStore.patientManger]);

  const templates = [
    {
      tempCode: 'TEMP0004',
      title: 'AARVAK DIAGNOSTIC CENTER',
      component: ADCPdf,
      tooltipText: 'Print',
      icon: Icons.IconBs.BsPrinter,
      logo: logos.aarvakDiagnosticCenter,
    },
    {
      tempCode: 'TEMP0005',
      title: 'AARVAK DIAGNOSTIC CENTER MEDICAL REPORT',
      component: ADCMedicalReportPdf,
      tooltipText: 'Print',
      icon: Icons.IconBs.BsPrinter,
      logo: logos.aarvakDiagnosticCenter,
    },
    {
      tempCode: 'TEMP0009',
      title: 'Geneflow Labs',
      component: GeneflowLab,
      tooltipText: 'Print',
      icon: Icons.IconBs.BsPrinter,
      logo: logos.geneflowLab,
    },
    {
      tempCode: 'TEMP0010',
      title: 'Geneflow Labs (W)',
      component: GeneflowLabW,
      tooltipText: 'Print',
      icon: Icons.IconBs.BsPrinter,
      logo: logos.geneflowLab,
    },
  ];

  return (
    <>
      <MainPageHeading
        title={routerStore.selectedComponents?.title || ''}
        store={loginStore}
      />

      <div className='flex'>
        <div className={'flex flex-row p-2 rounded-lg gap-4 flex-wrap '}>
          {templates?.map((item, index) => (
            <div
              key={index}
              className='flex relative flex-col xl:w-60 shadow-2xl p-2 rounded-md items-center justify-center gap-2 sm:w-100'
            >
              <img src={item.logo} />
              <h4 className='text-center'>{`${item.tempCode}-${item.title}`}</h4>
              <div className='py-3'>
                <div className='flex  absolute bottom-2'>
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
            </div>
          ))}
        </div>
      </div>
      {/* <ADCMedicalReportPdf height={600} /> */}
    </>
  );
});

export default ReportTemplate;
