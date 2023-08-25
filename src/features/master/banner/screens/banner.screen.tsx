import React, {useState, useEffect} from 'react';
import {observer} from 'mobx-react';

import {
  Toast,
  Header,
  PageHeading,
  PageHeadingLabDetails,
  Buttons,
  Grid,
  List,
  Form,
  Svg,
  ModalConfirm,
} from '@/library/components';
import {BannerList} from '../components';
import {lookupItems, lookupValue} from '@/library/utils';
import {useForm, Controller} from 'react-hook-form';
import {RouterFlow} from '@/flows';

import {BannerHoc} from '../hoc';
import {useStores} from '@/stores';
import {resetBanner} from '../startup';

const Banner = BannerHoc(
  observer(() => {
    const {loginStore, routerStore, bannerStore} = useStores();
    const {
      control,
      handleSubmit,
      formState: {errors},
      setValue,
      reset,
    } = useForm();
    useEffect(() => {
      // Default value initialization
      setValue('environment', bannerStore.banner?.environment);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bannerStore.banner]);

    const [modalConfirm, setModalConfirm] = useState<any>();
    const [hideAddBanner, setHideAddBanner] = useState<boolean>(true);

    const onSubmitBanner = async () => {
      await bannerStore.BannerService.addBanner({
        input: {...bannerStore.banner},
      }).then(res => {
        if (res.createBanner.success) {
          Toast.success({
            message: `😊 ${res.createBanner.message}`,
          });
          setHideAddBanner(true);
          reset();
          resetBanner();
        }
      });
    };

    return (
      <>
        <Header>
          <PageHeading title={routerStore.selectedComponents?.title || ''} />
          <PageHeadingLabDetails store={loginStore} />
        </Header>
        {RouterFlow.checkPermission(routerStore.userPermission, 'Add') && (
          <Buttons.ButtonCircleAddRemove
            show={hideAddBanner}
            onClick={() => setHideAddBanner(!hideAddBanner)}
          />
        )}
        <div className='mx-auto flex-wrap'>
          <div
            className={
              'p-2 rounded-lg shadow-xl ' + (hideAddBanner ? 'hidden' : 'shown')
            }
          >
            <Grid cols={2}>
              <List direction='col' space={4} justify='stretch' fill>
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Input
                      label='Title'
                      placeholder={
                        errors.title ? 'Please Enter Title' : 'Title'
                      }
                      hasError={!!errors.title}
                      value={value}
                      onChange={title => {
                        onChange(title);
                        bannerStore.updateBanner({
                          ...bannerStore.banner,
                          title,
                        });
                      }}
                    />
                  )}
                  name='title'
                  rules={{required: true}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputFile
                      label='File'
                      placeholder={
                        errors.image ? 'Please insert image' : 'File'
                      }
                      value={value ? value?.filename : ''}
                      hasError={!!errors.image}
                      onChange={e => {
                        const image = e.target.files[0];
                        onChange(image);
                        bannerStore.updateBanner({
                          ...bannerStore.banner,
                          image,
                        });
                      }}
                    />
                  )}
                  name='image'
                  rules={{required: true}}
                  defaultValue={bannerStore.banner?.image}
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper label='Environment'>
                      <select
                        value={value}
                        disabled={
                          loginStore.login &&
                          loginStore.login.role !== 'SYSADMIN'
                            ? true
                            : false
                        }
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.environment
                            ? 'border-red  '
                            : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const environment = e.target.value;
                          onChange(environment);
                          bannerStore.updateBanner({
                            ...bannerStore.banner,
                            environment,
                          });
                        }}
                      >
                        <option selected>
                          {loginStore.login &&
                          loginStore.login.role !== 'SYSADMIN'
                            ? 'Select'
                            : bannerStore.banner?.environment || 'Select'}
                        </option>
                        {lookupItems(
                          routerStore.lookupItems,
                          'ENVIRONMENT',
                        ).map((item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {lookupValue(item)}
                          </option>
                        ))}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='environment'
                  rules={{required: true}}
                  defaultValue=''
                />
              </List>
            </Grid>
            <br />
            <List direction='row' space={3} align='center'>
              <Buttons.Button
                size='medium'
                type='solid'
                icon={Svg.Save}
                onClick={handleSubmit(onSubmitBanner)}
              >
                Save
              </Buttons.Button>
              <Buttons.Button
                size='medium'
                type='outline'
                icon={Svg.Remove}
                onClick={() => {
                  reset();
                  resetBanner();
                }}
              >
                Clear
              </Buttons.Button>
            </List>
          </div>
          <div className='p-2 rounded-lg shadow-xl overflow-auto'>
            <BannerList
              data={bannerStore.listBanner || []}
              totlaSize={bannerStore.listBannerCount}
              extraData={{
                lookupItems: routerStore.lookupItems,
              }}
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
                  type: 'Delete',
                  id: rows,
                  title: 'Are you sure?',
                  body: 'Delete selected items!',
                });
              }}
              onUpdateItem={(value: any, dataField: string, id: string) => {
                setModalConfirm({
                  show: true,
                  type: 'Update',
                  data: {value, dataField, id},
                  title: 'Are you sure?',
                  body: 'Update banner!',
                });
              }}
              onUpdateImage={(value: any, dataField: string, id: string) => {
                setModalConfirm({
                  show: true,
                  type: 'UpdateImage',
                  data: {value, dataField, id},
                  title: 'Are you sure?',
                  body: 'Update banner!',
                });
              }}
              onPageSizeChange={(page, limit) => {
                bannerStore.fetchListBanner(page, limit);
                global.filter = {mode: 'pagination', page, limit};
              }}
              onFilter={(type, filter, page, limit) => {
                bannerStore.BannerService.filter({
                  input: {type, filter, page, limit},
                });
                global.filter = {
                  mode: 'filter',
                  type,
                  filter,
                  page,
                  limit,
                };
              }}
            />
          </div>
          <ModalConfirm
            {...modalConfirm}
            click={(action: string) => {
              switch (action) {
                case 'Delete': {
                  bannerStore.BannerService.deleteBanner({
                    input: {id: modalConfirm.id},
                  }).then((res: any) => {
                    setModalConfirm({show: false});
                    if (res.removeBanner.success) {
                      Toast.success({
                        message: `😊 ${res.removeBanner.message}`,
                      });
                      if (global?.filter?.mode == 'pagination')
                        bannerStore.fetchListBanner(
                          global?.filter?.page,
                          global?.filter?.limit,
                        );
                      else if (global?.filter?.mode == 'filter')
                        bannerStore.BannerService.filter({
                          input: {
                            type: global?.filter?.type,
                            filter: global?.filter?.filter,
                            page: global?.filter?.page,
                            limit: global?.filter?.limit,
                          },
                        });
                      else bannerStore.fetchListBanner();
                    }
                  });
                  break;
                }

                case 'Update': {
                  bannerStore.BannerService.updateSingleFiled({
                    input: {
                      _id: modalConfirm.data.id,
                      [modalConfirm.data.dataField]: modalConfirm.data.value,
                    },
                  }).then((res: any) => {
                    setModalConfirm({show: false});
                    if (res.updateBanner.success) {
                      Toast.success({
                        message: `😊 ${res.updateBanner.message}`,
                      });
                      if (global?.filter?.mode == 'pagination')
                        bannerStore.fetchListBanner(
                          global?.filter?.page,
                          global?.filter?.limit,
                        );
                      else if (global?.filter?.mode == 'filter')
                        bannerStore.BannerService.filter({
                          input: {
                            type: global?.filter?.type,
                            filter: global?.filter?.filter,
                            page: global?.filter?.page,
                            limit: global?.filter?.limit,
                          },
                        });
                      else bannerStore.fetchListBanner();
                    }
                  });
                  break;
                }

                case 'UpdateImage': {
                  bannerStore.BannerService.updateBannerImage({
                    input: {
                      _id: modalConfirm.data.id,
                      file: modalConfirm.data.value,
                    },
                  }).then((res: any) => {
                    setModalConfirm({show: false});
                    if (res.updateBannerImage.success) {
                      Toast.success({
                        message: `😊 ${res.updateBannerImage.message}`,
                      });
                      setTimeout(() => {
                        bannerStore.fetchListBanner();
                      }, 2000);
                    }
                  });
                  break;
                }
              }
            }}
            onClose={() => setModalConfirm({show: false})}
          />
        </div>
      </>
    );
  }),
);

export default Banner;
