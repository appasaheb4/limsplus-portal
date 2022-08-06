import React from 'react';
import {observer} from 'mobx-react';
import _ from 'lodash';
import {Form} from '@/library/components';
import {useForm, Controller} from 'react-hook-form';
import {useStores} from '@/stores';

export const PageBrandingFooter = observer(() => {
  const {reportSettingStore} = useStores();
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
            hasError={!!errors.footerTitle}
            value={reportSettingStore.pageBranding?.footer?.title}
            onChange={title => {
              onChange(title);
              reportSettingStore.updatePageBranding({
                ...reportSettingStore.pageBranding,
                footer: {
                  ...reportSettingStore.pageBranding?.footer,
                  title,
                },
              });
            }}
          />
        )}
        name='footerTitle'
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
            value={reportSettingStore.pageBranding?.footer?.titleCSS}
            onChange={titleCSS => {
              reportSettingStore.updatePageBranding({
                ...reportSettingStore.pageBranding,
                footer: {
                  ...reportSettingStore.pageBranding.footer,
                  titleCSS,
                },
              });
            }}
          />
        )}
        name='footerTitleCSS'
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
            value={reportSettingStore.pageBranding?.footer?.subTitle}
            onChange={subTitle => {
              onChange(subTitle);
              reportSettingStore.updatePageBranding({
                ...reportSettingStore.pageBranding,
                footer: {
                  ...reportSettingStore.pageBranding?.footer,
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
            value={reportSettingStore.pageBranding?.footer?.subTitleCSS}
            onChange={subTitleCSS => {
              reportSettingStore.updatePageBranding({
                ...reportSettingStore.pageBranding,
                footer: {
                  ...reportSettingStore.pageBranding.footer,
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
            value={reportSettingStore.pageBranding?.footer?.mainBoxCSS}
            onChange={mainBoxCSS => {
              reportSettingStore.updatePageBranding({
                ...reportSettingStore.pageBranding,
                footer: {
                  ...reportSettingStore.pageBranding?.footer,
                  mainBoxCSS,
                },
              });
            }}
          />
        )}
        name='footerMainBoxCss'
        rules={{required: false}}
        defaultValue=''
      />
    </>
  );
});
