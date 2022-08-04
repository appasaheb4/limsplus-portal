import React from 'react';
import {observer} from 'mobx-react';
import _ from 'lodash';
import {Form} from '@/library/components';
import {useForm, Controller} from 'react-hook-form';
import {useStores} from '@/stores';

export const PageBrandingFooter = observer(() => {
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
            placeholder={"Like {fontSize: 12,backgroundColor:'#000000'}"}
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
            label='Tel'
            placeholder='Tel'
            hasError={!!errors.footerTel}
            value={reportSettingStore.pageBranding?.footer?.tel}
            onChange={tel => {
              onChange(tel);
              reportSettingStore.updatePageBranding({
                ...reportSettingStore.pageBranding,
                footer: {
                  ...reportSettingStore.pageBranding?.footer,
                  tel,
                },
              });
            }}
          />
        )}
        name='footerTel'
        rules={{required: false}}
        defaultValue=''
      />

      <Controller
        control={control}
        render={({field: {onChange}}) => (
          <Form.MultilineInput
            label='Tel CSS'
            style={{color: '#ffffff', backgroundColor: '#000000'}}
            placeholder={"Like {fontSize: 12,backgroundColor:'#000000'}"}
            value={reportSettingStore.pageBranding?.footer?.telCSS}
            onChange={telCSS => {
              reportSettingStore.updatePageBranding({
                ...reportSettingStore.pageBranding,
                footer: {
                  ...reportSettingStore.pageBranding.footer,
                  telCSS,
                },
              });
            }}
          />
        )}
        name='footerTelCSS'
        rules={{required: false}}
        defaultValue=''
      />
      <Controller
        control={control}
        render={({field: {onChange}}) => (
          <Form.Input
            label='Mail'
            placeholder='Mail'
            hasError={!!errors.footerMail}
            value={reportSettingStore.pageBranding?.footer?.mail}
            onChange={mail => {
              onChange(mail);
              reportSettingStore.updatePageBranding({
                ...reportSettingStore.pageBranding,
                footer: {
                  ...reportSettingStore.pageBranding?.footer,
                  mail,
                },
              });
            }}
          />
        )}
        name='footerMail'
        rules={{required: false}}
        defaultValue=''
      />

      <Controller
        control={control}
        render={({field: {onChange}}) => (
          <Form.MultilineInput
            label='Mail CSS'
            style={{color: '#ffffff', backgroundColor: '#000000'}}
            placeholder={"Like {fontSize: 12,backgroundColor:'#000000'}"}
            value={reportSettingStore.pageBranding?.footer?.mailCSS}
            onChange={mailCSS => {
              reportSettingStore.updatePageBranding({
                ...reportSettingStore.pageBranding,
                footer: {
                  ...reportSettingStore.pageBranding.footer,
                  mailCSS,
                },
              });
            }}
          />
        )}
        name='footerMailCSS'
        rules={{required: false}}
        defaultValue=''
      />
      <Controller
        control={control}
        render={({field: {onChange}}) => (
          <Form.MultilineInput
            label='Main Box CSS'
            style={{color: '#ffffff', backgroundColor: '#000000'}}
            placeholder={"Like {fontSize: 12,backgroundColor:'#000000'}"}
            value={reportSettingStore.pageBranding?.footer?.mainBoxCss}
            onChange={mainBoxCss => {
              reportSettingStore.updatePageBranding({
                ...reportSettingStore.pageBranding,
                footer: {
                  ...reportSettingStore.pageBranding?.footer,
                  mainBoxCss,
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
