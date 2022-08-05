import React from 'react';
import {observer} from 'mobx-react';
import _ from 'lodash';
import {Form, Grid} from '@/library/components';
import {useForm, Controller} from 'react-hook-form';
import {useStores} from '@/stores';

export const PageBrandingHeader = observer(() => {
  const {loading, routerStore, reportSettingStore} = useStores();
  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
    setError,
    clearErrors,
  } = useForm();

  return (
    <>
      <Controller
        control={control}
        render={({field: {onChange}}) => (
          <Form.Input
            label='Title'
            placeholder='Tile'
            hasError={!!errors.title}
            value={reportSettingStore.pageBranding?.header?.title}
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
        render={({field: {onChange}}) => (
          <Form.MultilineInput
            label='Title CSS'
            style={{color: '#ffffff', backgroundColor: '#000000'}}
            placeholder={"Like fontSize: 12,backgroundColor:'#000000'"}
            value={reportSettingStore.pageBranding?.header?.titleCSS}
            onChange={titleCSS => {
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
        render={({field: {onChange}}) => (
          <Form.InputFile
            label='Logo'
            placeholder={'Select Logo'}
            hasError={!!errors.headerLogo}
            onChange={e => {
              const logo = e.target.files[0];
              const reader = new FileReader();

              reader.onloadend = function () {
                console.log('RESULT', reader.result);
              };
              reader.readAsDataURL(logo);
              reportSettingStore.updatePageBranding({
                ...reportSettingStore.pageBranding,
                header: {
                  ...reportSettingStore.pageBranding?.header,
                  logo,
                  logoLocalPath: logo,
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
        render={({field: {onChange}}) => (
          <Form.MultilineInput
            label='Logo CSS'
            style={{color: '#ffffff', backgroundColor: '#000000'}}
            placeholder={'Like borderRadius:25,width:50'}
            value={reportSettingStore.pageBranding?.header?.logoCSS}
            onChange={logoCSS => {
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
        render={({field: {onChange}}) => (
          <Form.MultilineInput
            label='Main Box CSS'
            style={{color: '#ffffff', backgroundColor: '#000000'}}
            placeholder={"Like backgroundColor:'#000000'"}
            value={reportSettingStore.pageBranding?.header?.mainBoxCSS}
            onChange={mainBoxCSS => {
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
