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

import {AarvakDiagnosticCenterPdf} from '../components';

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
      title: 'Aarvak Disgnostic Center',
      component: AarvakDiagnosticCenterPdf,
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

      {/* <div className='flex'>
        <div className={'p-2 rounded-lg'}>
          {templates?.map(item => (
            <div className='flex flex-wrap h-60 w-60 shadow-2xl p-2 rounded-md items-center justify-center'>
              <img src={logos.aarvakDiagnosticCenter} />
              <Tooltip tooltipText='Print'>
                <Icons.IconContext
                  color='#000'
                  size='20'
                  onClick={async () => {
                    const Comp = item.component;
                    const blob = await pdf(
                      <AarvakDiagnosticCenterPdf />,
                    ).toBlob();
                    const blobURL = URL.createObjectURL(blob);
                    printjs(blobURL);
                  }}
                >
                  {Icons.getIconTag(item.icon)}
                </Icons.IconContext>
              </Tooltip>
            </div>
          ))}
        </div>
      </div> */}
      <AarvakDiagnosticCenterPdf height={600} />
    </>
  );
});

export default ReportTemplate;
