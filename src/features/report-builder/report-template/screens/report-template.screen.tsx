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
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

export const ReportTemplate = observer(() => {
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
    </>
  );
});
