import React, {useState} from 'react';
import {observer} from 'mobx-react';
import _ from 'lodash';
import {Header, PageHeading, PageHeadingLabDetails} from '@/library/components';
import {useForm} from 'react-hook-form';

import '@/library/assets/css/accordion.css';
import {useStores} from '@/stores';
import {Accordion, AccordionItem} from 'react-sanfona';
import '@/library/assets/css/accordion.css';

import {ReportSection} from './report-section.screen';
import {SectionSettings} from './section-settings.screen';

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
            {title: 'REPORT SECTION'},
            {title: 'SECTION SETTING'},
            {title: 'PAGE SETTING'},
            {title: 'GENERAL SETTING'},
            {title: 'FONT SETTING'},
            {title: 'REPORT FIELD MAPPING'},
          ].map(item => {
            return (
              <AccordionItem
                title={`${item.title}`}
                // expanded={item.title === "PATIENT MANAGER"}
              >
                {item.title === 'REPORT SECTION' && <ReportSection />}
                {item.title === 'SECTION SETTING' && <SectionSettings />}
                {item.title === 'PAGE SETTING' && <ReportSection />}
                {item.title === 'GENERAL SETTING' && <ReportSection />}
                {item.title === 'FONT SETTING' && <ReportSection />}
                {item.title === 'REPORT FIELD MAPPING' && <ReportSection />}
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </>
  );
});

export default ReportSettings;
