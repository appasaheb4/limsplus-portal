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
import {DataConversationList} from '../components';
import {lookupItems, lookupValue} from '@/library/utils';

import {useForm, Controller} from 'react-hook-form';
import {DataConversationHoc} from '../hoc';
import {useStores} from '@/stores';

import {RouterFlow} from '@/flows';
import {toJS} from 'mobx';

const DataConversation = DataConversationHoc(
  observer(() => {
    const {loginStore, dataConversationStore, routerStore} = useStores();
    const {
      control,
      handleSubmit,
      formState: {errors},
      setValue,
    } = useForm();

    setValue(
      'environment',
      dataConversationStore.dataConversation?.environment,
    );
    const [modalConfirm, setModalConfirm] = useState<any>();
    const [hideAddDataConversation, setHideAddDataConversation] =
      useState<boolean>(true);

    const onSubmitDataConversation = () => {
      if (dataConversationStore.dataConversation !== undefined) {
        dataConversationStore.dataConversationService
          .addDataConversation({
            input: {...dataConversationStore.dataConversation},
          })
          .then(res => {
            if (res.createDataConversation.success) {
              Toast.success({
                message: `😊 ${res.createDataConversation.message}`,
              });
              setTimeout(() => {
                window.location.reload();
              }, 2000);
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
                  render={({field: {onChange}}) => (
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
                      hasError={errors.hexadecimal}
                      value={
                        dataConversationStore.dataConversation?.hexadecimal
                      }
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
                  rules={{required: true}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      type='text'
                      label='Binary'
                      id='binary'
                      name='binary'
                      placeholder={
                        errors.binary ? 'Please Enter Binary' : 'Binary'
                      }
                      hasError={errors.binary}
                      value={dataConversationStore.dataConversation?.binary}
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
                  rules={{required: true}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      type='text'
                      label='ASCII'
                      id='ascii'
                      name='ascii'
                      placeholder={
                        errors.ascii ? 'Please Enter ascii' : 'ASCII'
                      }
                      hasError={errors.ascii}
                      value={dataConversationStore.dataConversation?.ascii}
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
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper label='Environment'>
                      <select
                        value={
                          dataConversationStore.dataConversation?.environment
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
                          dataConversationStore.updateDataConversation({
                            ...dataConversationStore.dataConversation,
                            environment,
                          });
                        }}
                      >
                        <option selected>
                          {loginStore.login &&
                          loginStore.login.role !== 'SYSADMIN'
                            ? 'Select'
                            : dataConversationStore.dataConversation
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
              extraData={{lookupItems: routerStore.lookupItems}}
              totalSize={dataConversationStore.listdataConversationCount}
              isDelete={RouterFlow.checkPermission(
                toJS(routerStore.userPermission),
                'Delete',
              )}
              isEditModify={RouterFlow.checkPermission(
                toJS(routerStore.userPermission),
                'Edit/Modify',
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
                  data: {value, dataField, id},
                  title: 'Are you sure?',
                  body: 'Update conversation mapping!',
                });
              }}
              onPageSizeChange={(page, limit) => {
                dataConversationStore.fetchDataConversation(page, limit);
              }}
              onFilter={(type, filter, page, limit) => {
                dataConversationStore.dataConversationService.filter({
                  input: {type, filter, page, limit},
                });
              }}
            />
          </div>
          <ModalConfirm
            {...modalConfirm}
            click={(type?: string) => {
              if (type === 'Delete') {
                dataConversationStore.dataConversationService
                  .deleteDataConversation({input: {id: modalConfirm.id}})
                  .then(res => {
                    setModalConfirm({show: false});
                    if (res.removeDataConversation.success) {
                      dataConversationStore.fetchDataConversation();
                      Toast.success({
                        message: `😊 ${res.removeDataConversation.message}`,
                      });
                    }
                  });
              } else if (type == 'Update') {
                dataConversationStore.dataConversationService
                  .updateDataConversationUpdateSingleFiled({
                    input: {
                      _id: modalConfirm.data.id,
                      [modalConfirm.data.dataField]: modalConfirm.data.value,
                    },
                  })
                  .then(res => {
                    setModalConfirm({show: false});
                    if (res.updateDataConversation.success) {
                      dataConversationStore.fetchDataConversation();
                      Toast.success({
                        message: `😊 ${res.updateDataConversation.message}`,
                      });
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

export default DataConversation;
