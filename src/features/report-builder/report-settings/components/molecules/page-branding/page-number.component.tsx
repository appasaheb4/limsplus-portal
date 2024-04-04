import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Form } from '@/library/components';
import { useForm, Controller } from 'react-hook-form';
import { useStores } from '@/stores';
import { CSSMultiline } from '../..';

interface PageNumberComponentProps {
  isClearReset: boolean;
}

export const PageNumber = observer((props: PageNumberComponentProps) => {
  const { reportSettingStore } = useStores();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
    reset,
  } = useForm();

  useEffect(() => {
    if (props.isClearReset) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isClearReset]);
  return (
    <>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <CSSMultiline
            defaultValue={value}
            onChange={pageNumberCSS => {
              onChange(pageNumberCSS);
              reportSettingStore.updatePageBranding({
                ...reportSettingStore.pageBranding,
                pageNumber: {
                  ...reportSettingStore.pageBranding.pageNumber,
                  pageNumberCSS,
                },
              });
            }}
          />
        )}
        name='pageNumberCSS'
        rules={{ required: false }}
        defaultValue=''
      />
    </>
  );
});
