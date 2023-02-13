import React, {useState} from 'react';
import {observer} from 'mobx-react';
import _ from 'lodash';
import {Header, PageHeading, PageHeadingLabDetails} from '@/library/components';
import {useForm} from 'react-hook-form';

import '@/library/assets/css/accordion.css';
import {useStores} from '@/stores';
import {Accordion, AccordionItem} from 'react-sanfona';
import '@/library/assets/css/accordion.css';

import {PageBranding} from './page-branding.screen';
import {PageLayout} from './page-layout.screen';
import {TemplatePatientResult} from './template-patient-result.screen';

const ReportSettings = observer(() => {
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

  return (
    <>
      <Header>
        <PageHeading title={routerStore.selectedComponents?.title || ''} />
        <PageHeadingLabDetails store={loginStore} />
      </Header>
      <div>
        <Accordion>
          {[
            {title: 'Page LAYOUT'},
            {title: 'PAGE BRANDING'},
            {title: 'TEMPLATE PATIENT RESULT'},
          ].map(item => {
            return (
              <AccordionItem
                title={`${item.title}`}
                // expanded={item.title === 'PAGE BRANDING'}
              >
                {item.title === 'Page LAYOUT' && <PageLayout />}
                {item.title === 'PAGE BRANDING' && <PageBranding />}
                {item.title === 'TEMPLATE PATIENT RESULT' && (
                  <TemplatePatientResult />
                )}
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </>
  );
});

export default ReportSettings;
