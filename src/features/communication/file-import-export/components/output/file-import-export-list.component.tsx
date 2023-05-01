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
      console.log({data});

      data?.map(item => {
        const list: any[] = [];
        Object.entries(item.records)?.filter((e: any) => {
          if (e[1]?.field && e[1]?.field !== 'undefined') {
            list.push(e[1]);
            localArrKeys.push(e[1]?.field);
          }
        });
        localFinalOutput.push({_id: item._id, select: false, list});
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
      localArrKeys = _.uniq(localArrKeys);
      setFinalOutput(localFinalOutput);
      setArrKeys(localArrKeys);
      setAllSelected(false);
    }, [data]);

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
              }}
            >
              <AiOutlineCloseCircle size={24} />
            </span>
          </div>
          <Table striped bordered>
            <thead>
              <tr>
                <th className='bg-white'>
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
                <th className='text-white'>Status</th>
                {arrKeys?.map((item, index) => (
                  <th className='text-white p-2'>
                    <div
                      className='flex items-center  justify-between'
                      style={{minWidth: 120}}
                    >
                      <span className=' inline-flex'> {item}</span>
                      <div className='flex gap-1'>
                        <span>
                          <BsArrowDown size={14} />
                        </span>
                        <span>
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

                <th className='text-white'>Action</th>
              </tr>
            </thead>
            <tbody>
              {finalOutput?.map((item, index) => (
                <tr>
                  <th className='items-center bg-white'>
                    <input
                      key={index}
                      type='checkbox'
                      className='flex mt-3'
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
                  </th>
                  <td>
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

                  <td className='flex flex-row gap-2 p-1'>
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
