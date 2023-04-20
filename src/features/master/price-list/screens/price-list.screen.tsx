import React, {useState, useMemo, useEffect} from 'react';
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
import {resetPriceList} from '../startup';

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
      clearErrors,
      reset,
    } = useForm();

    const [modalConfirm, setModalConfirm] = useState<any>();
    const [hideAddLab, setHideAddLab] = useState<boolean>(true);

    useEffect(() => {
      // Default value initialization
      setValue('priceGroup', priceListStore.priceList?.priceGroup);
      setValue('priceList', priceListStore.priceList?.priceList);
      setValue('status', priceListStore.priceList?.status);
      setValue('environment', priceListStore.priceList?.environment);
      setValue('description', priceListStore.priceList?.description);
      setValue('dateExpire', priceListStore.priceList?.dateExpire);
      setValue('version', priceListStore.priceList?.version);
      setValue('dateCreation', priceListStore.priceList?.dateCreation);
      setValue('dateActive', priceListStore.priceList?.dateActive);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [priceListStore.priceList]);

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
        setHideAddLab(true);
        reset();
        resetPriceList();
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
              type: 'updateFields',
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
            global.filter = {mode: 'pagination', page, limit};
          }}
          onFilter={(type, filter, page, limit) => {
            priceListStore.priceListService.filter({
              input: {type, filter, page, limit},
            });
            global.filter = {mode: 'filter', type, page, limit, filter};
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
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper
                      label='Price Group'
                      hasError={!!errors.priceGroup}
                    >
                      <select
                        value={value}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.priceGroup ? 'border-red  ' : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const priceGroup = e.target.value as string;
                          onChange(priceGroup);
                          priceListStore.updatePriceList({
                            ...priceListStore.priceList,
                            priceGroup,
                            priceList: '',
                            description: '',
                          });
                          if (!priceListStore.priceList?.existsVersionId) {
                            priceListStore.priceListService
                              .checkExitsRecords({
                                input: {
                                  priceGroup,
                                  priceList:
                                    priceListStore.priceList?.priceList || '',
                                  panelCode:
                                    priceListStore.priceList.panelCode || '',
                                  version:
                                    priceListStore.priceList?.version || 0,
                                  env:
                                    priceListStore.priceList.environment || '',
                                },
                              })
                              .then(res => {
                                if (res.checkPriceListExistsRecord.success) {
                                  setError('priceGroup', {type: 'onBlur'});
                                  setError('panelCode', {type: 'onBlur'});
                                  setError('version', {type: 'onBlur'});
                                  setError('environment', {type: 'onBlur'});
                                  priceListStore.updateExitsPriceGEnvLabCode(
                                    true,
                                  );
                                  Toast.error({
                                    message: `😔 ${res.checkPriceListExistsRecord.message}`,
                                  });
                                } else {
                                  clearErrors('priceGroup');
                                  clearErrors('panelCode');
                                  clearErrors('version');
                                  clearErrors('environment');
                                  priceListStore.updateExitsPriceGEnvLabCode(
                                    false,
                                  );
                                }
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
                  render={({field: {onChange, value}}) => (
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
                          // displayValue={value}
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

                            if (!priceListStore.priceList?.existsVersionId) {
                              priceListStore.priceListService
                                .checkExitsRecords({
                                  input: {
                                    priceGroup:
                                      priceListStore.priceList?.priceGroup ||
                                      '',
                                    priceList: item.invoiceAc?.toString(),
                                    panelCode:
                                      priceListStore.priceList.panelCode || '',
                                    version:
                                      priceListStore.priceList?.version || 0,
                                    env:
                                      priceListStore.priceList.environment ||
                                      '',
                                  },
                                })
                                .then(res => {
                                  if (res.checkPriceListExistsRecord.success) {
                                    setError('priceGroup', {type: 'onBlur'});
                                    setError('priceList', {type: 'onBlur'});
                                    setError('panelCode', {type: 'onBlur'});
                                    setError('version', {type: 'onBlur'});
                                    setError('environment', {type: 'onBlur'});
                                    priceListStore.updateExitsPriceGEnvLabCode(
                                      true,
                                    );
                                    Toast.error({
                                      message: `😔 ${res.checkPriceListExistsRecord.message}`,
                                    });
                                  } else {
                                    clearErrors('priceGroup');
                                    clearErrors('priceList');
                                    clearErrors('panelCode');
                                    clearErrors('version');
                                    clearErrors('environment');
                                    priceListStore.updateExitsPriceGEnvLabCode(
                                      false,
                                    );
                                  }
                                });
                            }
                          }}
                        />
                      ) : (
                        <select
                          value={value}
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.priceList
                              ? 'border-red  '
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
                  render={({field: {onChange, value}}) => (
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
                      value={value}
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
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper
                      label='Panel Code'
                      hasError={!!errors.panelCode}
                    >
                      <AutoCompleteFilterSingleSelectPanelCode
                        hasError={!!errors.panelCode}
                        displayValue={value}
                        onSelect={item => {
                          onChange(item.panelCode);
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
                                    priceListStore.priceList?.priceGroup || '',
                                  priceList:
                                    priceListStore.priceList?.priceList || '',
                                  panelCode: item?.panelCode,
                                  version:
                                    priceListStore.priceList?.version || 0,
                                  env:
                                    priceListStore.priceList.environment || '',
                                },
                              })
                              .then(res => {
                                if (res.checkPriceListExistsRecord.success) {
                                  setError('priceGroup', {type: 'onBlur'});
                                  setError('priceList', {type: 'onBlur'});
                                  setError('panelCode', {type: 'onBlur'});
                                  setError('version', {type: 'onBlur'});
                                  setError('environment', {type: 'onBlur'});
                                  priceListStore.updateExitsPriceGEnvLabCode(
                                    true,
                                  );
                                  Toast.error({
                                    message: `😔 ${res.checkPriceListExistsRecord.message}`,
                                  });
                                } else {
                                  clearErrors('priceGroup');
                                  clearErrors('priceList');
                                  clearErrors('panelCode');
                                  clearErrors('version');
                                  clearErrors('environment');
                                  priceListStore.updateExitsPriceGEnvLabCode(
                                    false,
                                  );
                                }
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
                  render={({field: {onChange, value}}) => (
                    <Form.Input
                      label='Panel Name'
                      name='txtPanelName'
                      disabled={true}
                      value={value}
                      placeholder={
                        errors.panelName
                          ? 'Please Enter Panel Name'
                          : 'Panel Name'
                      }
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.panelName ? 'border-red' : 'border-gray-300'
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
                  render={({field: {onChange, value}}) => (
                    <Form.Input
                      label='Price'
                      name='txtPrice'
                      placeholder={
                        errors.price ? 'Please Enter Price' : 'Price'
                      }
                      type='number'
                      hasError={!!errors.price}
                      value={value}
                      onChange={price => {
                        onChange(price);
                        priceListStore.updatePriceList({
                          ...priceListStore.priceList,
                          price: Number.parseFloat(price),
                          maxSp: Number.parseFloat(price),
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
                  render={({field: {onChange, value}}) => (
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
                      value={value}
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
                  render={({field: {onChange, value}}) => (
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
                      value={value}
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
                  render={({field: {onChange, value}}) => (
                    <Form.Input
                      label='Max Dis%'
                      name='txtMaxDis'
                      type='number'
                      placeholder='Max Dis%'
                      hasError={!!errors.maxDis}
                      value={value}
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
                  render={({field: {onChange, value}}) => (
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
                  render={({field: {onChange, value}}) => (
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
                    render={({field: {onChange, value}}) => (
                      <Form.Toggle
                        label='Fixed Price'
                        hasError={!!errors.fixedPrice}
                        value={value}
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
                  render={({field: {onChange, value}}) => (
                    <Form.InputDateTime
                      label='Date Creation'
                      placeholder={
                        errors.dateCreation
                          ? 'Please Enter Date Creation'
                          : 'Date Creation'
                      }
                      hasError={!!errors.dateCreation}
                      value={value}
                      disabled={true}
                    />
                  )}
                  name='dateCreation'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputDateTime
                      label='Date Active'
                      placeholder={
                        errors.dateActive
                          ? 'Please Enter Date Active'
                          : 'Date Active'
                      }
                      hasError={!!errors.dateActive}
                      value={value}
                      disabled={true}
                    />
                  )}
                  name='dateActive'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputDateTime
                      label='Date Expire'
                      placeholder={
                        errors.dateExpire
                          ? 'Please Enter schedule'
                          : 'Date Expire'
                      }
                      hasError={!!errors.dateExpire}
                      value={value}
                      onChange={dateExpire => {
                        onChange(dateExpire);
                        priceListStore.updatePriceList({
                          ...priceListStore.priceList,
                          dateExpire,
                        });
                      }}
                    />
                  )}
                  name='dateExpire'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Input
                      label='Version'
                      placeholder={
                        errors.version ? 'Please Enter Version' : 'Version'
                      }
                      hasError={!!errors.version}
                      value={value}
                      disabled={true}
                    />
                  )}
                  name='version'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper
                      label='Environment'
                      hasError={!!errors.environment}
                    >
                      <select
                        value={value}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.environment
                            ? 'border-red  '
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
                                    priceListStore.priceList?.priceGroup || '',
                                  priceList:
                                    priceListStore.priceList?.priceList,
                                  panelCode:
                                    priceListStore.priceList.panelCode || '',
                                  version:
                                    priceListStore.priceList?.version || 0,
                                  env: environment || '',
                                },
                              })
                              .then(res => {
                                if (res.checkPriceListExistsRecord.success) {
                                  setError('priceGroup', {type: 'onBlur'});
                                  setError('priceList', {type: 'onBlur'});
                                  setError('panelCode', {type: 'onBlur'});
                                  setError('version', {type: 'onBlur'});
                                  setError('environment', {type: 'onBlur'});
                                  priceListStore.updateExitsPriceGEnvLabCode(
                                    true,
                                  );
                                  Toast.error({
                                    message: `😔 ${res.checkPriceListExistsRecord.message}`,
                                  });
                                } else {
                                  clearErrors('priceGroup');
                                  clearErrors('priceList');
                                  clearErrors('panelCode');
                                  clearErrors('version');
                                  clearErrors('environment');
                                  priceListStore.updateExitsPriceGEnvLabCode(
                                    false,
                                  );
                                }
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
            click={(action?: string) => {
              switch (action) {
                case 'delete': {
                  priceListStore.priceListService
                    .deletePriceList({input: {id: modalConfirm.id}})
                    .then((res: any) => {
                      if (res.removePriceList.success) {
                        setModalConfirm({show: false});
                        Toast.success({
                          message: `😊 ${res.removePriceList.message}`,
                        });
                        if (global?.filter?.mode == 'pagination')
                          priceListStore.fetchListPriceList(
                            global?.filter?.page,
                            global?.filter?.limit,
                          );
                        else if (global?.filter?.mode == 'filter')
                          priceListStore.priceListService.filter({
                            input: {
                              type: global?.filter?.type,
                              filter: global?.filter?.filter,
                              page: global?.filter?.page,
                              limit: global?.filter?.limit,
                            },
                          });
                        else priceListStore.fetchListPriceList();
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
                        setModalConfirm({show: false});
                        Toast.success({
                          message: `😊 ${res.updatePriceList.message}`,
                        });
                        if (global?.filter?.mode == 'pagination')
                          priceListStore.fetchListPriceList(
                            global?.filter?.page,
                            global?.filter?.limit,
                          );
                        else if (global?.filter?.mode == 'filter')
                          priceListStore.priceListService.filter({
                            input: {
                              type: global?.filter?.type,
                              filter: global?.filter?.filter,
                              page: global?.filter?.page,
                              limit: global?.filter?.limit,
                            },
                          });
                        else priceListStore.fetchListPriceList();
                      }
                    });

                  break;
                }
                case 'updateFields': {
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
