import React from 'react';
import {observer} from 'mobx-react';
import _ from 'lodash';
import {Form} from '@/library/components';
import {useForm, Controller} from 'react-hook-form';
import {useStores} from '@/stores';

export const PageBrandingSubHeader = observer(() => {
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
            placeholder='Title'
            hasError={!!errors.title}
            value={reportSettingStore.pageBranding?.subHeader?.title}
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
        render={({field: {onChange}}) => (
          <Form.MultilineInput
            label='Title CSS'
            style={{color: '#ffffff', backgroundColor: '#000000'}}
            placeholder={"Like fontSize: 12,backgroundColor:'#000000'"}
            value={reportSettingStore.pageBranding?.subHeader?.titleCSS}
            onChange={titleCSS => {
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
        render={({field: {onChange}}) => (
          <Form.Input
            label='Sub Title'
            placeholder='Sub Title'
            hasError={!!errors.subTitle}
            value={reportSettingStore.pageBranding?.subHeader?.subTitle}
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
        render={({field: {onChange}}) => (
          <Form.MultilineInput
            label='Sub Title CSS'
            style={{color: '#ffffff', backgroundColor: '#000000'}}
            placeholder={"Like fontSize: 12,backgroundColor:'#000000'"}
            value={reportSettingStore.pageBranding?.subHeader?.subTitleCSS}
            onChange={subTitleCSS => {
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
        render={({field: {onChange}}) => (
          <Form.MultilineInput
            label='Main Box CSS'
            style={{color: '#ffffff', backgroundColor: '#000000'}}
            placeholder={"Like backgroundColor:'#000000'"}
            value={reportSettingStore.pageBranding?.subHeader?.mainBoxCSS}
            onChange={mainBoxCSS => {
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
});
