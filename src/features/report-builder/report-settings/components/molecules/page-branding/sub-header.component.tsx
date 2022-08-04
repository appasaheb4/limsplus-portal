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
        name='order'
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
        name='headerCSS'
        rules={{required: false}}
        defaultValue=''
      />
      <Controller
        control={control}
        render={({field: {onChange}}) => (
          <Form.MultilineInput
            label='Sub Title HTML Format'
            style={{color: '#ffffff', backgroundColor: '#000000'}}
            placeholder={
              'Like <p>Web: www.limsplus.com</p><br/><p>Cin No: 1234</p>'
            }
            value={reportSettingStore.pageBranding?.subHeader?.webCSS}
            onChange={webCSS => {
              reportSettingStore.updatePageBranding({
                ...reportSettingStore.pageBranding,
                subHeader: {
                  ...reportSettingStore.pageBranding.subHeader,
                  webCSS,
                },
              });
            }}
          />
        )}
        name='webCSS'
        rules={{required: false}}
        defaultValue=''
      />
      <Controller
        control={control}
        render={({field: {onChange}}) => (
          <Form.Input
            label='Web'
            placeholder='Web'
            hasError={!!errors.web}
            value={reportSettingStore.pageBranding?.subHeader?.web}
            onChange={web => {
              onChange(web);
              reportSettingStore.updatePageBranding({
                ...reportSettingStore.pageBranding,
                subHeader: {
                  ...reportSettingStore.pageBranding?.subHeader,
                  web,
                },
              });
            }}
          />
        )}
        name='web'
        rules={{required: false}}
        defaultValue=''
      />

      <Controller
        control={control}
        render={({field: {onChange}}) => (
          <Form.MultilineInput
            label='Web CSS'
            style={{color: '#ffffff', backgroundColor: '#000000'}}
            placeholder={"Like {fontSize: 12,backgroundColor:'#000000'}"}
            value={reportSettingStore.pageBranding?.subHeader?.webCSS}
            onChange={webCSS => {
              reportSettingStore.updatePageBranding({
                ...reportSettingStore.pageBranding,
                subHeader: {
                  ...reportSettingStore.pageBranding.subHeader,
                  webCSS,
                },
              });
            }}
          />
        )}
        name='webCSS'
        rules={{required: false}}
        defaultValue=''
      />
      <Controller
        control={control}
        render={({field: {onChange}}) => (
          <Form.Input
            label='Cin No'
            placeholder='Cin No'
            hasError={!!errors.cinNo}
            value={reportSettingStore.pageBranding?.subHeader?.cinNo}
            onChange={cinNo => {
              onChange(cinNo);
              reportSettingStore.updatePageBranding({
                ...reportSettingStore.pageBranding,
                subHeader: {
                  ...reportSettingStore.pageBranding?.subHeader,
                  cinNo,
                },
              });
            }}
          />
        )}
        name='cinNo'
        rules={{required: false}}
        defaultValue=''
      />

      <Controller
        control={control}
        render={({field: {onChange}}) => (
          <Form.MultilineInput
            label='Cin No CSS'
            style={{color: '#ffffff', backgroundColor: '#000000'}}
            placeholder={"Like {fontSize: 12,backgroundColor:'#000000'}"}
            value={reportSettingStore.pageBranding?.subHeader?.cinNoCSS}
            onChange={cinNoCSS => {
              reportSettingStore.updatePageBranding({
                ...reportSettingStore.pageBranding,
                subHeader: {
                  ...reportSettingStore.pageBranding.subHeader,
                  cinNoCSS,
                },
              });
            }}
          />
        )}
        name='cinNoCSS'
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
            value={reportSettingStore.pageBranding?.subHeader?.mainBoxCss}
            onChange={mainBoxCss => {
              reportSettingStore.updatePageBranding({
                ...reportSettingStore.pageBranding,
                subHeader: {
                  ...reportSettingStore.pageBranding.subHeader,
                  mainBoxCss,
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
