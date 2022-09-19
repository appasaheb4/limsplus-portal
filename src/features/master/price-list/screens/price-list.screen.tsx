import React, {useState, useMemo} from 'react';
import {observer} from 'mobx-react';
import _ from 'lodash';
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
  AutoCompleteFilterSingleSelectMultiFieldsDisplay,
} from '@/library/components';

import {lookupItems, lookupValue} from '@/library/utils';
import {PriceListList} from '../components';
import {useForm, Controller} from 'react-hook-form';
import {AutoCompleteFilterSingleSelectPanelCode} from '../components';
import {PriceListHoc} from '../hoc';
import {useStores} from '@/stores';

import {RouterFlow} from '@/flows';
import {toJS} from 'mobx';

export const PriceList = PriceListHoc(
  observer(() => {
    const {
      loginStore,
      labStore,
      corporateClientsStore,
      masterPanelStore,
      priceListStore,
      routerStore,
      loading,
    } = useStores();

    const {
      control,
      handleSubmit,
      formState: {errors},
      setValue,
      setError,
    } = useForm();

    setValue('priceGroup', priceListStore.priceList?.priceGroup);
    setValue('priceList', priceListStore.priceList?.priceList);
    setValue('status', priceListStore.priceList?.status);
    setValue('environment', priceListStore.priceList?.environment);

    const [modalConfirm, setModalConfirm] = useState<any>();
    const [hideAddLab, setHideAddLab] = useState<boolean>(true);

    const onSubmitPriceList = async () => {
      if (!priceListStore.checkExitsPriceGEnvLabCode) {
        if (
          !priceListStore.priceList?.existsVersionId &&
          !priceListStore.priceList?.existsRecordId
        ) {
          priceListStore.priceListService
            .addPriceList({
              input: {
                ...priceListStore.priceList,
                enteredBy: loginStore.login.userId,
              },
            })
            .then(res => {
              if (res.createPriceList.success) {
                Toast.success({
                  message: `😊 ${res.createPriceList.message}`,
                });
              }
            });
        } else if (
          priceListStore.priceList?.existsVersionId &&
          !priceListStore.priceList?.existsRecordId
        ) {
          priceListStore.priceListService
            .versionUpgradePriceList({
              input: {
                ...priceListStore.priceList,
                enteredBy: loginStore.login.userId,
                __typename: undefined,
              },
            })
            .then(res => {
              console.log({res});
              if (res.versionUpgradePriceList.success) {
                Toast.success({
                  message: `😊 ${res.versionUpgradePriceList.message}`,
                });
              }
            });
        } else if (
          !priceListStore.priceList?.existsVersionId &&
          priceListStore.priceList?.existsRecordId
        ) {
          priceListStore.priceListService
            .duplicatePriceList({
              input: {
                ...priceListStore.priceList,
                enteredBy: loginStore.login.userId,
                __typename: undefined,
              },
            })
            .then(res => {
              if (res.duplicatePriceList.success) {
                Toast.success({
                  message: `😊 ${res.duplicatePriceList.message}`,
                });
              }
            });
        }
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        Toast.warning({
          message: '😔 Please enter diff code',
        });
      }
    };

    const getPriceList = priceList => {
      const list = priceList.filter(item => {
        if (item.code.slice(0, 3) === priceListStore.priceList?.priceGroup) {
          return item;
        }
      });
      return list || [];
    };

    const tableView = useMemo(
      () => (
        <PriceListList
          data={priceListStore.listPriceList || []}
          totalSize={priceListStore.listPriceListCount}
          extraData={{
            lookupItems: routerStore.lookupItems,
            listCorporateClients: corporateClientsStore.listCorporateClients,
            listMasterPanel: masterPanelStore.listMasterPanel,
            listLabs: labStore.listLabs,
          }}
          isDelete={RouterFlow.checkPermission(
            toJS(routerStore.userPermission),
            'Delete',
          )}
          isEditModify={RouterFlow.checkPermission(
            toJS(routerStore.userPermission),
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
              body: 'Update item!',
            });
          }}
          onUpdateFileds={(fileds: any, id: string) => {
            setModalConfirm({
              show: true,
              type: 'UpdateFileds',
              data: {fileds, id},
              title: 'Are you sure?',
              body: 'Update records!',
            });
          }}
          onVersionUpgrade={item => {
            setModalConfirm({
              show: true,
              type: 'versionUpgrade',
              data: item,
              title: 'Are you version upgrade?',
              body: 'Version upgrade this record',
            });
          }}
          onDuplicate={item => {
            setModalConfirm({
              show: true,
              type: 'duplicate',
              data: item,
              title: 'Are you duplicate?',
              body: 'Duplicate this record',
            });
          }}
          onPageSizeChange={(page, limit) => {
            priceListStore.fetchListPriceList(page, limit);
          }}
          onFilter={(type, filter, page, limit) => {
            priceListStore.priceListService.filter({
              input: {type, filter, page, limit},
            });
          }}
        />
      ),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [priceListStore.listPriceList],
    );

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
            show={hideAddLab}
            onClick={() => setHideAddLab(!hideAddLab)}
          />
        )}
        <div className='mx-auto flex-wrap'>
          <div
            className={
              'p-2 rounded-lg shadow-xl ' + (hideAddLab ? 'hidden' : 'shown')
            }
          >
            <Grid cols={3}>
              <List direction='col' space={4} justify='stretch' fill>
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label='Price Group'
                      hasError={!!errors.priceGroup}
                    >
                      <select
                        value={priceListStore.priceList?.priceGroup}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.priceGroup
                            ? 'border-red-500  '
                            : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const priceGroup = e.target.value as string;
                          onChange(priceGroup);
                          priceListStore.updatePriceList({
                            ...priceListStore.priceList,
                            priceGroup,
                            priceList: '',
                          });
                          if (!priceListStore.priceList?.existsVersionId) {
                            priceListStore.priceListService
                              .checkExitsRecords({
                                input: {
                                  priceGroup,
                                  panelCode: priceListStore.priceList.panelCode,
                                  env: priceListStore.priceList.environment,
                                },
                              })
                              .then(res => {
                                if (res.checkPriceListExistsRecord.success) {
                                  priceListStore.updateExitsPriceGEnvLabCode(
                                    true,
                                  );
                                  Toast.error({
                                    message: `😔 ${res.checkPriceListExistsRecord.message}`,
                                  });
                                } else
                                  priceListStore.updateExitsPriceGEnvLabCode(
                                    false,
                                  );
                              });
                          }
                          setError('priceList', {type: 'onBlur'});
                        }}
                      >
                        <option selected>Select</option>
                        {lookupItems(
                          routerStore.lookupItems,
                          'PRICE_GROUP',
                        ).map((item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {lookupValue(item)}
                          </option>
                        ))}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='priceGroup'
                  rules={{required: true}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label='Price List'
                      hasError={!!errors.priceList}
                    >
                      {priceListStore.priceList?.priceGroup === 'CSP' ? (
                        <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                          loader={loading}
                          placeholder='Search by code or name'
                          data={{
                            list: corporateClientsStore?.listCorporateClients,
                            displayKey: ['invoiceAc', 'corporateName'],
                          }}
                          displayValue={priceListStore.priceList?.priceList}
                          hasError={!!errors.priceList}
                          onFilter={(value: string) => {
                            corporateClientsStore.corporateClientsService.filterByFields(
                              {
                                input: {
                                  filter: {
                                    fields: ['invoiceAc', 'corporateName'],
                                    srText: value,
                                  },
                                  page: 0,
                                  limit: 10,
                                },
                              },
                            );
                          }}
                          onSelect={item => {
                            onChange(item.invoiceAc?.toString());
                            priceListStore.updatePriceList({
                              ...priceListStore.priceList,
                              priceList: item.invoiceAc?.toString(),
                              description: item.corporateName,
                            });
                            corporateClientsStore.updateCorporateClientsList(
                              corporateClientsStore.listCorporateClientsCopy,
                            );
                          }}
                        />
                      ) : (
                        <select
                          value={priceListStore.priceList?.priceList}
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.priceList
                              ? 'border-red-500  '
                              : 'border-gray-300'
                          } rounded-md`}
                          onChange={e => {
                            const priceList = JSON.parse(e.target.value);
                            onChange(priceList);
                            priceListStore.updatePriceList({
                              ...priceListStore.priceList,
                              priceList: priceList?.code,
                              description: priceList?.value,
                            });
                          }}
                        >
                          <option selected>Select</option>
                          {getPriceList(
                            lookupItems(routerStore.lookupItems, 'PRICE_LIST'),
                          )?.map((item: any, index: number) => (
                            <option key={index} value={JSON.stringify(item)}>
                              {lookupValue(item)}
                            </option>
                          ))}
                        </select>
                      )}
                    </Form.InputWrapper>
                  )}
                  name='priceList'
                  rules={{required: true}}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.MultilineInput
                      rows={3}
                      label='Description'
                      disabled={true}
                      placeholder={
                        errors.description
                          ? 'Please Enter description'
                          : 'Description'
                      }
                      hasError={!!errors.description}
                      value={priceListStore.priceList?.description}
                      onChange={description => {
                        onChange(description);
                        priceListStore.updatePriceList({
                          ...priceListStore.priceList,
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
                    <Form.InputWrapper
                      label='Panel Code'
                      hasError={!!errors.panelCode}
                    >
                      <AutoCompleteFilterSingleSelectPanelCode
                        hasError={!!errors.panelCode}
                        onSelect={item => {
                          onChange(item.panelName);
                          setValue('panelName', item.panelName);
                          priceListStore.updatePriceList({
                            ...priceListStore.priceList,
                            panelCode: item.panelCode,
                            panelName: item.panelName,
                          });
                          masterPanelStore.updatePanelMasterList(
                            masterPanelStore.listMasterPanelCopy,
                          );
                          if (!priceListStore.priceList?.existsVersionId) {
                            priceListStore.priceListService
                              .checkExitsRecords({
                                input: {
                                  priceGroup:
                                    priceListStore.priceList.priceGroup,
                                  panelCode: item.panelCode,
                                  env: priceListStore.priceList.environment,
                                },
                              })
                              .then(res => {
                                if (res.checkPriceListExistsRecord.success) {
                                  priceListStore.updateExitsPriceGEnvLabCode(
                                    true,
                                  );
                                  Toast.error({
                                    message: `😔 ${res.checkPriceListExistsRecord.message}`,
                                  });
                                } else
                                  priceListStore.updateExitsPriceGEnvLabCode(
                                    false,
                                  );
                              });
                          }
                        }}
                      />
                    </Form.InputWrapper>
                  )}
                  name='panelCode'
                  rules={{required: true}}
                  defaultValue=''
                />
                {priceListStore.checkExitsPriceGEnvLabCode && (
                  <span className='text-red-600 font-medium relative'>
                    Code already exits. Please use other code.
                  </span>
                )}
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Panel Name'
                      name='txtPanelName'
                      disabled={true}
                      value={priceListStore.priceList?.panelName}
                      placeholder={
                        errors.panelName
                          ? 'Please Enter Panel Name'
                          : 'Panel Name'
                      }
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.panelName ? 'border-red-500' : 'border-gray-300'
                      } rounded-md`}
                      hasError={!!errors.panelName}
                    />
                  )}
                  name='panelName'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Price'
                      name='txtPrice'
                      placeholder={
                        errors.price ? 'Please Enter Price' : 'Price'
                      }
                      type='number'
                      hasError={!!errors.price}
                      value={priceListStore.priceList?.price}
                      onChange={price => {
                        onChange(price);
                        priceListStore.updatePriceList({
                          ...priceListStore.priceList,
                          price: Number.parseFloat(price),
                        });
                      }}
                    />
                  )}
                  name='price'
                  rules={{required: true}}
                  defaultValue=''
                />
              </List>
              <List direction='col' space={4} justify='stretch' fill>
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Min Sales Price'
                      name='txtMinSp'
                      type='number'
                      placeholder={
                        errors.minSp
                          ? 'Please Enter Min Sales Price'
                          : 'Min Sales Price'
                      }
                      hasError={!!errors.minSp}
                      value={priceListStore.priceList?.minSp}
                      onChange={minSp => {
                        onChange(minSp);
                        priceListStore.updatePriceList({
                          ...priceListStore.priceList,
                          minSp: Number.parseInt(minSp),
                        });
                      }}
                    />
                  )}
                  name='minSp'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Max Sales Price'
                      name='txtMaxSp'
                      type='number'
                      placeholder={
                        errors.maxSp
                          ? 'Please Enter Max Sales Price'
                          : ' Max Sales Price'
                      }
                      hasError={!!errors.minSp}
                      value={priceListStore.priceList?.maxSp}
                      onChange={maxSp => {
                        onChange(maxSp);
                        priceListStore.updatePriceList({
                          ...priceListStore.priceList,
                          maxSp: Number.parseInt(maxSp),
                        });
                      }}
                    />
                  )}
                  name='maxSp'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Max Dis%'
                      name='txtMaxDis'
                      type='number'
                      placeholder='Max Dis%'
                      hasError={!!errors.maxDis}
                      value={priceListStore.priceList?.maxDis}
                      onChange={maxDis => {
                        onChange(maxDis);
                        priceListStore.updatePriceList({
                          ...priceListStore.priceList,
                          maxDis: Number.parseFloat(maxDis),
                        });
                      }}
                    />
                  )}
                  name='maxDis'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label='Status'
                      hasError={!!errors.status}
                    >
                      <select
                        value={priceListStore.priceList?.status}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.status ? 'border-red-500  ' : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const status = e.target.value;
                          onChange(status);
                          priceListStore.updatePriceList({
                            ...priceListStore.priceList,
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
                  rules={{required: true}}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Entered By'
                      placeholder={
                        errors.userId ? 'Please Enter Entered By' : 'Entered By'
                      }
                      hasError={!!errors.userId}
                      value={loginStore.login?.userId}
                      disabled={true}
                    />
                  )}
                  name='userId'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Grid cols={5}>
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.Toggle
                        label='Fixed Price'
                        hasError={!!errors.fixedPrice}
                        value={priceListStore.priceList?.fixedPrice}
                        onChange={fixedPrice => {
                          onChange(fixedPrice);
                          priceListStore.updatePriceList({
                            ...priceListStore.priceList,
                            fixedPrice,
                          });
                        }}
                      />
                    )}
                    name='fixedPrice'
                    rules={{required: false}}
                    defaultValue=''
                  />
                </Grid>
              </List>
              <List direction='col' space={4} justify='stretch' fill>
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputDateTime
                      label='Date Creation'
                      placeholder={
                        errors.dateCreation
                          ? 'Please Enter Date Creation'
                          : 'Date Creation'
                      }
                      hasError={!!errors.dateCreation}
                      value={priceListStore.priceList?.dateCreation}
                      disabled={true}
                    />
                  )}
                  name='dateCreation'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputDateTime
                      label='Date Active'
                      placeholder={
                        errors.dateActive
                          ? 'Please Enter Date Active'
                          : 'Date Active'
                      }
                      hasError={!!errors.dateActive}
                      value={priceListStore.priceList?.dateActive}
                      disabled={true}
                    />
                  )}
                  name='dateActive'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputDateTime
                      label='Date Expire'
                      placeholder={
                        errors.dateExpiry
                          ? 'Please Enter schedule'
                          : 'Date Expire'
                      }
                      hasError={!!errors.dateExpiry}
                      value={priceListStore.priceList?.dateExpire}
                      onChange={dateExpire => {
                        onChange(dateExpire);
                        priceListStore.updatePriceList({
                          ...priceListStore.priceList,
                          dateExpire,
                        });
                      }}
                    />
                  )}
                  name='dateExpiry'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Version'
                      placeholder={
                        errors.version ? 'Please Enter Version' : 'Version'
                      }
                      hasError={!!errors.version}
                      value={priceListStore.priceList?.version}
                      disabled={true}
                    />
                  )}
                  name='version'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label='Environment'
                      hasError={!!errors.environment}
                    >
                      <select
                        value={
                          priceListStore &&
                          priceListStore.priceList?.environment
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
                          priceListStore.updatePriceList({
                            ...priceListStore.priceList,
                            environment,
                          });
                          if (!priceListStore.priceList?.existsVersionId) {
                            priceListStore.priceListService
                              .checkExitsRecords({
                                input: {
                                  priceGroup:
                                    priceListStore.priceList.priceGroup,
                                  panelCode: priceListStore.priceList.panelCode,
                                  env: environment,
                                },
                              })
                              .then(res => {
                                if (res.checkPriceListExistsRecord.success) {
                                  priceListStore.updateExitsPriceGEnvLabCode(
                                    true,
                                  );
                                  Toast.error({
                                    message: `😔 ${res.checkPriceListExistsRecord.message}`,
                                  });
                                } else
                                  priceListStore.updateExitsPriceGEnvLabCode(
                                    false,
                                  );
                              });
                          }
                        }}
                      >
                        <option selected>
                          {loginStore.login &&
                          loginStore.login.role !== 'SYSADMIN'
                            ? 'Select'
                            : priceListStore.priceList?.environment || 'Select'}
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
                onClick={handleSubmit(onSubmitPriceList)}
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
            {tableView}
          </div>
          <ModalConfirm
            {...modalConfirm}
            click={(type?: string) => {
              switch (type) {
                case 'delete': {
                  priceListStore.priceListService
                    .deletePriceList({input: {id: modalConfirm.id}})
                    .then((res: any) => {
                      if (res.removePriceList.success) {
                        Toast.success({
                          message: `😊 ${res.removePriceList.message}`,
                        });
                        setModalConfirm({show: false});
                        priceListStore.fetchListPriceList();
                      }
                    });

                  break;
                }
                case 'update': {
                  priceListStore.priceListService
                    .updateSingleFiled({
                      input: {
                        _id: modalConfirm.data.id,
                        [modalConfirm.data.dataField]: modalConfirm.data.value,
                      },
                    })
                    .then((res: any) => {
                      if (res.updatePriceList.success) {
                        Toast.success({
                          message: `😊 ${res.updatePriceList.message}`,
                        });
                        setModalConfirm({show: false});
                        priceListStore.fetchListPriceList();
                      }
                    });

                  break;
                }
                case 'UpdateFileds': {
                  priceListStore.priceListService
                    .updateSingleFiled({
                      input: {
                        ...modalConfirm.data.fileds,
                        _id: modalConfirm.data.id,
                      },
                    })
                    .then((res: any) => {
                      if (res.updatePriceList.success) {
                        Toast.success({
                          message: `😊 ${res.updatePriceList.message}`,
                        });
                        setModalConfirm({show: false});
                        priceListStore.fetchListPriceList();
                      }
                    });

                  break;
                }
                case 'versionUpgrade': {
                  priceListStore.updatePriceList({
                    ...modalConfirm.data,
                    _id: undefined,
                    __typename: undefined,
                    existsVersionId: modalConfirm.data._id,
                    existsRecordId: undefined,
                    version: Number.parseInt(modalConfirm.data.version + 1),
                    dateCreation: new Date(),
                  });
                  setHideAddLab(!hideAddLab);
                  setModalConfirm({show: false});
                  setValue('panelCode', modalConfirm.data.panelCode);
                  setValue('panelName', modalConfirm.data.panelName);
                  setValue('billTo', modalConfirm.data.billTo);
                  setValue('lab', modalConfirm.data.lab);
                  setValue('priceGroup', modalConfirm.data.priceGroup);
                  setValue('price', modalConfirm.data.price);
                  setValue('status', modalConfirm.data.status);
                  setValue('environment', modalConfirm.data.environment);

                  break;
                }
                case 'duplicate': {
                  priceListStore.updatePriceList({
                    ...modalConfirm.data,
                    _id: undefined,
                    __typename: undefined,
                    existsVersionId: undefined,
                    existsRecordId: modalConfirm.data._id,
                    version: Number.parseInt(modalConfirm.data.version + 1),
                    dateCreation: new Date(),
                  });
                  setHideAddLab(!hideAddLab);
                  setModalConfirm({show: false});
                  setValue('panelCode', modalConfirm.data.panelCode);
                  setValue('panelName', modalConfirm.data.panelName);
                  setValue('billTo', modalConfirm.data.billTo);
                  setValue('lab', modalConfirm.data.lab);
                  setValue('priceGroup', modalConfirm.data.priceGroup);
                  setValue('price', modalConfirm.data.price);
                  setValue('status', modalConfirm.data.status);
                  setValue('environment', modalConfirm.data.environment);

                  break;
                }
                // No default
              }
            }}
            onClose={() => {
              setModalConfirm({show: false});
            }}
          />
        </div>
      </>
    );
  }),
);
export default PriceList;
