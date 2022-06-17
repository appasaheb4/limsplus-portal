import React, {useState, useMemo} from 'react';
import {observer} from 'mobx-react';
import {Table} from 'reactstrap';
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
  AutoCompleteFilterSingleSelect,
  AutoCompleteFilterMutiSelectMultiFieldsDisplay,
} from '@/library/components';
import _ from 'lodash';
import {lookupItems, lookupValue} from '@/library/utils';
import {PackageMasterList} from '../components';
import {IconContext} from 'react-icons';
import {
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
} from 'react-icons/bs';

import dayjs from 'dayjs';
import {useForm, Controller} from 'react-hook-form';
import {MasterPackageHOC} from '../hoc';
import {useStores} from '@/stores';

import {RouterFlow} from '@/flows';
import {toJS} from 'mobx';

const grid = 8;
const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'none',
  display: 'flex',
  //flexWrap:'none',
  padding: grid,
  overflow: 'auto',
});

const MasterPackage = MasterPackageHOC(
  observer(() => {
    const {
      loginStore,
      masterPackageStore,
      labStore,
      masterPanelStore,
      routerStore,
      loading,
    } = useStores();
    const {
      control,
      handleSubmit,
      formState: {errors},
      setValue,
    } = useForm();

    setValue('lab', loginStore.login.lab);
    setValue('status', masterPackageStore.masterPackage?.status);
    setValue('environment', masterPackageStore.masterPackage?.environment);

    const [modalConfirm, setModalConfirm] = useState<any>();
    const [hideAddLab, setHideAddLab] = useState<boolean>(true);
    const [txtDisable, setTxtDisable] = useState(true);

    const getServiceTypes = (fileds: any) => {
      if (fileds) {
        const finalArray = fileds.arrValue.filter(fileds => {
          if (fileds.code === 'K' || fileds.code === 'M') return fileds;
        });
        return finalArray;
      }
      return [];
    };
    const onSubmitMasterPackage = () => {
      if (!masterPackageStore.checkExitsLabEnvCode) {
        if (
          !masterPackageStore.masterPackage?.existsVersionId &&
          !masterPackageStore.masterPackage?.existsRecordId
        ) {
          masterPackageStore.masterPackageService
            .addPackageMaster({
              input: {
                ...masterPackageStore.masterPackage,
                enteredBy: loginStore.login.userId,
              },
            })
            .then(res => {
              if (res.createPackageMaster.success) {
                Toast.success({
                  message: `😊 ${res.createPackageMaster.message}`,
                });
              }
            });
        } else if (
          masterPackageStore.masterPackage?.existsVersionId &&
          !masterPackageStore.masterPackage?.existsRecordId
        ) {
          masterPackageStore.masterPackageService
            .versionUpgradePackageMaster({
              input: {
                ...masterPackageStore.masterPackage,
                enteredBy: loginStore.login.userId,
                __typename: undefined,
              },
            })
            .then(res => {
              if (res.versionUpgradePackageMaster.success) {
                Toast.success({
                  message: `😊 ${res.versionUpgradePackageMaster.message}`,
                });
              }
            });
        } else if (
          !masterPackageStore.masterPackage?.existsVersionId &&
          masterPackageStore.masterPackage?.existsRecordId
        ) {
          masterPackageStore.masterPackageService
            .duplicatePackageMaster({
              input: {
                ...masterPackageStore.masterPackage,
                enteredBy: loginStore.login.userId,
                __typename: undefined,
              },
            })
            .then(res => {
              if (res.duplicatePackageMaster.success) {
                Toast.success({
                  message: `😊 ${res.duplicatePackageMaster.message}`,
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

    const tableView = useMemo(
      () => (
        <PackageMasterList
          data={masterPackageStore.listMasterPackage || []}
          totalSize={masterPackageStore.listMasterPackageCount}
          extraData={{
            lookupItems: routerStore.lookupItems,
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
          // isEditModify={false}
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
              body: 'Update items!',
            });
          }}
          onUpdateFileds={(fileds: any, id: string) => {
            setModalConfirm({
              show: true,
              type: 'updateFileds',
              data: {fileds, id},
              title: 'Are you sure?',
              body: 'Update records',
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
          onUpdateOrderSeq={orderSeq => {
            masterPackageStore.masterPackageService
              .updateOrderSeq({input: {filter: {orderSeq}}})
              .then(res => {
                Toast.success({
                  message: `😊 ${res.updateRepOPackageMaster.message}`,
                });
                masterPackageStore.fetchPackageMaster();
              });
          }}
          onPageSizeChange={(page, limit) => {
            masterPackageStore.fetchPackageMaster(page, limit);
          }}
          onFilter={(type, filter, page, limit) => {
            masterPackageStore.masterPackageService.filter({
              input: {type, filter, page, limit},
            });
          }}
        />
      ),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [masterPackageStore.listMasterPackage],
    );

    const handleOnDragEndResultOrder = (result: any) => {
      const items = Array.from(masterPackageStore.masterPackage?.reportOrder);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      masterPackageStore.updateMasterPackage({
        ...masterPackageStore.masterPackage,
        reportOrder: items,
      });
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
            <Grid cols={2}>
              <List direction='col' space={4} justify='stretch' fill>
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper label='Lab' hasError={errors.lab}>
                      <AutoCompleteFilterSingleSelect
                        placeholder='Search by name'
                        loader={loading}
                        disable={
                          loginStore.login &&
                          loginStore.login.role !== 'SYSADMIN'
                            ? true
                            : false
                        }
                        data={{
                          list: labStore.listLabs,
                          displayKey: 'name',
                          findKey: 'name',
                        }}
                        displayValue={masterPackageStore.masterPackage?.lab}
                        hasError={errors.lab}
                        onFilter={(value: string) => {
                          labStore.LabService.filter({
                            input: {
                              type: 'filter',
                              filter: {
                                name: value,
                              },
                              page: 0,
                              limit: 10,
                            },
                          });
                        }}
                        onSelect={item => {
                          onChange(item.name);
                          masterPackageStore.updateMasterPackage({
                            ...masterPackageStore.masterPackage,
                            lab: item.code,
                          });
                          labStore.updateLabList(labStore.listLabsCopy);
                          if (
                            !masterPackageStore.masterPackage?.existsVersionId
                          ) {
                            masterPackageStore.masterPackageService
                              .checkExistsRecords({
                                input: {
                                  lab: item.code,
                                  packageCode:
                                    masterPackageStore.masterPackage
                                      ?.packageCode,
                                  panelCode:
                                    masterPackageStore.masterPackage?.panelCode,
                                  env: masterPackageStore.masterPackage
                                    ?.environment,
                                },
                              })
                              .then(res => {
                                if (
                                  res.checkPackageMasterExistsRecord.success
                                ) {
                                  masterPackageStore.updateExistsLabEnvCode(
                                    true,
                                  );
                                  Toast.error({
                                    message: `😔 ${res.checkPackageMasterExistsRecord.message}`,
                                  });
                                } else
                                  masterPackageStore.updateExistsLabEnvCode(
                                    false,
                                  );
                              });
                          }
                        }}
                      />
                    </Form.InputWrapper>
                  )}
                  name='lab'
                  rules={{required: true}}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label='Service Type'
                      hasError={errors.serviceType}
                    >
                      <select
                        value={masterPackageStore.masterPackage?.serviceType}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.serviceType
                            ? 'border-red-500'
                            : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const serviceItem = JSON.parse(e.target.value);
                          onChange(serviceItem);
                          masterPackageStore.updateMasterPackage({
                            ...masterPackageStore.masterPackage,
                            serviceType: serviceItem.code,
                            packageName: undefined,
                            panelName: [],
                          });
                        }}
                      >
                        <option selected>
                          {(routerStore.lookupItems.length > 0 &&
                            getServiceTypes(
                              routerStore?.lookupItems?.find(item => {
                                return item.fieldName === 'SERVICE_TYPE';
                              }),
                            ).find(
                              item =>
                                item?.code ===
                                masterPackageStore.masterPackage?.serviceType,
                            )?.value +
                              ' - ' +
                              getServiceTypes(
                                routerStore?.lookupItems?.find(item => {
                                  return item.fieldName === 'SERVICE_TYPE';
                                }),
                              ).find(
                                item =>
                                  item?.code ===
                                  masterPackageStore.masterPackage?.serviceType,
                              )?.code) ||
                            'Select'}
                        </option>
                        {routerStore.lookupItems.length > 0 &&
                          getServiceTypes(
                            routerStore.lookupItems.find(item => {
                              return item.fieldName === 'SERVICE_TYPE';
                            }),
                          ).map((item: any, index: number) => (
                            <option key={index} value={JSON.stringify(item)}>
                              {lookupValue(item)}
                            </option>
                          ))}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='serviceType'
                  rules={{required: true}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label='Package Code'
                      hasError={errors.packageCode}
                    >
                      <select
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.packageCode
                            ? 'border-red-500'
                            : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const packageItem = JSON.parse(e.target.value);

                          onChange(packageItem.panelCode);
                          masterPackageStore.updateMasterPackage({
                            ...masterPackageStore.masterPackage,
                            packageCode: packageItem.panelCode,
                            packageName: packageItem.panelName,
                          });
                          if (
                            !masterPackageStore.masterPackage?.existsVersionId
                          ) {
                            masterPackageStore.masterPackageService
                              .checkExistsRecords({
                                input: {
                                  lab: masterPackageStore.masterPackage.lab,
                                  packageCode: packageItem.panelCode,
                                  panelCode:
                                    masterPackageStore.masterPackage?.panelCode,
                                  env: masterPackageStore.masterPackage
                                    ?.environment,
                                },
                              })
                              .then(res => {
                                if (
                                  res.checkPackageMasterExistsRecord.success
                                ) {
                                  masterPackageStore.updateExistsLabEnvCode(
                                    true,
                                  );
                                  Toast.error({
                                    message: `😔 ${res.checkPackageMasterExistsRecord.message}`,
                                  });
                                } else
                                  masterPackageStore.updateExistsLabEnvCode(
                                    false,
                                  );
                              });
                          }
                        }}
                      >
                        <option selected>Select</option>
                        {masterPanelStore.listMasterPanel
                          .filter(item => {
                            return (
                              item.serviceType ===
                                masterPackageStore.masterPackage?.serviceType &&
                              item.pLab ===
                                masterPackageStore.masterPackage?.lab
                            );
                          })
                          .map((item: any, index: number) => (
                            <option key={index} value={JSON.stringify(item)}>
                              {`${item.panelName} - ${item.panelCode}`}
                            </option>
                          ))}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='packageCode'
                  rules={{required: true}}
                  defaultValue=''
                />
                {masterPackageStore.checkExitsLabEnvCode && (
                  <span className='text-red-600 font-medium relative'>
                    Code already exits. Please use other code.
                  </span>
                )}
                <label className='hidden'>
                  {' '}
                  {`${masterPackageStore.masterPackage?.packageName}`}
                </label>
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      value={masterPackageStore.masterPackage?.packageName}
                      label='Package Name'
                      placeholder='Package Name'
                      disabled={true}
                    />
                  )}
                  name='packageName'
                  rules={{required: false}}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label='Panel Code'
                      hasError={errors.panelCode}
                    >
                      <AutoCompleteFilterMutiSelectMultiFieldsDisplay
                        loader={loading}
                        placeholder='Search by code or name'
                        data={{
                          list:
                            masterPanelStore.listMasterPanel.filter(item => {
                              return (
                                item.serviceType ===
                                  (masterPackageStore.masterPackage
                                    ?.serviceType === 'K'
                                    ? 'N'
                                    : 'S') &&
                                item.pLab ===
                                  masterPackageStore.masterPackage?.lab
                              );
                            }) || [],
                          selected: masterPackageStore.selectedItems?.panelCode,
                          displayKey: ['panelCode', 'panelName'],
                        }}
                        hasError={errors.testName}
                        onUpdate={item => {
                          const items =
                            masterPackageStore.selectedItems?.panelCode;
                          const panelCode: string[] = [];
                          const panelName: string[] = [];
                          const reportOrder: any[] = [];
                          items?.filter((item: any) => {
                            panelCode.push(item.panelCode);
                            panelName.push(item.panelName);
                            reportOrder.push({
                              panelCode: item.panelCode,
                              panelName: item.panelName,
                              order: 1,
                            });
                          });
                          masterPackageStore.updateMasterPackage({
                            ...masterPackageStore.masterPackage,
                            panelCode,
                            panelName,
                            reportOrder,
                          });
                          masterPanelStore.updatePanelMasterList(
                            masterPanelStore.listMasterPanelCopy,
                          );
                          if (
                            !masterPackageStore.masterPackage?.existsVersionId
                          ) {
                            masterPackageStore.masterPackageService
                              .checkExistsRecords({
                                input: {
                                  lab: masterPackageStore.masterPackage.lab,
                                  packageCode:
                                    masterPackageStore.masterPackage
                                      ?.packageCode,
                                  panelCode,
                                  env: masterPackageStore.masterPackage
                                    ?.environment,
                                },
                              })
                              .then(res => {
                                if (
                                  res.checkPackageMasterExistsRecord.success
                                ) {
                                  masterPackageStore.updateExistsLabEnvCode(
                                    true,
                                  );
                                  Toast.error({
                                    message: `😔 ${res.checkPackageMasterExistsRecord.message}`,
                                  });
                                } else
                                  masterPackageStore.updateExistsLabEnvCode(
                                    false,
                                  );
                              });
                          }
                        }}
                        onFilter={(value: string) => {
                          masterPanelStore.masterPanelService.filterByFields({
                            input: {
                              filter: {
                                fields: ['panelCode', 'panelName'],
                                srText: value,
                              },
                              page: 0,
                              limit: 10,
                            },
                          });
                        }}
                        onSelect={item => {
                          onChange(new Date());
                          let panelCode =
                            masterPackageStore.selectedItems?.panelCode;
                          if (!item.selected) {
                            if (panelCode && panelCode.length > 0) {
                              panelCode.push(item);
                            } else panelCode = [item];
                          } else {
                            panelCode = panelCode.filter(items => {
                              return items._id !== item._id;
                            });
                          }
                          masterPackageStore.updateSelectedItems({
                            ...masterPackageStore.selectedItems,
                            panelCode,
                          });
                        }}
                      />
                    </Form.InputWrapper>
                  )}
                  name='panelCode'
                  rules={{required: true}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label='Panel Name'
                      hasError={errors.panelName}
                    >
                      <select
                        disabled={true}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.panelName
                            ? 'border-red-500  '
                            : 'border-gray-300'
                        } rounded-md`}
                      >
                        <option selected>
                          {masterPackageStore.masterPackage?.panelName?.join(
                            ',',
                          ) || 'Select'}
                        </option>
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='panelName'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper label='Status' hasError={errors.status}>
                      <select
                        value={masterPackageStore.masterPackage?.status}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.status ? 'border-red-500  ' : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const status = e.target.value;
                          onChange(status);
                          masterPackageStore.updateMasterPackage({
                            ...masterPackageStore.masterPackage,
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
                        errors.userId
                          ? 'Please Enter Entered By '
                          : 'Entered By'
                      }
                      hasError={errors.userId}
                      value={loginStore.login?.userId}
                      disabled={true}
                    />
                  )}
                  name='userId'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputDateTime
                      label='Date Creation'
                      placeholder={
                        errors.dateCreation
                          ? 'Please Enter DateCreation'
                          : 'Date Creation'
                      }
                      hasError={errors.dateCreation}
                      value={masterPackageStore.masterPackage?.dateCreation}
                      disabled={true}
                    />
                  )}
                  name='dateCreation'
                  rules={{required: false}}
                  defaultValue=''
                />

                <Grid cols={3}>
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.Toggle
                        label='Bill'
                        id='modeBill'
                        hasError={errors.bill}
                        value={masterPackageStore.masterPackage?.bill}
                        onChange={bill => {
                          masterPackageStore.updateMasterPackage({
                            ...masterPackageStore.masterPackage,
                            bill,
                          });
                        }}
                      />
                    )}
                    name='bill'
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.Toggle
                        label='Print Package Name'
                        id='printPackageName'
                        hasError={errors.printPackageName}
                        value={
                          masterPackageStore.masterPackage?.printPackageName
                        }
                        onChange={printPackageName => {
                          masterPackageStore.updateMasterPackage({
                            ...masterPackageStore.masterPackage,
                            printPackageName,
                          });
                        }}
                      />
                    )}
                    name='printPackageName'
                    rules={{required: false}}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.Toggle
                        label='Print Panel Name'
                        id='printPanelName'
                        hasError={errors.printPanelName}
                        value={masterPackageStore.masterPackage?.printPanelName}
                        onChange={printPanelName => {
                          masterPackageStore.updateMasterPackage({
                            ...masterPackageStore.masterPackage,
                            printPanelName,
                          });
                        }}
                      />
                    )}
                    name='printPanelName'
                    rules={{required: false}}
                    defaultValue=''
                  />
                </Grid>
              </List>

              <List direction='col' space={4} justify='stretch' fill>
                <Form.InputWrapper label='Report Order'>
                  <Table striped bordered className='max-h-5' size='sm'>
                    <thead>
                      <tr className='text-xs'>
                        <th className='text-white' style={{minWidth: 150}}>
                          Panel
                        </th>
                        <th
                          className='text-white flex flex-row gap-2 items-center'
                          style={{minWidth: 150}}
                        >
                          Order
                          <Buttons.ButtonIcon
                            icon={
                              <IconContext.Provider value={{color: '#ffffff'}}>
                                <BsFillArrowUpCircleFill />
                              </IconContext.Provider>
                            }
                            title=''
                            onClick={() => {
                              let reportOrder =
                                masterPackageStore.masterPackage.reportOrder;
                              reportOrder = _.orderBy(
                                reportOrder,
                                'order',
                                'asc',
                              );
                              masterPackageStore.updateMasterPackage({
                                ...masterPackageStore.masterPackage,
                                reportOrder,
                              });
                            }}
                          />
                          <Buttons.ButtonIcon
                            icon={
                              <IconContext.Provider value={{color: '#ffffff'}}>
                                <BsFillArrowDownCircleFill />
                              </IconContext.Provider>
                            }
                            title=''
                            onClick={() => {
                              let reportOrder =
                                masterPackageStore.masterPackage.reportOrder;
                              reportOrder = _.orderBy(
                                reportOrder,
                                'order',
                                'desc',
                              );
                              masterPackageStore.updateMasterPackage({
                                ...masterPackageStore.masterPackage,
                                reportOrder,
                              });
                            }}
                          />
                        </th>
                      </tr>
                    </thead>
                    <tbody className='text-xs'>
                      {masterPackageStore.masterPackage?.reportOrder &&
                        masterPackageStore.masterPackage?.reportOrder.map(
                          (item, index) => (
                            <tr
                              onMouseEnter={() => {
                                setTxtDisable(false);
                              }}
                              onMouseLeave={() => {
                                setTxtDisable(true);
                              }}
                            >
                              <td>{`${index + 1}. ${
                                item.panelName + ' - ' + item.panelCode
                              }`}</td>
                              <td style={{width: 150}}>
                                {txtDisable ? (
                                  <span
                                    className={
                                      'leading-4 p-2  focus:outline-none focus:ring  block w-full shadow-sm sm:text-base  border-2 rounded-md'
                                    }
                                  >
                                    {item.order}
                                  </span>
                                ) : (
                                  <Form.Input
                                    type='number'
                                    placeholder={item.order}
                                    onChange={order => {
                                      const reportOrder =
                                        masterPackageStore.masterPackage
                                          ?.reportOrder;
                                      reportOrder[index].order =
                                        Number.parseInt(order);
                                      masterPackageStore.updateMasterPackage({
                                        ...masterPackageStore.masterPackage,
                                        reportOrder,
                                      });
                                    }}
                                  />
                                )}
                              </td>
                            </tr>
                          ),
                        )}
                    </tbody>
                  </Table>
                </Form.InputWrapper>

                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputDateTime
                      label='Date Active'
                      placeholder={
                        errors.dateActive
                          ? 'Please Enter DateActiveFrom'
                          : 'Date Active'
                      }
                      hasError={errors.dateActive}
                      value={masterPackageStore.masterPackage?.dateActive}
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
                        errors.dateExpire
                          ? 'Please Enter Date Expire'
                          : 'Date Expire'
                      }
                      hasError={errors.dateExpire}
                      value={masterPackageStore.masterPackage?.dateExpire}
                      onChange={dateExpire => {
                        onChange(dateExpire);
                        masterPackageStore.updateMasterPackage({
                          ...masterPackageStore.masterPackage,
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
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Version'
                      placeholder={
                        errors.version ? 'Please Enter Version ' : 'Version'
                      }
                      hasError={errors.version}
                      value={masterPackageStore.masterPackage?.version}
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
                      hasError={errors.environment}
                    >
                      <select
                        value={masterPackageStore.masterPackage?.environment}
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
                          masterPackageStore.updateMasterPackage({
                            ...masterPackageStore.masterPackage,
                            environment,
                          });
                          if (
                            !masterPackageStore.masterPackage?.existsVersionId
                          ) {
                            masterPackageStore.masterPackageService
                              .checkExistsRecords({
                                input: {
                                  lab: masterPackageStore.masterPackage.lab,
                                  packageCode:
                                    masterPackageStore.masterPackage
                                      ?.packageCode,
                                  panelCode:
                                    masterPackageStore.masterPackage?.panelCode,
                                  env: environment,
                                },
                              })
                              .then(res => {
                                if (
                                  res.checkPackageMasterExistsRecord.success
                                ) {
                                  masterPackageStore.updateExistsLabEnvCode(
                                    true,
                                  );
                                  Toast.error({
                                    message: `😔 ${res.checkPackageMasterExistsRecord.message}`,
                                  });
                                } else
                                  masterPackageStore.updateExistsLabEnvCode(
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
                            : masterPackageStore.masterPackage?.environment ||
                              'Select'}
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
                onClick={handleSubmit(onSubmitMasterPackage)}
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
                case 'Delete': {
                  masterPackageStore.masterPackageService
                    .deletePackageMaster({input: {id: modalConfirm.id}})
                    .then((res: any) => {
                      if (res.removePackageMaster.success) {
                        Toast.success({
                          message: `😊 ${res.removePackageMaster.message}`,
                        });
                        setModalConfirm({show: false});
                        masterPackageStore.fetchPackageMaster();
                      }
                    });

                  break;
                }
                case 'Update': {
                  masterPackageStore.masterPackageService
                    .updateSingleFiled({
                      input: {
                        _id: modalConfirm.data.id,
                        [modalConfirm.data.dataField]: modalConfirm.data.value,
                      },
                    })
                    .then((res: any) => {
                      if (res.updatePackageMaster.success) {
                        Toast.success({
                          message: `😊 ${res.updatePackageMaster.message}`,
                        });
                        setModalConfirm({show: false});
                        masterPackageStore.fetchPackageMaster();
                      }
                    });

                  break;
                }
                case 'updateFileds': {
                  masterPackageStore.masterPackageService
                    .updateSingleFiled({
                      input: {
                        ...modalConfirm.data.fileds,
                        _id: modalConfirm.data.id,
                      },
                    })
                    .then((res: any) => {
                      if (res.updatePackageMaster.success) {
                        Toast.success({
                          message: `😊 ${res.updatePackageMaster.message}`,
                        });
                        setModalConfirm({show: false});
                        masterPackageStore.fetchPackageMaster();
                      }
                    });

                  break;
                }
                case 'versionUpgrade': {
                  masterPackageStore.updateMasterPackage({
                    ...modalConfirm.data,
                    _id: undefined,
                    existsVersionId: modalConfirm.data._id,
                    existsRecordId: undefined,
                    version: Number.parseInt(modalConfirm.data.version + 1),
                    dateActive: dayjs().unix(),
                  });
                  setValue('lab', modalConfirm.data.lab);
                  setValue('environment', modalConfirm.data.environment);
                  setValue('status', modalConfirm.data.status);

                  break;
                }
                case 'duplicate': {
                  masterPackageStore.updateMasterPackage({
                    ...modalConfirm.data,
                    _id: undefined,
                    existsVersionId: undefined,
                    existsRecordId: modalConfirm.data._id,
                    version: Number.parseInt(modalConfirm.data.version + 1),
                    dateActive: dayjs().unix(),
                  });
                  setHideAddLab(!hideAddLab);
                  setValue('lab', modalConfirm.data.lab);
                  setValue('environment', modalConfirm.data.environment);
                  setValue('status', modalConfirm.data.status);

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

export default MasterPackage;
