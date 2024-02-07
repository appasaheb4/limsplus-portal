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
} from '@/library/components';
import { DataConversationList } from '../components';
import { useForm, Controller } from 'react-hook-form';
import { DataConversationHoc } from '../hoc';
import { useStores } from '@/stores';
import { RouterFlow } from '@/flows';
import { toJS } from 'mobx';
import { resetDataConversation } from '../startup';

const DataConversation = DataConversationHoc(
  observer(() => {
    const { loginStore, dataConversationStore, routerStore } = useStores();
    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
      reset,
    } = useForm();
    useEffect(() => {
      // Default value initialization
      // setValue(
      //   'environment',
      //   dataConversationStore.dataConversation?.environment,
      // );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataConversationStore.dataConversation]);
    const [modalConfirm, setModalConfirm] = useState<any>();
    const [hideAddDataConversation, setHideAddDataConversation] =
      useState<boolean>(true);

    const onSubmitDataConversation = () => {
      if (dataConversationStore.dataConversation !== undefined) {
        dataConversationStore.dataConversationService
          .addDataConversation({
            input: { ...dataConversationStore.dataConversation },
          })
          .then(res => {
            if (res.createDataConversation.success) {
              Toast.success({
                message: `😊 ${res.createDataConversation.message}`,
              });
              setHideAddDataConversation(true);
              reset();
              resetDataConversation();
            }
          });
      } else {
        Toast.warning({
          message: '😔Please enter all information!',
        });
      }
    };
    return (
      <>
        <Header>
          <PageHeading title={routerStore.selectedComponents?.title || ''} />
          <PageHeadingLabDetails store={loginStore} />
        </Header>
        {RouterFlow.checkPermission(
          toJS(routerStore.userPermission),
          'Add',
        ) && (
          <Buttons.ButtonCircleAddRemove
            show={hideAddDataConversation}
            onClick={status =>
              setHideAddDataConversation(!hideAddDataConversation)
            }
          />
        )}
        <div className=' mx-auto  flex-wrap'>
          <div
            className={
              'p-2 rounded-lg shadow-xl ' +
              (hideAddDataConversation ? 'hidden' : 'shown')
            }
          >
            <Grid cols={2}>
              <List direction='col' space={4} justify='stretch' fill>
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Form.Input
                      type='text'
                      label='Hexa Decimal'
                      id='hexadecimal'
                      name='hexadecimal'
                      placeholder={
                        errors.hexadecimal
                          ? 'Please Enter hexadecimal'
                          : 'Hexa Decimal'
                      }
                      hasError={!!errors.hexadecimal}
                      value={value}
                      onChange={hexadecimal => {
                        onChange(hexadecimal);
                        dataConversationStore.updateDataConversation({
                          ...dataConversationStore.dataConversation,
                          hexadecimal,
                        });
                      }}
                    />
                  )}
                  name='hexadecimal'
                  rules={{ required: true }}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Form.Input
                      type='text'
                      label='Binary'
                      id='binary'
                      name='binary'
                      placeholder={
                        errors.binary ? 'Please Enter Binary' : 'Binary'
                      }
                      hasError={!!errors.binary}
                      value={value}
                      onChange={binary => {
                        onChange(binary);
                        dataConversationStore.updateDataConversation({
                          ...dataConversationStore.dataConversation,
                          binary,
                        });
                      }}
                    />
                  )}
                  name='binary'
                  rules={{ required: true }}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Form.Input
                      type='text'
                      label='ASCII'
                      id='ascii'
                      name='ascii'
                      placeholder={
                        errors.ascii ? 'Please Enter ascii' : 'ASCII'
                      }
                      hasError={!!errors.ascii}
                      value={value}
                      onChange={ascii => {
                        onChange(ascii);
                        dataConversationStore.updateDataConversation({
                          ...dataConversationStore.dataConversation,
                          ascii,
                        });
                      }}
                    />
                  )}
                  name='ascii'
                  rules={{ required: false }}
                  defaultValue=''
                />
                <div className='clearfix' />
              </List>
            </Grid>
            <List direction='row' space={3} align='center'>
              <Buttons.Button
                size='medium'
                type='solid'
                icon={Svg.Save}
                onClick={handleSubmit(onSubmitDataConversation)}
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
              <div className='clearfix' />
            </List>
          </div>
          <div className='p-2 rounded-lg shadow-xl overflow-scroll'>
            <DataConversationList
              data={dataConversationStore.listdataConversation || []}
              extraData={{ lookupItems: routerStore.lookupItems }}
              totalSize={dataConversationStore.listdataConversationCount}
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
              onDelete={selectedUser => setModalConfirm(selectedUser)}
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
                  data: { value, dataField, id },
                  title: 'Are you sure?',
                  body: 'Update conversation mapping!',
                });
              }}
              onPageSizeChange={(page, limit) => {
                dataConversationStore.fetchDataConversation(page, limit);
                global.filter = { mode: 'pagination', page, limit };
              }}
              onFilter={(type, filter, page, limit) => {
                dataConversationStore.dataConversationService.filter({
                  input: { type, filter, page, limit },
                });
                global.filter = { mode: 'filter', type, filter, page, limit };
              }}
            />
          </div>
          <ModalConfirm
            {...modalConfirm}
            click={(action?: string) => {
              if (action === 'Delete') {
                dataConversationStore.dataConversationService
                  .deleteDataConversation({ input: { id: modalConfirm.id } })
                  .then(res => {
                    setModalConfirm({ show: false });
                    if (res.removeDataConversation.success) {
                      Toast.success({
                        message: `😊 ${res.removeDataConversation.message}`,
                      });
                      if (global?.filter?.mode == 'pagination')
                        dataConversationStore.fetchDataConversation(
                          global?.filter?.page,
                          global?.filter?.limit,
                        );
                      else if (global?.filter?.mode == 'filter')
                        dataConversationStore.dataConversationService.filter({
                          input: {
                            type: global?.filter?.type,
                            filter: global?.filter?.filter,
                            page: global?.filter?.page,
                            limit: global?.filter?.limit,
                          },
                        });
                      else dataConversationStore.fetchDataConversation();
                    }
                  });
              } else if (action == 'Update') {
                dataConversationStore.dataConversationService
                  .updateDataConversationUpdateSingleFiled({
                    input: {
                      _id: modalConfirm.data.id,
                      [modalConfirm.data.dataField]: modalConfirm.data.value,
                    },
                  })
                  .then(res => {
                    setModalConfirm({ show: false });
                    if (res.updateDataConversation.success) {
                      Toast.success({
                        message: `😊 ${res.updateDataConversation.message}`,
                      });
                      if (global?.filter?.mode == 'pagination')
                        dataConversationStore.fetchDataConversation(
                          global?.filter?.page,
                          global?.filter?.limit,
                        );
                      else if (global?.filter?.mode == 'filter')
                        dataConversationStore.dataConversationService.filter({
                          input: {
                            type: global?.filter?.type,
                            filter: global?.filter?.filter,
                            page: global?.filter?.page,
                            limit: global?.filter?.limit,
                          },
                        });
                      else dataConversationStore.fetchDataConversation();
                    }
                  });
              }
            }}
            close={() => setModalConfirm({ show: false })}
          />
        </div>
      </>
    );
  }),
);

export default DataConversation;
