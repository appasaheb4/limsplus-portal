import React from 'react';
import {observer} from 'mobx-react';
import _ from 'lodash';
import {Form} from '@/library/components';
import {useForm, Controller} from 'react-hook-form';
import {useStores} from '@/stores';
import Resizer from 'react-image-file-resizer';

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

  const resizeFile = file =>
    new Promise(resolve => {
      Resizer.imageFileResizer(
        file,
        50,
        50,
        'JPEG',
        50,
        0,
        uri => {
          resolve(uri);
        },
        'base64',
      );
    });

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
            onChange={async e => {
              const logo = e.target.files[0];
              onChange(logo);
              reportSettingStore.updatePageBranding({
                ...reportSettingStore.pageBranding,
                header: {
                  ...reportSettingStore.pageBranding?.header,
                  logo,
                  logoUrl: await resizeFile(logo),
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
