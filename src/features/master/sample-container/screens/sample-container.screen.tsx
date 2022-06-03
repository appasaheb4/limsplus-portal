import React, {useState} from 'react';
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
import {lookupItems, lookupValue} from '@/library/utils';
import {SampleContainerList} from '../components';

import {useForm, Controller} from 'react-hook-form';
import {SampleContainerHoc} from '../hoc';
import {useStores} from '@/stores';

import {RouterFlow} from '@/flows';

const SampleContainer = SampleContainerHoc(
  observer(() => {
    const {loginStore, sampleContainerStore, routerStore} = useStores();
    const {
      control,
      formState: {errors},
      handleSubmit,
      setValue,
    } = useForm();

    setValue('environment', sampleContainerStore.sampleContainer?.environment);

    const [modalConfirm, setModalConfirm] = useState<any>();
    const [hideAddBanner, setHideAddBanner] = useState<boolean>(true);
    const onSubmitSampleContainer = () => {
      if (!sampleContainerStore.checkExitsEnvCode) {
        sampleContainerStore.sampleContainerService
          .addSampleContainer({
            input: {...sampleContainerStore.sampleContainer},
          })
          .then(res => {
            if (res.createSampleContainer.success) {
              Toast.success({
                message: `😊 ${res.createSampleContainer.message}`,
              });
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            }
          });
      } else {
        Toast.warning({
          message: '😔 Please enter diff code',
        });
      }
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
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Container Code'
                      hasError={errors.containerCode}
                      placeholder={
                        errors.containerCode
                          ? 'Please Enter Container Code '
                          : 'Conatiner Code'
                      }
                      value={
                        sampleContainerStore.sampleContainer?.containerCode
                      }
                      onChange={containerCode => {
                        onChange(containerCode);
                        sampleContainerStore.updateSampleContainer({
                          ...sampleContainerStore.sampleContainer,
                          containerCode: containerCode.toUpperCase(),
                        });
                      }}
                      onBlur={code => {
                        sampleContainerStore.sampleContainerService
                          .checkExitsEnvCode({
                            input: {
                              code,
                              env: sampleContainerStore.sampleContainer
                                ?.environment,
                            },
                          })
                          .then(res => {
                            if (res.checkSampleContainersExistsRecord.success) {
                              sampleContainerStore.updateExitsEnvCode(true);
                              Toast.error({
                                message: `😔 ${res.checkSampleContainersExistsRecord.message}`,
                              });
                            } else
                              sampleContainerStore.updateExitsEnvCode(false);
                          });
                      }}
                    />
                  )}
                  name='containerCode'
                  rules={{required: true}}
                  defaultValue=''
                />
                {sampleContainerStore.checkExitsEnvCode && (
                  <span className='text-red-600 font-medium relative'>
                    Code already exits. Please use other code.
                  </span>
                )}
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Container Name'
                      hasError={errors.containerName}
                      placeholder={
                        errors.containerName
                          ? 'Please Enter Container Name'
                          : 'Container Name'
                      }
                      value={
                        sampleContainerStore.sampleContainer?.containerName
                      }
                      onChange={containerName => {
                        onChange(containerName);
                        sampleContainerStore.updateSampleContainer({
                          ...sampleContainerStore.sampleContainer,
                          containerName: containerName.toUpperCase(),
                        });
                      }}
                    />
                  )}
                  name='containerName'
                  rules={{required: true}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputFile
                      label='Image'
                      placeholder={
                        errors.image ? 'Please Insert Image' : 'Image'
                      }
                      hasError={errors.image}
                      onChange={e => {
                        const image = e.target.files[0];
                        onChange(image);
                        sampleContainerStore.updateSampleContainer({
                          ...sampleContainerStore.sampleContainer,
                          image,
                        });
                      }}
                    />
                  )}
                  name='image'
                  rules={{required: false}}
                  defaultValue=''
                />
              </List>

              <List direction='col' space={4} justify='stretch' fill>
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.MultilineInput
                      rows={5}
                      label='Description'
                      hasError={errors.description}
                      placeholder={
                        errors.description
                          ? 'Please Enter Description'
                          : 'Description'
                      }
                      value={sampleContainerStore.sampleContainer?.description}
                      onChange={description => {
                        onChange(description);
                        sampleContainerStore.updateSampleContainer({
                          ...sampleContainerStore.sampleContainer,
                          description,
                        });
                      }}
                    />
                  )}
                  name='description'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper label='Environment'>
                      <select
                        value={
                          sampleContainerStore.sampleContainer?.environment
                        }
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.environment
                            ? 'border-red-500  '
                            : 'border-gray-300'
                        } rounded-md`}
                        disabled={
                          loginStore.login &&
                          loginStore.login.role !== 'SYSADMIN'
                            ? true
                            : false
                        }
                        onChange={e => {
                          const environment = e.target.value;
                          onChange(environment);
                          sampleContainerStore.updateSampleContainer({
                            ...sampleContainerStore.sampleContainer,
                            environment,
                          });
                          sampleContainerStore.sampleContainerService
                            .checkExitsEnvCode({
                              input: {
                                code: sampleContainerStore.sampleContainer
                                  ?.containerCode,
                                env: environment,
                              },
                            })
                            .then(res => {
                              if (
                                res.checkSampleContainersExistsRecord.success
                              ) {
                                sampleContainerStore.updateExitsEnvCode(true);
                                Toast.error({
                                  message: `😔 ${res.checkSampleContainersExistsRecord.message}`,
                                });
                              } else
                                sampleContainerStore.updateExitsEnvCode(false);
                            });
                        }}
                      >
                        <option selected>
                          {loginStore.login &&
                          loginStore.login.role !== 'SYSADMIN'
                            ? 'Select'
                            : sampleContainerStore.sampleContainer
                                ?.environment || 'Select'}
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
                onClick={handleSubmit(onSubmitSampleContainer)}
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
            <SampleContainerList
              data={sampleContainerStore.listSampleContainer || []}
              totalSize={sampleContainerStore.listSampleContainerCount}
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
                  body: 'Update item!',
                });
              }}
              onUpdateImage={(value: any, dataField: string, id: string) => {
                setModalConfirm({
                  show: true,
                  type: 'UpdateImage',
                  data: {value, dataField, id},
                  title: 'Are you sure?',
                  body: 'Record update!',
                });
              }}
              onPageSizeChange={(page, limit) => {
                sampleContainerStore.fetchListSampleContainer(page, limit);
              }}
              onFilter={(type, filter, page, limit) => {
                sampleContainerStore.sampleContainerService.filter({
                  input: {type, filter, page, limit},
                });
              }}
            />
          </div>
          <ModalConfirm
            {...modalConfirm}
            click={(type: string) => {
              if (type === 'Delete') {
                sampleContainerStore.sampleContainerService
                  .deleteSampleContainer({input: {id: modalConfirm.id}})
                  .then((res: any) => {
                    if (res.removeSampleContainer.success) {
                      Toast.success({
                        message: `😊 ${res.removeSampleContainer.message}`,
                      });
                      setModalConfirm({show: false});
                      sampleContainerStore.fetchListSampleContainer();
                    }
                  });
              } else if (type === 'Update') {
                sampleContainerStore.sampleContainerService
                  .updateSingleFiled({
                    input: {
                      _id: modalConfirm.data.id,
                      [modalConfirm.data.dataField]: modalConfirm.data.value,
                    },
                  })
                  .then((res: any) => {
                    if (res.updateSampleContainer.success) {
                      Toast.success({
                        message: `😊 ${res.updateSampleContainer.message}`,
                      });
                      setModalConfirm({show: false});
                      sampleContainerStore.fetchListSampleContainer();
                    }
                  });
              } else {
                sampleContainerStore.sampleContainerService
                  .updateImage({
                    input: {
                      _id: modalConfirm.data.id,
                      image: modalConfirm.data.value,
                    },
                  })
                  .then((res: any) => {
                    if (res.updateSampleContainersImage.success) {
                      Toast.success({
                        message: `😊 ${res.updateSampleContainersImage.message}`,
                      });
                      setTimeout(() => {
                        window.location.reload();
                      }, 2000);
                    }
                  });
              }
            }}
            onClose={() => setModalConfirm({show: false})}
          />
        </div>
      </>
    );
  }),
);

export default SampleContainer;
