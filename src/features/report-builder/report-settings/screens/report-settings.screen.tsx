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
  AutoCompleteFilterSingleSelect,
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
import {Accordion, AccordionItem} from 'react-sanfona';
import '@/library/assets/css/accordion.css';

import {ReportSection} from './report-section.screen';

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

  const [hideInputView, setHideInputView] = useState<boolean>(true);

  const onSubmitPatientManager = () => {};

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
                {item.title === 'PATIENT VISIT' && <ReportSection />}
                {item.title === 'PATIENT ORDER' && <ReportSection />}
                {item.title === 'PATIENT TEST' && <ReportSection />}
                {item.title === 'PATIENT RESULT' && <ReportSection />}
                {item.title === 'PATIENT SAMPLE' && <ReportSection />}
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </>
  );
});

export default ReportSettings;
