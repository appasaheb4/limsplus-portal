import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';

import {
  Toast,
  Buttons,
  Grid,
  List,
  Form,
  Svg,
  ModalConfirm,
} from '@/library/components';
import {PageSettingsList} from '../components';
import {lookupItems, lookupValue} from '@/library/utils';
import {useForm, Controller} from 'react-hook-form';
import {RouterFlow} from '@/flows';
import {useStores} from '@/stores';

import 'react-accessible-accordion/dist/fancy-example.css';
import '@/library/assets/css/accordion.css';

export const PageBranding = observer(() => {
  const {routerStore, reportSettingStore} = useStores();
  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
    setError,
    clearErrors,
  } = useForm();

  const [modalConfirm, setModalConfirm] = useState<any>();
  const [isInputView, setIsInputView] = useState<boolean>(false);
  const [isExistsTempCode, setIsExistsTempCode] = useState<boolean>(false);

  const onSave = () => {
    reportSettingStore.pageSettingService
      .addPageSetting({input: {...reportSettingStore.pageSetting}})
      .then(res => {
        if (res.createPageSetting.success) {
          Toast.success({
            message: `😊 ${res.createPageSetting.message}`,
          });
        }
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
  };

  return (
    <>
      {RouterFlow.checkPermission(routerStore.userPermission, 'Add') && (
        <Buttons.ButtonCircleAddRemoveBottom
          style={{bottom: 140}}
          show={isInputView}
          onClick={() => setIsInputView(!isInputView)}
        />
      )}
      <div
        className={
          'p-2 rounded-lg shadow-xl ' + (isInputView ? 'hidden' : 'shown')
        }
      >
        <Grid cols={3}>
          <List direction='col' space={4} justify='stretch' fill>
            <Controller
              control={control}
              render={({field: {onChange}}) => (
                <Form.Input
                  label='Page Id'
                  placeholder='Page Id'
                  hasError={!!errors.pageId}
                  value={reportSettingStore.pageBranding?.pageId}
                  onChange={pageId => {
                    onChange(pageId);
                    reportSettingStore.updatePageBranding({
                      ...reportSettingStore.pageBranding,
                      pageId,
                    });
                  }}
                />
              )}
              name='pageId'
              rules={{required: true}}
              defaultValue=''
            />
            <fieldset className='border-2 border-solid border-gray-300 p-2'>
              <legend className='font-bold text-sm'>Header</legend>

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
                    placeholder={
                      "Like {fontSize: 12,backgroundColor:'#000000'}"
                    }
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
                    placeholder={
                      "Like {fontSize: 12,backgroundColor:'#000000'}"
                    }
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
                    placeholder={
                      "Like {fontSize: 12,backgroundColor:'#000000'}"
                    }
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
            </fieldset>
          </List>
          <List direction='col' space={4} justify='stretch' fill>
            <fieldset className='border-2 border-solid border-gray-300 p-2'>
              <legend className='font-bold text-sm'>Sub Header</legend>
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
                    placeholder={
                      "Like {fontSize: 12,backgroundColor:'#000000'}"
                    }
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
                    placeholder={
                      "Like {fontSize: 12,backgroundColor:'#000000'}"
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
                    placeholder={
                      "Like {fontSize: 12,backgroundColor:'#000000'}"
                    }
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
                    placeholder={
                      "Like {fontSize: 12,backgroundColor:'#000000'}"
                    }
                    value={
                      reportSettingStore.pageBranding?.subHeader?.mainBoxCss
                    }
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
            </fieldset>
          </List>
          <List direction='col' space={4} justify='stretch' fill>
            <fieldset className='border-2 border-solid border-gray-300 p-2'>
              <legend className='font-bold text-sm'>Footer</legend>
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
                    placeholder={
                      "Like {fontSize: 12,backgroundColor:'#000000'}"
                    }
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
                    placeholder={
                      "Like {fontSize: 12,backgroundColor:'#000000'}"
                    }
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
                    placeholder={
                      "Like {fontSize: 12,backgroundColor:'#000000'}"
                    }
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
                    placeholder={
                      "Like {fontSize: 12,backgroundColor:'#000000'}"
                    }
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
            </fieldset>
          </List>
        </Grid>
        <br />
        <List direction='row' space={3} align='center'>
          <Buttons.Button
            size='medium'
            type='solid'
            icon={Svg.Save}
            onClick={handleSubmit(onSave)}
          >
            Save
          </Buttons.Button>
          <Buttons.Button
            size='medium'
            type='outline'
            icon={Svg.Remove}
            onClick={() => {
              window.location.reload();
            }}
          >
            Clear
          </Buttons.Button>
        </List>
      </div>
      <div className='p-2 rounded-lg shadow-xl overflow-auto'>
        <PageSettingsList
          data={reportSettingStore.pageSettingList || []}
          totalSize={reportSettingStore.pageSettingListCount}
          isDelete={RouterFlow.checkPermission(
            routerStore.userPermission,
            'Delete',
          )}
          isEditModify={RouterFlow.checkPermission(
            routerStore.userPermission,
            'Edit/Modify',
          )}
          onDelete={selectedItem => setModalConfirm(selectedItem)}
          onSelectedRow={rows => {
            setModalConfirm({
              show: true,
              type: 'delete',
              id: rows,
              title: 'Are you sure?',
              body: 'Delete selected items!',
            });
          }}
          onUpdateItem={(value: any, dataField: string, id: string) => {
            setModalConfirm({
              show: true,
              type: 'update',
              data: {value, dataField, id},
              title: 'Are you sure?',
              body: 'Update banner!',
            });
          }}
          onPageSizeChange={(page, limit) => {
            // bannerStore.fetchListBanner(page, limit);
          }}
          onFilter={(type, filter, page, limit) => {
            // bannerStore.BannerService.filter({
            //   input: {type, filter, page, limit},
            // });
          }}
        />
      </div>
      <ModalConfirm
        {...modalConfirm}
        click={(type?: string) => {
          switch (type) {
            case 'delete': {
              reportSettingStore.pageSettingService
                .deletePageSetting({
                  input: {id: modalConfirm.id},
                })
                .then((res: any) => {
                  if (res.removePageSetting.success) {
                    Toast.success({
                      message: `😊 ${res.removePageSetting.message}`,
                    });
                    setModalConfirm({show: false});
                    reportSettingStore.pageSettingService.listPageSetting();
                  }
                });
              break;
            }
          }
        }}
        onClose={() => setModalConfirm({show: false})}
      />
    </>
  );
});
