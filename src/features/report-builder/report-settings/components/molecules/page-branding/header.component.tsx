import React, {forwardRef} from 'react';
import {observer} from 'mobx-react';
import _ from 'lodash';
import {Form} from '@/library/components';
import {useForm, Controller} from 'react-hook-form';
import {useStores} from '@/stores';
import {resizeFile} from '@/library/utils';

export const PageBrandingHeader = observer(() => {
  const {reportSettingStore} = useStores();
  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
    setError,
    clearErrors,
    reset,
  } = useForm();

  return (
    <>
      <Controller
        control={control}
        render={({field: {onChange, value}}) => (
          <Form.Input
            label='Title'
            placeholder='Tile'
            hasError={!!errors.title}
            value={value}
            onChange={title => {
              onChange(title);
              reportSettingStore.updatePageBranding({
                ...reportSettingStore.pageBranding,
                header: {
                  ...reportSettingStore.pageBranding?.header,
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
                header: {
                  ...reportSettingStore.pageBranding.header,
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
          <Form.InputFile
            label='Logo'
            placeholder={'Select Logo'}
            hasError={!!errors.headerLogo}
            value={value ? value.fileName : ''}
            onChange={async e => {
              const logo = e.target.files[0];
              onChange(logo);
              reportSettingStore.updatePageBranding({
                ...reportSettingStore.pageBranding,
                header: {
                  ...reportSettingStore.pageBranding?.header,
                  logo,
                },
              });
            }}
          />
        )}
        name='headerLogo'
        rules={{required: false}}
        defaultValue=''
      />
      <Controller
        control={control}
        render={({field: {onChange, value}}) => (
          <Form.MultilineInput
            label='Logo CSS'
            style={{color: '#ffffff', backgroundColor: '#000000'}}
            placeholder={'Like borderRadius:25,width:50'}
            value={value}
            onChange={logoCSS => {
              onChange(logoCSS);
              reportSettingStore.updatePageBranding({
                ...reportSettingStore.pageBranding,
                header: {
                  ...reportSettingStore.pageBranding.header,
                  logoCSS,
                },
              });
            }}
          />
        )}
        name='logoCSS'
        rules={{required: false}}
        defaultValue=''
      />
      <Controller
        control={control}
        render={({field: {onChange, value}}) => (
          <Form.InputFile
            label='Background Image'
            placeholder='Background Image'
            hasError={!!errors.backgroundImage}
            value={value ? value.fileName : ''}
            onChange={async e => {
              const backgroundImage = e.target.files[0];
              onChange(backgroundImage);
              reportSettingStore.updatePageBranding({
                ...reportSettingStore.pageBranding,
                header: {
                  ...reportSettingStore.pageBranding.header,
                  backgroundImage,
                  backgroundImageBase64: (await resizeFile(
                    backgroundImage,
                  )) as string,
                },
              });
            }}
          />
        )}
        name='backgroundImage'
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
                header: {
                  ...reportSettingStore.pageBranding.header,
                  mainBoxCSS,
                },
              });
            }}
          />
        )}
        name='mainBoxCSS'
        rules={{required: false}}
        defaultValue=''
      />
    </>
  );
});
