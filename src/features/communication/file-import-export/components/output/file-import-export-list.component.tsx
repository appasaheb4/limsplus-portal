import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import {observer} from 'mobx-react';
import {Table} from 'react-bootstrap';
import {Buttons, Icons, Form, Tooltip} from '@/library/components';
import {IoMdCheckmarkCircle, IoIosCloseCircleOutline} from 'react-icons/io';
import {debounce} from '@/core-utils';
import {BsArrowDown, BsArrowUp} from 'react-icons/bs';
import {AiOutlineCloseCircle} from 'react-icons/ai';
import './table.css';
import {useStores} from '@/stores';
import dayjs from 'dayjs';
import {
  getAgeByAgeObject,
  getDiffByDate1,
  dateAvailableUnits,
} from '@/core-utils';
import {ModalModifyDetails} from '../molecules/modal-modify-details.component';

interface FileImportExportListProps {
  data: any;
  totalSize: any;
  onSend: (records: any) => void;
  onDelete: (ids: [string]) => void;
  onFilter?: (details: any) => void;
  onClearFilter?: () => void;
  onPagination: (type: string) => void;
}

export const FileImportExportList = observer(
  ({
    data,
    totalSize,
    onSend,
    onDelete,
    onFilter,
    onClearFilter,
    onPagination,
  }: FileImportExportListProps) => {
    const {
      doctorsStore,
      corporateClientsStore,
      registrationLocationsStore,
      loginStore,
    } = useStores();
    const [value, setValue] = useState({value: '', index: 0});
    const [isFilter, setIsFilter] = useState(false);
    const [finalOutput, setFinalOutput] = useState<any>([]);
    const [arrKeys, setArrKeys] = useState<Array<string>>([]);
    const [isAllSelected, setAllSelected] = useState(false);
    const [modalModifyDetails, setModalModifyDetails] = useState<any>({});

    const loadAsync = async recordsList => {
      let localArrKeys: any = [];
      const localFinalOutput: any = [];
      const data = recordsList?.map(item => {
        return {
          ...item?.records?.reduce((a, v) => ({...a, [v.field]: v.value}), {}),
          _id: item?._id,
        };
      });
      data.map(function (item) {
        const localKeys: any = [];
        for (const [key, value] of Object.entries(item as any)) {
          localKeys.push(key);
        }
        localArrKeys.push(...localKeys);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
      localArrKeys = _.uniq(localArrKeys);
      localArrKeys = _.remove(localArrKeys, item => {
        return item != 'elementSequence';
      });
      localArrKeys = _.remove(localArrKeys, item => {
        return item != 'undefined';
      });
      setArrKeys(localArrKeys);
      let dockerIds = data.map(item => {
        return item['Doctor Id'];
      });
      dockerIds = _.uniq(dockerIds);
      dockerIds = _.compact(dockerIds);
      const dockerList = await doctorsStore.doctorsService
        .findByArrayItems({
          input: {
            filter: {
              field: 'doctorCode',
              arrItems: dockerIds,
            },
          },
        })
        .then(res => {
          return res.findByArrayItemsDoctor?.data;
        });
      let corporateCode = data.map(item => {
        return item['Corporate Code'];
      });
      corporateCode = _.uniq(corporateCode);
      corporateCode = _.compact(corporateCode);
      const corporateCodeList =
        await corporateClientsStore.corporateClientsService
          .findByArrayItems({
            input: {
              filter: {
                field: 'corporateCode',
                arrItems: corporateCode,
              },
            },
          })
          .then(res => {
            return res.findByArrayItemsCorporateCode?.data;
          });
      let collectionCenter = data.map(item => {
        return item['Collection Center'];
      });
      collectionCenter = _.uniq(collectionCenter);
      collectionCenter = _.compact(collectionCenter);
      const collectionCenterList =
        await registrationLocationsStore.registrationLocationsService
          .findByArrayItem({
            input: {
              filter: {
                field: 'locationCode',
                arrItems: collectionCenter,
              },
            },
          })
          .then(res => {
            return res.findByArrayItemsRegistrationLocations?.data;
          });
      let isError = false;
      let errorMsg: any[] = [];
      data.map(function (item) {
        let list: any = [];
        localArrKeys.map(key => {
          // docker details fetch
          if (item['Doctor Id']) {
            const dockerDetails = dockerList?.find(
              o => o?.doctorCode == item['Doctor Id'],
            );
            if (key === 'Doctor Name') {
              list.map(o => o.field).includes('Doctor Name') &&
                list.splice(list.map(o => o.field).indexOf('Doctor Name'), 1);
              list.push({
                field: key,
                value: dockerDetails?.doctorName?.toString(),
              });
            }
            if (key === 'Doctor Mobile Number') {
              list.map(o => o.field).indexOf('Doctor Mobile Number') &&
                list.splice(
                  list.map(o => o.field).indexOf('Doctor Mobile Number'),
                  1,
                );
              list.push({
                field: key,
                value: dockerDetails?.mobileNo?.toString(),
              });
            } else {
              list.push({field: key, value: item[key]?.toString()});
            }
          }
          if (item.Predefined_Panel == 'Y') {
            const corporateCodeDetails = corporateCodeList.find(
              o => o.corporateCode == item['Corporate Code'],
            );
            if (!corporateCodeDetails?.isPredefinedPanel) {
              isError = true;
              errorMsg.push('Predefined panel not enable. ');
            }
            if (key === 'Panel Code') {
              list.splice(list.map(o => o.field).indexOf('Panel Code'), 1);
              const ccPanelList =
                corporateCodeDetails?.panelList?.map(o => o?.panelCode) || [];
              if (ccPanelList.length == 0) {
                isError = true;
                errorMsg.push('Panel list not found. ');
              }
              list.push({
                field: key,
                value: ccPanelList?.join(',')?.toString(),
              });
            }
          } else {
            list.push({field: key, value: item[key]?.toString()});
          }
        });
        if (
          item['Doctor Id'] &&
          !dockerList.some(oe => oe?.doctorCode == item['Doctor Id'])
        ) {
          isError = true;
          errorMsg.push('Doctor Id not found. ');
        }
        if (
          item['Corporate Code'] &&
          !corporateCodeList.some(
            oe => oe?.corporateCode == item['Corporate Code'],
          )
        ) {
          isError = true;
          errorMsg.push('Corporate Code not found. ');
        }
        if (item.RLAB && item.RLAB != loginStore.login.lab) {
          isError = true;
          errorMsg.push('RLAB not found. ');
        }
        if (_.isEmpty(item['Mobile No']?.toString())) {
          isError = true;
          errorMsg.push('Mobile number not found. ');
        }
        if (
          item['Collection Center'] &&
          !collectionCenterList?.some(
            oe => oe?.locationCode == item['Collection Center'],
          )
        ) {
          isError = true;
          errorMsg.push('Collection center not found. ');
        }
        if (item['Collection Center']) {
          list?.push({
            field: 'Ac Class',
            value: collectionCenterList?.find(
              oe => oe?.locationCode == item['Collection Center'],
            )?.acClass,
          });
          list?.push({
            field: 'Collection Center Name',
            value: collectionCenterList?.find(
              oe => oe?.locationCode == item['Collection Center'],
            )?.locationName,
          });
        }
        if (item.Age && item['Age Unit']) {
          list.splice(list.map(o => o.field).indexOf('Birthdate'), 1);
          list.push({
            field: 'Birthdate',
            value: dayjs()
              .add(-item.Age, dateAvailableUnits(item['Age Unit']))
              .format('DD-MM-YYYY'),
          });
        }

        errorMsg = _.uniq(errorMsg);

        // same object keys removes
        list = _.uniqBy(list, function (e: any) {
          return e.field;
        });

        list = list.map(li => {
          if (li.field == 'isError' || li.field == 'select') {
            return {field: li.field, value: item[li.field]};
          } else {
            return {field: li.field, value: item[li.field]?.toString()};
          }
        });

        localFinalOutput.push({
          ...list,
          isError: isError,
          errorMsg: errorMsg?.join(''),
          select: false,
          _id: item?._id,
        });
        isError = false;
        errorMsg = [''];
      });

      let localArrKeys1: any[] = [];
      localFinalOutput.map(function (item1) {
        const localKeys1: any = [];
        for (const [key, value] of Object.entries(item1 as any)) {
          localKeys1.push((value as any)?.field);
        }
        localArrKeys1.push(...localKeys1);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
      localArrKeys1 = _.uniq(localArrKeys1);
      localArrKeys1 = _.remove(localArrKeys1, oe => {
        if (oe == 'elementSequence' || oe == 'undefined' || oe == '_id') {
          return;
        } else {
          return oe;
        }
      });
      setArrKeys(localArrKeys1);
      setFinalOutput(localFinalOutput);
    };

    useEffect(() => {
      const localFinalOutput: any = [];
      const localArrKeys: any = [];
      data?.map(item => {
        const records: any[] = [];
        item.records?.filter((e: any) => {
          if (e?.field && e?.field !== 'undefined') {
            records.push(e);
            localArrKeys.push(e?.field);
          }
        });
        localFinalOutput.push({...item, select: false, records});
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
      loadAsync(localFinalOutput);
      setAllSelected(false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const getSortData = (field: string, type: 'desc' | 'asc') => {
      //const result = finalOutput
      const arrList: any[] = [];
      finalOutput.filter((item, index) => {
        arrList.push({
          ...item,
          [field]: item.records?.find(e => e.field == field)?.value,
          _id: item._id,
          itemIndex: index,
          listIndex: item.records?.findIndex(e => e.field == field),
        });
      });
      const result = _.orderBy(arrList, field, type);
      setFinalOutput(result);
    };

    return (
      <>
        <div className='flex flex-wrap  overflow-scroll'>
          <div className='flex flex-row gap-2 items-center'>
            <span>Filter: </span>
            <span>
              <Form.Toggle
                onChange={status => {
                  if (!status) {
                    setValue({value: '', index: 0});
                    onClearFilter && onClearFilter();
                  }
                  setIsFilter(status);
                }}
              />
            </span>
            <span
              onClick={() => {
                setValue({value: '', index: 0});
                onClearFilter && onClearFilter();
                const ele: any = document.getElementsByName('bordered-radio');
                for (let i = 0; i < ele.length; i++) ele[i].checked = false;
              }}
            >
              <AiOutlineCloseCircle size={24} />
            </span>
          </div>
          <Table striped bordered>
            <thead>
              <tr>
                <th className='bg-white sticky-col left-0 z-50'>
                  <input
                    type='checkbox'
                    className='mt-2'
                    checked={isAllSelected}
                    onChange={e => {
                      const arr = [
                        ...finalOutput.map(o => {
                          return {...o, select: e.target.checked};
                        }),
                      ];
                      setAllSelected(e.target.checked);
                      setFinalOutput(arr);
                    }}
                  />
                </th>
                <th className='sticky-col left-8  bg-gray-500 text-white z-50'>
                  Status
                  {isFilter && (
                    <>
                      <div className='flex items-center bg-white rounded-md justify-center p-1'>
                        <input
                          type='radio'
                          name='bordered-radio'
                          className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300   dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                          onChange={() => {
                            debounce(() => {
                              onFilter &&
                                onFilter({filed: 'isError', value: false});
                            });
                          }}
                        />
                        <IoMdCheckmarkCircle color='green' size={20} />
                      </div>
                      <div className='flex items-center bg-white rounded-md justify-center p-1 my-1'>
                        <input
                          type='radio'
                          name='bordered-radio'
                          className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                          onChange={() => {
                            debounce(() => {
                              onFilter &&
                                onFilter({filed: 'isError', value: true});
                            });
                          }}
                        />
                        <IoIosCloseCircleOutline color='red' size={20} />
                      </div>
                    </>
                  )}
                </th>
                {arrKeys?.map((item, index) => (
                  <th className='text-white p-2'>
                    <div
                      className='flex items-center  justify-between'
                      style={{minWidth: 120}}
                    >
                      <span className=' inline-flex'> {item}</span>
                      <div className='flex gap-1'>
                        <span onClick={() => getSortData(item, 'desc')}>
                          <BsArrowDown size={14} />
                        </span>
                        <span onClick={() => getSortData(item, 'asc')}>
                          <BsArrowUp size={14} />
                        </span>
                      </div>
                    </div>
                    {isFilter && (
                      <div className='flex items-center gap-2'>
                        <Form.Input
                          value={
                            value.index == index ? value?.value?.toString() : ''
                          }
                          key={index}
                          placeholder={item}
                          style={{
                            minWidth: 120,
                            fontSize: 14,
                            color: '#000000',
                          }}
                          onChange={value => {
                            setValue({value, index});
                            debounce(() => {
                              onFilter && onFilter({filed: item, value});
                            });
                          }}
                        />
                      </div>
                    )}
                  </th>
                ))}

                <th className='text-white sticky-col right-0 z-50'>Action</th>
              </tr>
            </thead>
            <tbody>
              {finalOutput?.map((item, itemIndex) => (
                <tr>
                  <td className='items-center bg-white sticky-col left-0 z-50'>
                    <input
                      key={itemIndex}
                      type='checkbox'
                      className='flex '
                      checked={item.select}
                      onChange={e => {
                        const arr = [
                          ...finalOutput.map(o => {
                            if (o._id == item._id) {
                              return {...o, select: e.target.checked};
                            } else {
                              return {...o};
                            }
                          }),
                        ];
                        setFinalOutput(arr);
                      }}
                    />
                  </td>
                  <td className='sticky-col bg-white left-8 z-50'>
                    <>
                      {item?.isError ? (
                        <Tooltip tooltipText={item.errorMsg}>
                          <IoIosCloseCircleOutline color='red' size={20} />
                        </Tooltip>
                      ) : (
                        <IoMdCheckmarkCircle color='green' size={20} />
                      )}{' '}
                    </>
                  </td>
                  {arrKeys?.map((keys, keysIndex) => (
                    <td
                      className='p-2'
                      onDoubleClick={() => {
                        setModalModifyDetails({
                          show: true,
                          keys,
                          itemIndex,
                          keysIndex,
                        });
                      }}
                    >
                      <span>
                        {
                          (
                            Object.values(item)?.find(
                              (e: any) => e?.field == keys,
                            ) as any
                          )?.value
                        }
                      </span>
                    </td>
                  ))}

                  <td className='flex flex-row gap-2 p-1 bg-white sticky-col right-0 z-50'>
                    <Buttons.Button
                      size='small'
                      type='outline'
                      onClick={() => onDelete([item._id])}
                    >
                      <Icons.EvaIcon icon='trash-2-outline' color='#000000' />
                    </Buttons.Button>
                    <Buttons.Button
                      disabled={item.isError ? true : false}
                      size='small'
                      type='solid'
                      onClick={() => onSend([item])}
                    >
                      <Icons.EvaIcon icon='upload-outline' />
                    </Buttons.Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className='flex items-center gap-2 mt-2'>
          {/* <span>Total Records: {totalSize}</span> */}
          <div className='flex gap-2'>
            <Buttons.Button
              size='small'
              type='outline'
              disabled={
                finalOutput.filter(item => {
                  if (item.select == true) return item;
                })?.length > 0
                  ? false
                  : true
              }
              onClick={() => {
                let arrDeleteIds = finalOutput.map(item => {
                  if (item.select) return item._id;
                });
                arrDeleteIds = _.compact(arrDeleteIds);
                if (arrDeleteIds?.length > 0) onDelete(arrDeleteIds);
                else alert('Please select any one record');
              }}
            >
              <Icons.EvaIcon icon='trash-2-outline' color='#000000' />
            </Buttons.Button>

            <Buttons.Button
              size='small'
              type='solid'
              disabled={
                finalOutput.filter(item => {
                  if (item.select == true && item.isError == false) return item;
                })?.length > 0
                  ? false
                  : true
              }
              onClick={() => {
                onSend(
                  finalOutput.filter(item => {
                    if (item.select == true && item.isError == false)
                      return item;
                  }),
                );
              }}
            >
              <Icons.EvaIcon icon='upload-outline' />
            </Buttons.Button>
          </div>
          {/* pagination */}
          <span>
            Showing {totalSize?.page * 10} to{' '}
            {totalSize?.limit + totalSize?.page * 10} of {totalSize?.count}{' '}
            Results
          </span>
          <Icons.IconContext
            color='#fff'
            size='25'
            style={{
              backgroundColor:
                totalSize?.page * 10 <= totalSize?.count
                  ? '#4F46E5'
                  : '#A5A5A5',
              width: 32,
              height: 32,
              borderRadius: 16,
              align: 'center',
              padding: 4,
            }}
            onClick={async () => {
              if (totalSize?.page * 10 <= totalSize?.count)
                onPagination && onPagination('next');
            }}
          >
            <Icons.IconBi.BiSkipNext />
          </Icons.IconContext>
          <Icons.IconContext
            color='#fff'
            size='25'
            style={{
              backgroundColor: totalSize?.page != 0 ? '#4F46E5' : '#A5A5A5',
              width: 32,
              height: 32,
              borderRadius: 16,
              align: 'center',
              padding: 4,
            }}
            onClick={async () => {
              if (totalSize?.page != 0) onPagination && onPagination('prev');
            }}
          >
            <Icons.IconBi.BiSkipPrevious />
          </Icons.IconContext>
          <ModalModifyDetails
            {...modalModifyDetails}
            onClose={() => {
              setModalModifyDetails({
                show: false,
              });
            }}
            onUpdate={(
              value,
              inputFormat,
              keys,
              itemIndex,
              keysIndex,
              isUpdateAll,
            ) => {
              setModalModifyDetails({
                show: false,
              });
              if (!isUpdateAll) {
                finalOutput[itemIndex][keysIndex].value = value;
                // birthday to age and age unit update
                if (inputFormat === 'radio' && keys === 'Birthdate') {
                  if (
                    dayjs(new Date()).diff(
                      dayjs(value, 'DD-MM-YYYY'),
                      'hour',
                    ) <= 0
                  ) {
                    return alert('Please select correct birth date!!');
                  }
                  finalOutput[itemIndex][arrKeys.indexOf('Age')].value =
                    getAgeByAgeObject(getDiffByDate1(value)).age || 0;
                  finalOutput[itemIndex][arrKeys.indexOf('Age Unit')].value =
                    getAgeByAgeObject(getDiffByDate1(value)).ageUnit || 0;
                }
                if (keys === 'Panel Code') {
                  finalOutput[itemIndex][arrKeys.indexOf('Panel Code')].value =
                    value;
                }
                const list: any[] = [];
                finalOutput.map(item => {
                  const record = {};
                  Object.entries(item).map((e: any) => {
                    Object.assign(record, {
                      [e[1]?.field]: e[1]?.value,
                    });
                  });
                  list.push(record);
                });

                const finalList: any = [];
                list.filter(item => {
                  const records: any = [];
                  Object.entries(item).map((e: any) => {
                    records.push({field: e[0], value: e[1]});
                  });
                  finalList.push({records, _id: item?._id});
                });
                loadAsync(finalList);
              } else {
                finalOutput.map((item, index) => {
                  finalOutput[index][keysIndex].value = value;
                  finalOutput[index][arrKeys.indexOf('Age')].value =
                    getAgeByAgeObject(getDiffByDate1(value)).age || 0;
                  finalOutput[index][arrKeys.indexOf('Age Unit')].value =
                    getAgeByAgeObject(getDiffByDate1(value)).ageUnit || 0;
                });
                const list: any[] = [];
                finalOutput.map(item => {
                  const record = {};
                  Object.entries(item).map((e: any) => {
                    Object.assign(record, {
                      [e[1]?.field]: e[1]?.value,
                    });
                  });
                  list.push(record);
                });
                const finalList: any = [];
                list.filter(item => {
                  const records: any = [];
                  Object.entries(item).map((e: any) => {
                    records.push({field: e[0], value: e[1]});
                  });
                  finalList.push({records, _id: item?._id});
                });
                loadAsync(finalList);
              }
            }}
          />
        </div>
      </>
    );
  },
);
