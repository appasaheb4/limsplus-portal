/* eslint-disable */
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
import 'react-accessible-accordion/dist/fancy-example.css';

const GeneralResultEntry = observer(() => {
  const {loginStore, routerStore} = useStores();

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm();

  return (
    <>
      <Header>
        <PageHeading title={routerStore.selectedComponents?.title || ''} />
        <PageHeadingLabDetails store={loginStore} />
      </Header>
    </>
  );
});

export default GeneralResultEntry;
