import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import _ from 'lodash';
import {Form} from '@/library/components';
import {useForm, Controller} from 'react-hook-form';
import {useStores} from '@/stores';
import {resizeFile} from '@/library/utils';
interface PageBrandingFooterComponentProps {
  isClearReset: boolean;
}
export const PageBrandingFooter = observer(
  (props: PageBrandingFooterComponentProps) => {
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
              hasError={!!errors.footerTitle}
              value={value}
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
                  footer: {
                    ...reportSettingStore.pageBranding.footer,
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
  },
);
