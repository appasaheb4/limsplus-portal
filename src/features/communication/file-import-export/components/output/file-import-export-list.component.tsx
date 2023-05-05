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
interface FileImportExportListProps {
  data: any;
  totalSize: any;
  onSend: (record: any) => void;
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
    const [value, setValue] = useState({value: '', index: 0});
    const [isFilter, setIsFilter] = useState(false);
    const [finalOutput, setFinalOutput] = useState<any>([]);
    const [arrKeys, setArrKeys] = useState<Array<string>>([]);
    const [isAllSelected, setAllSelected] = useState(false);

    useEffect(() => {
      const localFinalOutput: any = [];
      let localArrKeys: any = [];
      data?.map(item => {
        const list: any[] = [];
        item.records?.filter((e: any) => {
          if (e?.field && e?.field !== 'undefined') {
            list.push(e);
            localArrKeys.push(e?.field);
          }
        });
        localFinalOutput.push({...item, select: false, list});
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
      localArrKeys = _.uniq(localArrKeys);
      setFinalOutput(localFinalOutput);
      setArrKeys(localArrKeys);
      setAllSelected(false);
    }, [data]);

    const getFields = (input, field) => {
      const output: any[] = [];
      for (let i = 0; i < input.length; ++i) output.push(input[i][field]);
      return output;
    };

    const getSortData = (field: string, type: 'desc' | 'asc') => {
      //const result = finalOutput
      const arrList: any[] = [];
      finalOutput.filter((item, index) => {
        arrList.push({
          ...item,
          [field]: item.list?.find(e => e.field == field)?.value,
          _id: item._id,
          itemIndex: index,
          listIndex: item.list?.findIndex(e => e.field == field),
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
                <th className='sticky-col left-5  bg-gray-500 text-white z-50'>
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
              {finalOutput?.map((item, index) => (
                <tr>
                  <td className='items-center bg-white sticky-col left-0 z-50'>
                    <input
                      key={index}
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
                  <td className='sticky-col bg-white left-5 z-50'>
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
                    <td>
                      <span>
                        {item.list?.find(item => item?.field == keys)?.value}
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
                      size='small'
                      type='solid'
                      onClick={() => onSend(item)}
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
              onClick={() => onSend([])}
            >
              <Icons.EvaIcon icon='upload-outline' />
            </Buttons.Button>
          </div>
          <span>
            Showing {totalSize?.page * 10} to{' '}
            {totalSize?.limit + totalSize?.page * 10} of {totalSize?.count}{' '}
            Results
          </span>
          <Icons.IconContext
            color='#fff'
            size='25'
            style={{
              backgroundColor: '#808080',
              width: 32,
              height: 32,
              borderRadius: 16,
              align: 'center',
              padding: 4,
            }}
            onClick={async () => {
              onPagination && onPagination('next');
            }}
          >
            <Icons.IconBi.BiSkipNext />
          </Icons.IconContext>
          <Icons.IconContext
            color='#fff'
            size='25'
            style={{
              backgroundColor: '#808080',
              width: 32,
              height: 32,
              borderRadius: 16,
              align: 'center',
              padding: 4,
            }}
            onClick={async () => {
              onPagination && onPagination('prev');
            }}
          >
            <Icons.IconBi.BiSkipPrevious />
          </Icons.IconContext>
        </div>
      </>
    );
  },
);
