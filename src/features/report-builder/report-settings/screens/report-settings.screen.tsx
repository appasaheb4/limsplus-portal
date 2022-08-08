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
import {PageSetting} from './page-setting.screen';
import {GeneralSettings} from './general-setting.screen';
import {FontSetting} from './font-setting.screen';
import {ReportFieldMapping} from './report-field-mapping.screen';
import {PageBranding} from './page-branding.screen';
import {TemplateSettings} from './template-setting.screen';

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
            {title: 'TEMPLATE SETTING'},
            {title: 'PAGE BRANDING'},
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
                expanded={item.title === 'TEMPLATE SETTING'}
              >
                {item.title === 'TEMPLATE SETTING' && <TemplateSettings />}
                {item.title === 'PAGE BRANDING' && <PageBranding />}
                {item.title === 'REPORT SECTION' && <ReportSection />}
                {item.title === 'SECTION SETTING' && <SectionSettings />}
                {item.title === 'PAGE SETTING' && <PageSetting />}
                {item.title === 'GENERAL SETTING' && <GeneralSettings />}
                {item.title === 'FONT SETTING' && <FontSetting />}
                {item.title === 'REPORT FIELD MAPPING' && (
                  <ReportFieldMapping />
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
