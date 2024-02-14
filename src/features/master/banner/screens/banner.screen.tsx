import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';

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
  AutocompleteSearchGroupBy,
} from '@/library/components';
import { BannerList } from '../components';
import { lookupItems, lookupValue } from '@/library/utils';
import { useForm, Controller } from 'react-hook-form';
import { RouterFlow } from '@/flows';
import { useHistory } from 'react-router-dom';
import { BannerHoc } from '../hoc';
import { useStores } from '@/stores';
import { resetBanner } from '../startup';
import { connect } from 'react-redux';
import MainPageHeadingComponents from '@/library/components/atoms/header/main.page.heading.components';

const Banner = BannerHoc(
  observer(({ sidebar }) => {
    const { loginStore, routerStore, bannerStore, appStore } = useStores();
    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
      reset,
    } = useForm();
    const history = useHistory();

    useEffect(() => {
      // Default value initialization
      // setValue('environment', bannerStore.banner?.environment);
      setValue('order', bannerStore.banner?.order);
      setValue('status', bannerStore.banner?.status);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bannerStore.banner]);

    const [modalConfirm, setModalConfirm] = useState<any>();
    const [hideAddBanner, setHideAddBanner] = useState<boolean>(true);
    const [isImport, setIsImport] = useState<boolean>(false);
    const [arrImportRecords, setArrImportRecords] = useState<Array<any>>([]);

    const onSubmitBanner = async () => {
      await bannerStore.BannerService.addBanner({
        input: isImport
          ? { isImport, arrImportRecords }
          : { isImport, ...bannerStore.banner },
      }).then(res => {
        if (res.createBanner.success) {
          Toast.success({
            message: `😊 ${res.createBanner.message}`,
          });
          setHideAddBanner(true);
          reset();
          resetBanner();
          setArrImportRecords([]);
          setIsImport(false);
        }
      });
    };

    return (
      <>
        <MainPageHeadingComponents
          title={routerStore.selectedComponents?.title || ''}
          store={loginStore}
        />
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
                  render={({ field: { onChange, value } }) => (
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
                  rules={{ required: true }}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Form.InputFile
                      label='File'
                      placeholder={
                        errors.image ? 'Please insert image' : 'File'
                      }
                      value={value ? value?.filename : ''}
                      hasError={!!errors.image}
                      onChange={e => {
                        const file = e.target.files[0];
                        onChange(file);
                        bannerStore.updateBanner({
                          ...bannerStore.banner,
                          file,
                        });
                      }}
                    />
                  )}
                  name='image'
                  rules={{ required: true }}
                  defaultValue={bannerStore.banner?.image}
                />
                <div className='flex gap-4'>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.Input
                        label='Order'
                        type='number'
                        placeholder={
                          errors.order ? 'Please Enter Order' : 'Order'
                        }
                        hasError={!!errors.order}
                        value={value}
                        onChange={order => {
                          onChange(order);
                          bannerStore.updateBanner({
                            ...bannerStore.banner,
                            order: Number.parseInt(order),
                          });
                        }}
                      />
                    )}
                    name='order'
                    rules={{ required: true }}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.Toggle
                        label='Title on/off'
                        hasError={!!errors.isTitle}
                        value={value}
                        onChange={isTitle => {
                          onChange(isTitle);
                          bannerStore.updateBanner({
                            ...bannerStore.banner,
                            isTitle,
                          });
                        }}
                      />
                    )}
                    name='isTitle'
                    rules={{ required: false }}
                    defaultValue=''
                  />
                </div>

                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Form.InputWrapper
                      label='Status'
                      hasError={!!errors.status}
                    >
                      <select
                        value={value}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.status ? 'border-red  ' : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const status = e.target.value;
                          onChange(status);
                          bannerStore.updateBanner({
                            ...bannerStore.banner,
                            status,
                          });
                        }}
                      >
                        <option selected>Select</option>
                        {lookupItems(routerStore.lookupItems, 'STATUS').map(
                          (item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          ),
                        )}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='status'
                  rules={{ required: false }}
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
          <div className='p-2 rounded-lg shadow-xl -z-50 overflow-auto'>
            <BannerList
              data={bannerStore.listBanner || []}
              totlaSize={bannerStore.listBannerCount}
              extraData={{
                lookupItems: routerStore.lookupItems,
              }}
              isView={RouterFlow.checkPermission(
                routerStore.userPermission,
                'View',
              )}
              isDelete={RouterFlow.checkPermission(
                routerStore.userPermission,
                'Delete',
              )}
              isUpdate={RouterFlow.checkPermission(
                routerStore.userPermission,
                'Update',
              )}
              isExport={RouterFlow.checkPermission(
                routerStore.userPermission,
                'Export',
              )}
              onDelete={selectedItem => setModalConfirm(selectedItem)}
              onSelectedRow={rows => {
                setModalConfirm({
                  show: true,
                  type: 'Delete',
                  id: rows,
                  title: 'Are you sure?',
                  body: 'Do you want to delete this record?',
                });
              }}
              onUpdateItem={(value: any, dataField: string, id: string) => {
                setModalConfirm({
                  show: true,
                  type: 'Update',
                  data: { value, dataField, id },
                  title: 'Are you sure?',
                  body: 'Do you want to update this record?',
                });
              }}
              onUpdateImage={(value: any, dataField: string, id: string) => {
                setModalConfirm({
                  show: true,
                  type: 'UpdateImage',
                  data: { value, dataField, id },
                  title: 'Are you sure?',
                  body: 'Do you want to update image?',
                });
              }}
              onPageSizeChange={(page, limit) => {
                bannerStore.fetchListBanner(page, limit);
                global.filter = { mode: 'pagination', page, limit };
              }}
              onFilter={(type, filter, page, limit) => {
                bannerStore.BannerService.filter({
                  input: { type, filter, page, limit },
                });
                global.filter = {
                  mode: 'filter',
                  type,
                  filter,
                  page,
                  limit,
                };
              }}
              onApproval={async records => {
                setModalConfirm({
                  show: true,
                  type: 'Update',
                  data: { value: 'A', dataField: 'status', id: records._id },
                  title: 'Are you sure?',
                  body: 'Update deginisation!',
                });
              }}
            />
          </div>
          <ModalConfirm
            {...modalConfirm}
            click={(action: string) => {
              switch (action) {
                case 'Delete': {
                  bannerStore.BannerService.deleteBanner({
                    input: { id: modalConfirm.id },
                  }).then((res: any) => {
                    setModalConfirm({ show: false });
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
                    setModalConfirm({ show: false });
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
                    setModalConfirm({ show: false });
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
            onClose={() => setModalConfirm({ show: false })}
          />
        </div>
      </>
    );
  }),
);

export default connect((store: any) => ({
  sidebar: store.sidebar,
}))(Banner);
