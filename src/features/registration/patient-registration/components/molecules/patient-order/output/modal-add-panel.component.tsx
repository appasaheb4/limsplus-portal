/* eslint-disable  */
import React, {useEffect, useRef, useState} from 'react';
import {Container} from 'reactstrap';
import _ from 'lodash';
import {observer} from 'mobx-react';
import {
  Form,
  AutoCompleteFilterMultiSelectSelectedTopDisplay,
} from '@/library/components';
import './barcode.css';
import {useStores} from '@/stores';
import {TablePackagesList} from '../input/table-packages-list.component';
import {toJS} from 'mobx';

interface ModalAddPanelProps {
  visible?: boolean;
  data?: any;
  onClick: (data: any) => void;
  onClose: () => void;
}

export const ModalAddPanel = observer(
  ({visible = false, data, onClick, onClose}: ModalAddPanelProps) => {
    const {
      loading,
      patientOrderStore,
      patientVisitStore,
      loginStore,
      routerStore,
      masterPanelStore,
      patientRegistrationStore,
    } = useStores();
    const [showModal, setShowModal] = React.useState(visible);
    const [existsPackageList, setExistsPackageList] = useState<any>([]);

    useEffect(() => {
      setShowModal(visible);
      if (data?.packageList?.length > 0) {
        const panels = data?.packageList;
        setExistsPackageList(panels);
        patientOrderStore.updateSelectedItems({
          ...patientOrderStore.selectedItems,
          panels,
          serviceTypes: _.union(_.map(panels, 'serviceType')),
        });
      }
    }, [visible, data]);

    return (
      <Container>
        {showModal && (
          <>
            <div className='justify-center items-center  overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
              <div className='relative w-auto my-6 mx-auto max-w-3xl'>
                <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                  <div className='flex items-start justify-between p-3 border-b border-solid border-gray-300 rounded-t'>
                    <h3 className='text-3xl font-semibold'>
                      {'Are you sure modify panels'}
                    </h3>
                    <button
                      className='p-1  border-0 text-black opacity-1 ml-6 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                      onClick={() => {
                        setShowModal(false);
                        onClose && onClose();
                      }}
                    >
                      <span className=' text-black h-6 w-6 text-2xl block outline-none focus:outline-none'>
                        ×
                      </span>
                    </button>
                  </div>
                  <div className='relative p-2 flex-auto'>
                    <Form.InputWrapper label='Panels'>
                      <AutoCompleteFilterMultiSelectSelectedTopDisplay
                        loader={loading}
                        placeholder='Search by code or name'
                        isUpperCase={true}
                        data={{
                          list: masterPanelStore.listMasterPanel.filter(
                            item => {
                              if (
                                item.rLab === data?.rLab &&
                                item.status == 'A'
                              ) {
                                return item;
                              }
                            },
                          ),
                          selected: patientOrderStore.selectedItems?.panels,
                          displayKey: ['panelCode', 'panelName'],
                        }}
                        disable={!data?.rLab}
                        onUpdate={item => {
                          const panels =
                            patientOrderStore.selectedItems?.panels;
                          patientOrderStore.updatePatientOrder({
                            ...patientOrderStore.patientOrder,
                            panelCode: _.map(panels, o =>
                              _.pick(o, [
                                'panelCode',
                                'panelName',
                                'serviceType',
                                'confidential',
                                'reportTemplate',
                                'bill',
                                'externalPanelCode',
                              ]),
                            ),
                          });
                          masterPanelStore.updatePanelMasterList(
                            masterPanelStore.listMasterPanelCopy,
                          );
                          //get packages list
                          if (panels?.length > 0)
                            patientOrderStore.patientOrderService.getPackageList(
                              {
                                input: {
                                  filter: {
                                    panel: _.map(panels, o =>
                                      _.pick(o, [
                                        '_id',
                                        'department',
                                        'section',
                                        'bill',
                                        'rLab',
                                        'pLab',
                                        'panelCode',
                                        'panelName',
                                        'serviceType',
                                        'confidential',
                                        'externalPanelCode',
                                        'schedule',
                                      ]),
                                    ),
                                    visitId:
                                      patientOrderStore.patientOrder?.visitId,
                                  },
                                },
                              },
                            );
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
                        onSelect={(item, isSelectedRemove = false) => {
                          let panels = patientOrderStore.selectedItems?.panels;
                          let newPackageList = panels;
                          const existsSelRecords = toJS(existsPackageList);
                          if (!item.selected) {
                            if (panels && panels?.length > 0) {
                              panels.push(item);
                            } else panels = [item];
                            //setExistsPackageList(panels);
                            newPackageList = panels;
                          } else {
                            panels = panels.filter(items => {
                              return items._id !== item._id;
                            });
                          }
                          patientOrderStore.updateSelectedItems({
                            ...patientOrderStore.selectedItems,
                            panels,
                            serviceTypes: _.union(_.map(panels, 'serviceType')),
                          });
                          if (isSelectedRemove) {
                            const selectedRecords = existsSelRecords?.filter(
                              (existsItem: any) =>
                                existsItem.panelCode != item.panelCode,
                            );
                            newPackageList = selectedRecords;
                          }
                          newPackageList = newPackageList.map(o => ({
                            _id: o?._id,
                            department: o?.department,
                            bill: o?.bill,
                            rLab: o?.rLab,
                            pLab: o?.pLab,
                            panelCode: o?.panelCode,
                            panelName: o?.panelName,
                            serviceType: o?.serviceType,
                            confidential: o?.confidential,
                            schedule: o?.schedule,
                            dueDate: o?.dueDate,
                            discountPer: o?.discountPer,
                            miscellaneousCharges: o?.miscellaneousCharges,
                            index: o?.index,
                            packageCode: o?.packageCode,
                            service: o?.service,
                            orderStatus: o?.orderStatus,
                            status: o?.status,
                            priceGroup: o?.priceGroup,
                            priceList: o?.priceList,
                            grossAmount: o?.grossAmount,
                            netAmount: o?.netAmount,
                            discountAmount: o?.discountAmount,
                          }));
                          setExistsPackageList(toJS(newPackageList));
                        }}
                      />
                    </Form.InputWrapper>
                    <div
                      className='rounded-lg shadow-xl overflow-scroll mt-2'
                      style={{overflowX: 'scroll'}}
                    >
                      {patientOrderStore.packageList && (
                        <TablePackagesList
                          data={patientOrderStore.packageList}
                          isDelete={false}
                        />
                      )}
                    </div>
                  </div>
                  <div className='flex items-center justify-end p-3 border-t border-solid border-gray-300 rounded-b gap-4'>
                    <button
                      className='background-transparent font-bold uppercase text-sm outline-none w-20 rounded-md p-1 border border-gray-400 shadow-lg focus:outline-none'
                      type='button'
                      style={{transition: 'all .15s ease'}}
                      onClick={() => {
                        setShowModal(false);
                        onClose && onClose();
                      }}
                    >
                      No
                    </button>
                    <button
                      className='background-transparent font-bold uppercase text-sm outline-none w-20 rounded-md p-1 border border-gray-400 shadow-lg focus:outline-none'
                      type='button'
                      style={{transition: 'all .15s ease'}}
                      onClick={() => {
                        setShowModal(false);
                        onClick && onClick(data);
                      }}
                    >
                      Yes
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
          </>
        )}
      </Container>
    );
  },
);
