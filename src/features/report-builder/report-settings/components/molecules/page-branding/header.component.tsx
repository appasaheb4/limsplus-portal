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
      <Grid cols={4}>
        <Controller
          control={control}
          render={({field: {onChange}}) => (
            <Form.Toggle
              label='Header Visible'
              hasError={!!errors.headerVisible}
              value={reportSettingStore.pageBranding?.header?.isVisible}
              onChange={isVisible => {
                onChange(isVisible);
                reportSettingStore.updatePageBranding({
                  ...reportSettingStore.pageBranding,
                  header: {
                    ...reportSettingStore.pageBranding.header,
                    isVisible,
                  },
                });
              }}
            />
          )}
          name='headerVisible'
          rules={{required: false}}
          defaultValue=''
        />
        <Controller
          control={control}
          render={({field: {onChange}}) => (
            <Form.Toggle
              label='Sub Header Visible'
              hasError={!!errors.subHeaderVisible}
              value={reportSettingStore.pageBranding?.subHeader?.isVisible}
              onChange={isVisible => {
                onChange(isVisible);
                reportSettingStore.updatePageBranding({
                  ...reportSettingStore.pageBranding,
                  subHeader: {
                    ...reportSettingStore.pageBranding.subHeader,
                    isVisible,
                  },
                });
              }}
            />
          )}
          name='subHeaderVisible'
          rules={{required: false}}
          defaultValue=''
        />
        <Controller
          control={control}
          render={({field: {onChange}}) => (
            <Form.Toggle
              label='Footer Visible'
              hasError={!!errors.footerVisible}
              value={reportSettingStore.pageBranding?.footer?.isVisible}
              onChange={isVisible => {
                onChange(isVisible);
                reportSettingStore.updatePageBranding({
                  ...reportSettingStore.pageBranding,
                  footer: {
                    ...reportSettingStore.pageBranding.footer,
                    isVisible,
                  },
                });
              }}
            />
          )}
          name='footerVisible'
          rules={{required: false}}
          defaultValue=''
        />
        <Controller
          control={control}
          render={({field: {onChange}}) => (
            <Form.Toggle
              label='Page Number'
              hasError={!!errors.pageNumber}
              value={reportSettingStore.pageBranding?.isPdfPageNumber}
              onChange={isPdfPageNumber => {
                onChange(isPdfPageNumber);
                reportSettingStore.updatePageBranding({
                  ...reportSettingStore.pageBranding,
                  isPdfPageNumber,
                });
              }}
            />
          )}
          name='pageNumber'
          rules={{required: false}}
          defaultValue=''
        />
      </Grid>

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
            hasError={!!errors.image}
            onChange={e => {
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
        render={({field: {onChange}}) => (
          <Form.MultilineInput
            label='Logo CSS'
            style={{color: '#ffffff', backgroundColor: '#000000'}}
            placeholder={"Like {fontSize: 12,backgroundColor:'#000000'}"}
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
