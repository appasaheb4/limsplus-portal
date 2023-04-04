import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {Form} from '@/library/components';
import {useForm, Controller} from 'react-hook-form';
import {useStores} from '@/stores';

interface PageBrandingSubHeaderComponentProps {
  isClearReset: boolean;
}
export const PageBrandingSubHeader = observer(
  (props: PageBrandingSubHeaderComponentProps) => {
    const {loading, routerStore, reportSettingStore} = useStores();
    const {
      control,
      handleSubmit,
      formState: {errors},
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
          render={({field: {onChange, value}}) => (
            <Form.Input
              label='Title'
              placeholder='Title'
              hasError={!!errors.title}
              value={value}
              onChange={title => {
                onChange(title);
                reportSettingStore.updatePageBranding({
                  ...reportSettingStore.pageBranding,
                  subHeader: {
                    ...reportSettingStore.pageBranding?.subHeader,
                    title,
                  },
                });
              }}
            />
          )}
          name='title'
          rules={{required: false}}
          defaultValue=''
        />

        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <Form.MultilineInput
              label='Title CSS'
              style={{color: '#ffffff', backgroundColor: '#000000'}}
              placeholder={"Like fontSize: 12,backgroundColor:'#000000'"}
              value={value}
              onChange={titleCSS => {
                onChange(titleCSS);
                reportSettingStore.updatePageBranding({
                  ...reportSettingStore.pageBranding,
                  subHeader: {
                    ...reportSettingStore.pageBranding.subHeader,
                    titleCSS,
                  },
                });
              }}
            />
          )}
          name='titleCSS'
          rules={{required: false}}
          defaultValue=''
        />

        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <Form.Input
              label='Sub Title'
              placeholder='Sub Title'
              hasError={!!errors.subTitle}
              value={value}
              onChange={subTitle => {
                onChange(subTitle);
                reportSettingStore.updatePageBranding({
                  ...reportSettingStore.pageBranding,
                  subHeader: {
                    ...reportSettingStore.pageBranding?.subHeader,
                    subTitle,
                  },
                });
              }}
            />
          )}
          name='subTitle'
          rules={{required: false}}
          defaultValue=''
        />

        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <Form.MultilineInput
              label='Sub Title CSS'
              style={{color: '#ffffff', backgroundColor: '#000000'}}
              placeholder={"Like fontSize: 12,backgroundColor:'#000000'"}
              value={value}
              onChange={subTitleCSS => {
                onChange(subTitleCSS);
                reportSettingStore.updatePageBranding({
                  ...reportSettingStore.pageBranding,
                  subHeader: {
                    ...reportSettingStore.pageBranding.subHeader,
                    subTitleCSS,
                  },
                });
              }}
            />
          )}
          name='subTitleCSS'
          rules={{required: false}}
          defaultValue=''
        />

        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <Form.MultilineInput
              label='Main Box CSS'
              style={{color: '#ffffff', backgroundColor: '#000000'}}
              placeholder={"Like backgroundColor:'#000000'"}
              value={value}
              onChange={mainBoxCSS => {
                onChange(mainBoxCSS);
                reportSettingStore.updatePageBranding({
                  ...reportSettingStore.pageBranding,
                  subHeader: {
                    ...reportSettingStore.pageBranding.subHeader,
                    mainBoxCSS,
                  },
                });
              }}
            />
          )}
          name='subHeaderMainBoxCss'
          rules={{required: false}}
          defaultValue=''
        />
      </>
    );
  },
);
