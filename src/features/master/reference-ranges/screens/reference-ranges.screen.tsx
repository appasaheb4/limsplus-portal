import React, {useState, useMemo} from 'react';
import {observer} from 'mobx-react';
import _ from 'lodash';
import {
  Toast,
  Header,
  PageHeading,
  PageHeadingLabDetails,
  Buttons,
  List,
  Svg,
  ModalConfirm,
} from '@/library/components';
import {
  CommonInputTable,
  ReferenceRangesList,
  RefRangesInputTable,
} from '../components';
import {ReferenceRangesHoc} from '../hoc';
import {useStores} from '@/stores';

import {RouterFlow} from '@/flows';
import {toJS} from 'mobx';
import {resetReferenceRange} from '../startup';
import {ReferenceRanges as Model} from '../models';

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

    const [modalConfirm, setModalConfirm] = useState<any>();
    const [hideAddLab, setHideAddLab] = useState<boolean>(true);
    const [dupExistsRecords, setDupExistsRecords] = useState<any>();
    const onSubmitReferenceRanges = () => {
      if (refernceRangesStore.referenceRanges?.refRangesInputList?.length > 0) {
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
                  setHideAddLab(true);
                  resetReferenceRange();
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
            Toast.warning({
              message: '😔 Duplicate record found!',
            });
          }
        } else {
          Toast.warning({
            message: '😔 Duplicate record found!',
          });
        }
      } else {
        Toast.warning({
          message: '😔 Records not found.',
        });
      }
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
            refernceRangesStore.fetchListReferenceRanges(page, limit);
            global.filter = {mode: 'pagination', page, limit};
          }}
          onFilter={(type, filter, page, limit) => {
            refernceRangesStore.referenceRangesService.filter({
              input: {type, filter, page, limit},
            });
            global.filter = {mode: 'filter', type, page, limit, filter};
          }}
        />
      ),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [refernceRangesStore.listReferenceRanges],
    );

    const refRangesInputTable = useMemo(
      () =>
        refernceRangesStore.referenceRanges?.refRangesInputList.length > 0 && (
          <div className='p-2 rounded-lg shadow-xl overflow-auto'>
            <RefRangesInputTable
              data={toJS(
                refernceRangesStore.referenceRanges?.refRangesInputList,
              )}
              extraData={routerStore}
              onDelete={rangeId => {
                const index = _.findIndex(
                  refernceRangesStore.referenceRanges?.refRangesInputList,
                  {rangeId},
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
                  {rangeId},
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
        refernceRangesStore.referenceRanges?.refRangesInputList.length,
        refernceRangesStore.referenceRanges?.refreshList,
      ],
    );

    return (
      <>
        <Header>
          <PageHeading title={routerStore.selectedComponents?.title || ''} />
          <PageHeadingLabDetails store={loginStore} />
        </Header>
        <div className='mx-auto flex-wrap'>
          <div
            className={
              'p-2 rounded-lg shadow-xl ' + (hideAddLab ? 'shown' : 'shown')
            }
          >
            <div className='p-2 rounded-lg shadow-xl overflow-auto'>
              <CommonInputTable />
              {refRangesInputTable}
            </div>
            <br />
            <List direction='row' space={3} align='center'>
              <Buttons.Button
                size='medium'
                type='solid'
                icon={Svg.Save}
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
              switch (action) {
                case 'delete': {
                  refernceRangesStore.referenceRangesService
                    .deleteReferenceRanges({input: {id: modalConfirm.id}})
                    .then((res: any) => {
                      if (res.removeReferenceRange.success) {
                        setModalConfirm({show: false});
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
                  refernceRangesStore.referenceRangesService
                    .updateSingleFiled({
                      input: {
                        _id: modalConfirm.data.id,
                        [modalConfirm.data.dataField]: modalConfirm.data.value,
                      },
                    })
                    .then((res: any) => {
                      if (res.updateReferenceRange.success) {
                        setModalConfirm({show: false});
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
                        setModalConfirm({show: false});
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
                  setModalConfirm({show: false});

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
                  console.log({refRangesInputList});
                  setDupExistsRecords(JSON.stringify(refRangesInputList));
                  refernceRangesStore.updateReferenceRanges({
                    ...refernceRangesStore.referenceRanges,
                    refRangesInputList,
                  });
                  setHideAddLab(!hideAddLab);
                  setModalConfirm({show: false});

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
export default ReferenceRanges;
