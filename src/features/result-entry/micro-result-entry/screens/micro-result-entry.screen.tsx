import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import {
  Header,
  PageHeading,
  PageHeadingLabDetails,
  MainPageHeading,
} from '@/library/components';
import { useForm } from 'react-hook-form';

import '@/library/assets/css/accordion.css';
import { useStores } from '@/stores';

import 'react-accessible-accordion/dist/fancy-example.css';

const MicroResultEntry = observer(() => {
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

  const [hideInputView, setHideInputView] = useState<boolean>(true);
  useEffect(() => {
    // Default value initialization
    setValue('species', patientManagerStore.patientManger.species);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientManagerStore.patientManger]);

  const onSubmitPatientManager = () => {};

  return (
    <>
      <MainPageHeading
        title={routerStore.selectedComponents?.title || ''}
        store={loginStore}
      />
    </>
  );
});

export default MicroResultEntry;
