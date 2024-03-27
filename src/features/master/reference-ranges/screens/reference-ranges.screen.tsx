import React, { useState, useMemo } from 'react';
import { observer } from 'mobx-react';
import _ from 'lodash';
import {
  Toast,
  Buttons,
  List,
  Svg,
  ModalConfirm,
  ManualImportTabs,
  StaticInputTable,
  ImportFile,
  MainPageHeading,
  Icons,
} from '@/library/components';
import {
  CommonInputTable,
  ReferenceRangesList,
  RefRangesInputTable,
} from '../components';
import { ReferenceRangesHoc } from '../hoc';
import { useStores } from '@/stores';
import { RouterFlow } from '@/flows';
import { toJS } from 'mobx';
import { resetReferenceRange } from '../startup';
import dayjs from 'dayjs';
import * as XLSX from 'xlsx';
import { getDays } from '../utils';
import { getDefaultLookupItem } from '@/library/utils';
import { useForm } from 'react-hook-form';

const ReferenceRanges = ReferenceRangesHoc(
  observer(() => {
    const {
      loginStore,
      interfaceManagerStore,
      labStore,
      masterAnalyteStore,
      departmentStore,
      refernceRangesStore,
      routerStore,
    } = useStores();
    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
      clearErrors,
      setError,
      reset,
    } = useForm({ mode: 'all' });

    const [modalConfirm, setModalConfirm] = useState<any>();
    const [hideAddView, setHideAddView] = useState<boolean>(true);
    const [dupExistsRecords, setDupExistsRecords] = useState<any>();
    const [isCommonTableReload, setIsCommonTableReload] = useState(false);
    const [isImport, setIsImport] = useState<boolean>(false);
    const [arrImportRecords, setArrImportRecords] = useState<Array<any>>([]);
    const [isVersionUpgrade, setIsVersionUpgrade] = useState<boolean>(false);

    const onSubmitReferenceRanges = () => {
      if (!isImport) {
        if (
          refernceRangesStore.referenceRanges?.refRangesInputList?.length > 0
        ) {
          if (!refernceRangesStore.checkExitsRecord) {
            if (
              !_.isEqual(
                JSON.stringify(
                  refernceRangesStore.referenceRanges?.refRangesInputList,
                ),
                dupExistsRecords,
              )
            ) {
              refernceRangesStore.referenceRangesService
                .addReferenceRanges({
                  input: {
                    isImport,
                    filter: {
                      refRangesInputList: _.filter(
                        refernceRangesStore.referenceRanges?.refRangesInputList,
                        (a: any) => {
                          a._id = undefined;
                          return a;
                        },
                      ),
                    },
                  },
                })
                .then(res => {
                  if (res.createReferenceRange.success) {
                    Toast.success({
                      message: `😊 ${res.createReferenceRange.message}`,
                    });
                    setHideAddView(true);
                    resetReferenceRange();
                    setIsCommonTableReload(!isCommonTableReload);
                    setIsImport(false);
                    setIsVersionUpgrade(false);
                    refernceRangesStore.updateReferenceRanges({
                      ...refernceRangesStore.referenceRanges,
                      refRangesInputList: [],
                    });
                  } else {
                    Toast.error({
                      message: `😔 ${res.createReferenceRange.message}`,
                    });
                  }
                });
            } else {
              Toast.error({
                message: '😔 Duplicate record found!',
              });
            }
          } else {
            Toast.error({
              message: '😔 Duplicate record found!',
            });
          }
        } else {
          Toast.error({
            message: '😔 Records not found.',
          });
        }
      } else {
        refernceRangesStore.referenceRangesService
          .addReferenceRanges({
            input: { isImport, arrImportRecords },
          })
          .then(res => {
            console.log({ res });
            if (res.createReferenceRange.success) {
              Toast.success({
                message: `😊 ${res.createReferenceRange.message}`,
              });
              setHideAddView(true);
              resetReferenceRange();
              setIsCommonTableReload(!isCommonTableReload);
              setArrImportRecords([]);
              setIsImport(false);
              setIsVersionUpgrade(false);
            } else {
              Toast.error({
                message: `😔 ${res.createReferenceRange.message}`,
              });
            }
          });
      }
    };
    const onUpdateSingleField = payload => {
      refernceRangesStore.referenceRangesService
        .updateSingleFiled({
          input: {
            ...payload,
          },
        })
        .then((res: any) => {
          if (res.updateReferenceRange.success) {
            Toast.success({
              message: `😊 ${res.updateReferenceRange.message}`,
            });
            if (global?.filter?.mode == 'pagination')
              refernceRangesStore.fetchListReferenceRanges(
                global?.filter?.page,
                global?.filter?.limit,
              );
            else if (global?.filter?.mode == 'filter')
              refernceRangesStore.referenceRangesService.filter({
                input: {
                  type: global?.filter?.type,
                  filter: global?.filter?.filter,
                  page: global?.filter?.page,
                  limit: global?.filter?.limit,
                },
              });
            else refernceRangesStore.fetchListReferenceRanges();
          }
        });
    };

    const tableView = useMemo(
      () => (
        <ReferenceRangesList
          data={refernceRangesStore.listReferenceRanges || []}
          totalSize={refernceRangesStore.listReferenceRangesCount}
          extraData={{
            lookupItems: routerStore.lookupItems,
            listMasterAnalyte: masterAnalyteStore.listMasterAnalyte,
            listDepartment: departmentStore.listDepartment,
            listLabs: labStore.listLabs,
            listInterfaceManager: interfaceManagerStore.listInterfaceManager,
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
          isVersionUpgrade={RouterFlow.checkPermission(
            routerStore.userPermission,
            'Version Upgrade',
          )}
          isDuplicate={RouterFlow.checkPermission(
            routerStore.userPermission,
            'Duplicate',
          )}
          onDelete={selectedItem => setModalConfirm(selectedItem)}
          onSelectedRow={rows => {
            setModalConfirm({
              show: true,
              type: 'delete',
              id: rows,
              title: 'Are you sure?',
              body: 'Do you want to delete selected record?',
            });
          }}
          onUpdateItem={(value: any, dataField: string, id: string) => {
            setModalConfirm({
              show: true,
              type: 'update',
              data: { value, dataField, id },
              title: 'Are you sure?',
              body: 'Do you want to update this record?',
            });
          }}
          onUpdateFileds={(fileds: any, id: string) => {
            setModalConfirm({
              show: true,
              type: 'UpdateFileds',
              data: { fileds, id },
              title: 'Are you sure?',
              body: 'Do you want to update this record?',
            });
          }}
          onVersionUpgrade={item => {
            setModalConfirm({
              show: true,
              type: 'versionUpgrade',
              data: item,
              title: 'Are you sure?',
              body: 'Do you want to upgrade version for this record?',
            });
          }}
          onDuplicate={item => {
            setModalConfirm({
              show: true,
              type: 'duplicate',
              data: item,
              title: 'Are you sure?',
              body: 'Do you want to duplicate this record?',
            });
          }}
          onPageSizeChange={(page, limit) => {
            refernceRangesStore.fetchListReferenceRanges(page, limit);
            global.filter = { mode: 'pagination', page, limit };
          }}
          onFilter={(type, filter, page, limit) => {
            refernceRangesStore.referenceRangesService.filter({
              input: { type, filter, page, limit },
            });
            global.filter = { mode: 'filter', type, page, limit, filter };
          }}
          onApproval={async records => {
            const isExists = await checkExistsRecords(records);
            if (!isExists) {
              setModalConfirm({
                show: true,
                type: 'update',
                data: { value: 'A', dataField: 'status', id: records._id },
                title: 'Are you sure?',
                body: 'Update Reference Ranges!',
              });
            }
          }}
          onSingleDirectUpdateField={(value, dataField, id) => {
            onUpdateSingleField({
              _id: id,
              [dataField]: value,
            });
          }}
        />
      ),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [refernceRangesStore.listReferenceRanges],
    );

    const handleFileUpload = (file: any) => {
      const reader = new FileReader();
      reader.addEventListener('load', (evt: any) => {
        /* Parse data */
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_json(ws, { raw: true });
        const list = data.map((item: any) => {
          const days = getDays(
            item['Age From'],
            item['Age From Unit'],
            item['Age To'],
            item['Age To Unit'],
          );
          return {
            analyteCode: item['Analyte Code'],
            analyteName: item['Analayte Name'],
            department: item.Department,
            species: item.Species,
            sex: item.Sex,
            rangeSetOn: item['Range Set On'],
            instType: item['Inst Type'],
            lab: item.Lab,
            rangeType: item['Range Type'],
            validationLevel: item['Validation Level'] || 0,
            ageFrom: item['Age From'],
            ageFromUnit: item['Age From Unit'],
            ageTo: item['Age To'],
            ageToUnit: item['Age To Unit'],
            daysAgeFrom: days?.daysAgeFrom,
            daysAgeTo: days?.daysAgeTo,
            low: item.Low,
            high: item.High,
            alpha: item.Alpha,
            deltaType: item['Delta Type'],
            deltaInterval: item['Delta Interval'],
            intervalUnit: item['Interval Unit'],
            enterBy: loginStore.login?.userId,
            dateCreation: new Date(),
            dateActive: new Date(),
            dateExpire: new Date(
              dayjs(new Date()).add(365, 'days').format('YYYY-MM-DD'),
            ),
            version: item.Version,
            environment: item.Environment,
            companyCode: item['Company Code'],
            status: 'D',
          };
        });
        console.log({ list });

        setArrImportRecords(list);
      });
      reader.readAsBinaryString(file);
    };

    const checkExistsRecords = async (
      fields = refernceRangesStore.referenceRanges,
      length = 0,
      status = 'A',
    ) => {
      const requiredFields = [
        'analyteCode',
        'analyteName',
        'species',
        'sex',
        'rangeSetOn',
        'rangeType',
        'ageFrom',
        'ageFromUnit',
        'ageTo',
        'ageToUnit',
        'version',
        'validationLevel',
        'status',
        'environment',
      ];
      const isEmpty = requiredFields.find(item => {
        if (_.isEmpty({ ...fields, status }[item]?.toString())) return item;
      });
      if (isEmpty) {
        Toast.error({
          message: `😔 Required ${isEmpty} value missing. Please enter correct value`,
        });
        return true;
      }
      return refernceRangesStore.referenceRangesService
        .findByFields({
          input: {
            filter: {
              ..._.pick({ ...fields, status }, requiredFields),
            },
          },
        })
        .then(res => {
          if (
            res.findByFieldsReferenceRanges?.success &&
            res.findByFieldsReferenceRanges?.data?.length > length
          ) {
            Toast.error({
              message: '😔 Already some record exists.',
            });
            return true;
          } else return false;
        });
    };

    const refRangesInputTable = useMemo(
      () =>
        refernceRangesStore.referenceRanges?.refRangesInputList.length > 0 && (
          <div className='p-2 rounded-lg shadow-xl overflow-auto'>
            <RefRangesInputTable
              isVersionUpgrade={isVersionUpgrade}
              data={toJS(
                refernceRangesStore.referenceRanges?.refRangesInputList,
              )}
              extraData={routerStore}
              onDelete={rangeId => {
                const index = _.findIndex(
                  refernceRangesStore.referenceRanges?.refRangesInputList,
                  { rangeId },
                );
                const firstArr =
                  refernceRangesStore.referenceRanges?.refRangesInputList?.slice(
                    0,
                    index,
                  ) || [];
                const secondArr =
                  refernceRangesStore.referenceRanges?.refRangesInputList?.slice(
                    index + 1,
                  ) || [];
                const finalArray = [...firstArr, ...secondArr];
                refernceRangesStore.updateReferenceRanges({
                  ...refernceRangesStore.referenceRanges,
                  refRangesInputList: finalArray,
                });
              }}
              onUpdateItems={(items, rangeId) => {
                const index = _.findIndex(
                  refernceRangesStore.referenceRanges?.refRangesInputList,
                  { rangeId },
                );
                const refRangesInputList =
                  refernceRangesStore.referenceRanges?.refRangesInputList;
                refRangesInputList[index] = {
                  ...refRangesInputList[index],
                  ...items,
                };
                refernceRangesStore.updateReferenceRanges({
                  ...refernceRangesStore.referenceRanges,
                  refRangesInputList,
                  refreshList:
                    !refernceRangesStore.referenceRanges?.refreshList,
                });
              }}
            />
          </div>
        ),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [
        refernceRangesStore.referenceRanges?.refRangesInputList?.length,
        refernceRangesStore.referenceRanges?.refreshList,
        departmentStore.listDepartment,
      ],
    );

    const addItem = () => {
      const refRangesInputList =
        refernceRangesStore.referenceRanges?.refRangesInputList;
      console.log({ refRangesInputList });

      refRangesInputList.push({
        rangeId:
          refernceRangesStore.referenceRanges?.refRangesInputList.length + 1,
        analyteCode: refernceRangesStore.referenceRanges?.analyteCode,
        analyteName: refernceRangesStore.referenceRanges?.analyteName,
        analyteDepartments:
          refernceRangesStore.referenceRanges?.analyteDepartments,
        department: refernceRangesStore.referenceRanges?.department,
        species: refernceRangesStore.referenceRanges?.species,
        sex: refernceRangesStore.referenceRanges?.sex,
        rangeSetOn: refernceRangesStore.referenceRanges?.rangeSetOn,
        instType: refernceRangesStore.referenceRanges?.instType,
        lab: refernceRangesStore.referenceRanges?.lab,
        picture: refernceRangesStore.referenceRanges?.picture,
        version: 1,
        dateCreation: new Date(),
        dateActive: new Date(),
        dateExpire: new Date(
          dayjs(new Date()).add(365, 'days').format('YYYY-MM-DD'),
        ),
        enterBy: loginStore.login.userId,
        status: 'A',
        type: 'insert',
        rangeType: getDefaultLookupItem(routerStore.lookupItems, 'RANGE_TYPE'),
        validationLevel: Number.parseInt(
          getDefaultLookupItem(routerStore.lookupItems, 'VALIDATION_LEVEL'),
        ),
      });

      refernceRangesStore.updateReferenceRanges({
        ...refernceRangesStore.referenceRanges,
        refRangesInputList,
      });
    };

    return (
      <>
        <MainPageHeading
          title={routerStore.selectedComponents?.title || ''}
          store={loginStore}
        />
        <div
          className='flex justify-end'
          style={{ position: 'fixed', right: '17px' }}
        >
          {RouterFlow.checkPermission(routerStore.userPermission, 'Add') && (
            <Buttons.ButtonCircleAddRemoveBottom
              show={hideAddView}
              onClick={() => setHideAddView(!hideAddView)}
            />
          )}
        </div>

        <div className='mx-auto flex-wrap'>
          <div
            className={
              'p-2 rounded-lg shadow-xl ' + (hideAddView ? 'hide' : 'shown')
            }
          >
            <ManualImportTabs
              isImportDisable={
                !RouterFlow.checkPermission(
                  toJS(routerStore.userPermission),
                  'Import',
                )
              }
              isImport={isImport}
              onClick={flag => {
                setIsImport(flag);
              }}
            />
            {!isImport ? (
              <div className='flex flex-col p-2 rounded-lg shadow-xl '>
                <CommonInputTable
                  isVersionUpgrade={isVersionUpgrade}
                  isReload={isCommonTableReload}
                  reset={reset}
                  setValue={setValue}
                  clearErrors={clearErrors}
                  setError={setError}
                  control={control}
                  errors={errors}
                />
                {refRangesInputTable}
              </div>
            ) : (
              <>
                {arrImportRecords?.length > 0 ? (
                  <StaticInputTable data={arrImportRecords} />
                ) : (
                  <ImportFile
                    onClick={file => {
                      handleFileUpload(file[0]);
                    }}
                  />
                )}
              </>
            )}
            <br />
            <List direction='row' space={2} align='center'>
              <Buttons.Button
                size='medium'
                type='solid'
                icon={Svg.Plus}
                onClick={handleSubmit(addItem)}
              >
                Add
              </Buttons.Button>
              <Buttons.Button
                size='medium'
                type='solid'
                icon={Svg.Save}
                disabled={
                  toJS(refernceRangesStore.referenceRanges?.refRangesInputList)
                    .length < 1
                }
                onClick={() => onSubmitReferenceRanges()}
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
              setModalConfirm({ show: false });
              switch (action) {
                case 'delete': {
                  refernceRangesStore.referenceRangesService
                    .deleteReferenceRanges({ input: { id: modalConfirm.id } })
                    .then((res: any) => {
                      if (res.removeReferenceRange.success) {
                        Toast.success({
                          message: `😊 ${res.removeReferenceRange.message}`,
                        });
                        if (global?.filter?.mode == 'pagination')
                          refernceRangesStore.fetchListReferenceRanges(
                            global?.filter?.page,
                            global?.filter?.limit,
                          );
                        else if (global?.filter?.mode == 'filter')
                          refernceRangesStore.referenceRangesService.filter({
                            input: {
                              type: global?.filter?.type,
                              filter: global?.filter?.filter,
                              page: global?.filter?.page,
                              limit: global?.filter?.limit,
                            },
                          });
                        else refernceRangesStore.fetchListReferenceRanges();
                      }
                    });
                  break;
                }
                case 'update': {
                  onUpdateSingleField({
                    _id: modalConfirm.data.id,
                    [modalConfirm.data.dataField]: modalConfirm.data.value,
                  });

                  break;
                }
                case 'UpdateFileds': {
                  refernceRangesStore.referenceRangesService
                    .updateSingleFiled({
                      input: {
                        ...modalConfirm.data.fileds,
                        _id: modalConfirm.data.id,
                      },
                    })
                    .then((res: any) => {
                      if (res.updateReferenceRange.success) {
                        Toast.success({
                          message: `😊 ${res.updateReferenceRange.message}`,
                        });
                        if (global?.filter?.mode == 'pagination')
                          refernceRangesStore.fetchListReferenceRanges(
                            global?.filter?.page,
                            global?.filter?.limit,
                          );
                        else if (global?.filter?.mode == 'filter')
                          refernceRangesStore.referenceRangesService.filter({
                            input: {
                              type: global?.filter?.type,
                              filter: global?.filter?.filter,
                              page: global?.filter?.page,
                              limit: global?.filter?.limit,
                            },
                          });
                        else refernceRangesStore.fetchListReferenceRanges();
                      }
                    });
                  break;
                }
                case 'versionUpgrade': {
                  const refRangesInputList =
                    refernceRangesStore.referenceRanges?.refRangesInputList;
                  refRangesInputList.push({
                    ...modalConfirm.data,
                    rangeId:
                      refernceRangesStore.referenceRanges?.refRangesInputList
                        .length + 1,
                    existsRecordId: modalConfirm.data._id,
                    version: Number.parseInt(modalConfirm.data.version + 1),
                    type: 'versionUpgrade',
                  });
                  refernceRangesStore.updateReferenceRanges({
                    ...refernceRangesStore.referenceRanges,
                    refRangesInputList,
                  });
                  setHideAddView(!hideAddView);
                  setIsVersionUpgrade(true);
                  break;
                }
                case 'duplicate': {
                  const refRangesInputList =
                    refernceRangesStore.referenceRanges?.refRangesInputList;
                  refRangesInputList.push({
                    ...modalConfirm.data,
                    rangeId:
                      refernceRangesStore.referenceRanges?.refRangesInputList
                        .length + 1,
                    existsRecordId: modalConfirm.data._id,
                    version: 1,
                    type: 'duplicate',
                  });
                  setDupExistsRecords(JSON.stringify(refRangesInputList));
                  refernceRangesStore.updateReferenceRanges({
                    ...refernceRangesStore.referenceRanges,
                    refRangesInputList,
                  });
                  setHideAddView(!hideAddView);
                  break;
                }
                // No default
              }
            }}
            onClose={() => {
              setModalConfirm({ show: false });
            }}
          />
        </div>
      </>
    );
  }),
);
export default ReferenceRanges;
