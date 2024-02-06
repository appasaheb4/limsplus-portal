import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import {
  Header,
  PageHeading,
  PageHeadingLabDetails,
} from '@/library/components';
import { useForm } from 'react-hook-form';

import '@/library/assets/css/accordion.css';
import { useStores } from '@/stores';
import { Accordion, AccordionItem } from 'react-sanfona';
import '@/library/assets/css/accordion.css';

import { PageBranding } from './page-branding.screen';
import { PageLayout } from './page-layout.screen';
import { TemplatePatientResult } from './template-patient-result.screen';
import { ReportBody } from './report-body.screen';
import MainPageHeadingComponents from '@/library/components/atoms/header/main.page.heading.components';

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
    formState: { errors },
    setValue,
  } = useForm();
  useEffect(() => {
    // Default value initialization
    setValue('species', patientManagerStore.patientManger.species);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientManagerStore.patientManger]);

  return (
    <>
      <MainPageHeadingComponents
        title={routerStore.selectedComponents?.title || ''}
        store={loginStore}
      />
      <div>
        <Accordion>
          {[
            { title: 'Page LAYOUT' },
            { title: 'PAGE BRANDING' },
            { title: 'REPORT BODY' },
            { title: 'TEMPLATE PATIENT RESULT' },
          ].map(item => {
            return (
              <AccordionItem
                title={`${item.title}`}
                // expanded={item.title === 'PAGE BRANDING'}
              >
                {item.title === 'Page LAYOUT' && <PageLayout />}
                {item.title === 'PAGE BRANDING' && <PageBranding />}
                {item.title === 'REPORT BODY' && <ReportBody />}
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
