import React, { useState } from 'react';
import { observer } from 'mobx-react';
import {
  Header,
  PageHeading,
  PageHeadingLabDetails,
} from '@/library/components';
import { useForm } from 'react-hook-form';
import '@/library/assets/css/accordion.css';
import { useStores } from '@/stores';
import 'react-accessible-accordion/dist/fancy-example.css';

const OpenBatch = observer(() => {
  const {
    loading,
    deliveryQueueStore,
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
  return (
    <>
      <Header>
        <PageHeading title={routerStore.selectedComponents?.title || ''} />
        <PageHeadingLabDetails store={loginStore} />
      </Header>
      <div className='p-3 rounded-lg shadow-xl overflow-auto'>
        <span className='font-bold text-lg underline'>Coming Soon</span>
      </div>
    </>
  );
});

export default OpenBatch;
