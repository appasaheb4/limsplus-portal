import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import _ from 'lodash';
import { Form, Tooltip, Icons, Buttons, Toast } from '@/library/components';
import { DisplayResult } from './display-result.components';
import { RefRangesExpandList } from './ref-ranges-expand-list.component';
import { FaUserInjured, FaComment, FaCommentAlt } from 'react-icons/fa';
import { PiTestTubeFill, PiStethoscopeBold } from 'react-icons/pi';
import { ImAttachment } from 'react-icons/im';
import { useStores } from '@/stores';
import {
  getResultStatus,
  getTestStatus,
  getAbnFlag,
  getCretical,
} from '../../../utils';
import { tabs } from '../../../screens';
import { ModalConfirm } from 'react-restyle-components';

interface GeneralResultEntryListProps {
  data: any;
  totalSize: number;
  selectedId?: string;
  tabSelected: tabs;
  isView?: boolean;
  isDelete?: boolean;
  isUpdate?: boolean;
  isExport?: boolean;
  onUpdateValue: (item: any, id: string) => void;
  onResultUpdateBatch: (records: any) => void;
  // onSaveFields: (fields: any, id: string, type: string) => void;
  onUpdateFields?: (fields: any, id: string) => void;
  onPageSizeChange?: (page: number, totalSize: number) => void;
  onFinishResult?: (updateRecordIds: Array<string>) => void;
  onFilter?: (
    type: string,
    filter: any,
    page: number,
    totalSize: number,
  ) => void;
  onTabSelected: (type: tabs) => void;
  onFilterFinishResult?: (code: string) => void;
  onTestStatusFilter?: (code: string) => void;
  onExpand?: (items: any) => void;
  onTableReload?: () => void;
  selectedRowData?: any;
}

export const GeneralResultEntryList = (props: GeneralResultEntryListProps) => {
  const { appStore } = useStores();
  const resultRecords = useRef<Array<any>>([]);
  const [refRangeRowId, setRefRangeRowId] = useState<string>('');
  const [selectedRowId, setSelectedRowId] = useState<string>('');
  const [isHide, setIsHide] = useState<boolean>(false);
  const arrFinishRecord = useRef<Array<string>>([]);
  const [reload, setReload] = useState(false);
  const [modalConfirm, setModalConfirm] = useState<any>();

  // eslint-disable-next-line unicorn/no-array-reduce
  const distinctRecords = props?.data?.map(item => {
    return { ...item?.result[0], count: item?.count };
  });

  // useEffect(()=>{
  // },[props?.tabSelected])

  useEffect(() => {
    setIsHide(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data]);

  const statusData = [
    {
      code: 'P',
      value: 'Pending',
      color: 'blue',
      disable: false,
      selected: true,
    },
    // { code: 'RC', value: 'Recheck', color: 'orange', disable: true },
    // { code: 'RT', value: 'Retest', color: 'pink', disable: true },
    {
      code: 'D',
      value: 'Done',
      color: 'green',
      disable: false,
      selected: false,
    },
    // { code: '', value: 'All', color: 'red', disable: false },
  ];

  // const testStatus = [
  //   { code: 'N', value: 'Normal', color: 'blue' },
  //   { code: 'A', value: 'Abnormal', color: 'yellow' },
  //   { code: 'C', value: 'Critical', color: 'green' },
  // ];

  const testStatus: Array<any> = [];
  const handleRowClick = index => {
    // resultRecords.current = props.data[index]?.result;
    console.log({
      data: props.data[index]?.result?.sort((a, b) =>
        (a?.resultOrder || '') > (b?.resultOrder || '') ? 1 : -1,
      ),
    });
    resultRecords.current = props.data[index]?.result?.sort((a, b) =>
      (a?.resultOrder || '') > (b?.resultOrder || '') ? 1 : -1,
    );
    // setExpandedRow(prevState => {
    //   if (prevState.rowIndex === index) {
    //     return { rowIndex: null, data: [] };
    //   }
    //   const filteredData = props.data.filter(
    //     item =>
    //       item.labId === record.labId &&
    //       item.panelCode === record.panelCode &&
    //       item.testCode === record.testCode,
    //   );
    //   return { rowIndex: record._id, data: filteredData };
    // });
  };

  const expandCollapseButton = () => (
    <div className='ml-2'>
      <Buttons.Button
        size='medium'
        type='outline'
        onClick={() => {
          if (props?.tabSelected == 'Pending') {
            setModalConfirm({
              visible: true,
              type: 'confirm',
              title: 'Are you sure?',
              message: 'Do you want to exist without save result?',
              submitTitle: 'Yes',
              closeTitle: 'No',
            });
          } else {
            setIsHide(false);
            resultRecords.current = [];
          }
        }}
      >
        <Tooltip
          tooltipText={
            appStore.applicationSetting?.isExpandScreen
              ? 'Collapse Screen'
              : 'Expand Screen'
          }
        >
          <Icons.IconContext
            color={`${
              appStore.applicationSetting.theme === 'dark'
                ? '#ffffff'
                : '#000000'
            }`}
            size='18'
          >
            {Icons.getIconTag(Icons.IconCg.CgMinimize)}
          </Icons.IconContext>
        </Tooltip>
      </Buttons.Button>
    </div>
  );

  const truncateText = (text: string, maxLength: number) =>
    text?.length > maxLength ? text.slice(0, maxLength) + '...' : text;

  const renderStatusButtons = () => (
    <div className='flex gap-2 items-center'>
      {/* {statusData.map(status => (
        <button
          key={status.code}
          disabled={status.disable}
          className={`bg-${status.color}-600 ml-2 px-3 py-2 focus:outline-none items-center outline shadow-sm font-medium text-center rounded-md text-white disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {status.value}
        </button>
      ))} */}
      <ul className='flex flex-wrap  text-sm font-medium text-center  cursor-pointer gap-1'>
        {statusData.map((item, index) => (
          <li key={index}>
            <div
              className={`inline-flex items-center justify-center p-2 border-b-2 gap-1 ${
                item.value === props?.tabSelected
                  ? 'dark:border-white active border-blue-800 text-blue-800'
                  : 'border-transparent hover:text-[#27A4FE] hover:border-gray-300 '
              }   `}
              onClick={() => {
                props.onTabSelected(item.value as tabs);
                props.onFilterFinishResult &&
                  props.onFilterFinishResult(item.code);
              }}
            >
              <span>{item.value}</span>
            </div>
          </li>
        ))}
      </ul>

      {isHide && expandCollapseButton()}
      <span className='flex  bg-blue-800 w-8 h-8 rounded-full text-white items-center text-center justify-center'>
        {props.data?.length || 0}
      </span>
    </div>
  );

  const renderTestStatusButtons = () => (
    <div className='flex justify-end gap-1'>
      {testStatus?.map(status => (
        <button
          key={status?.code}
          className={`bg-${status?.color}-600 px-3.5 py-2 focus:outline-none items-center outline shadow-sm font-medium text-center rounded-md text-white disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {status?.value}
        </button>
      ))}
    </div>
  );

  const rowStyle = row => {
    switch (row?.colorScheme?.envRangeColor) {
      case 'BOTH':
        return {
          backgroundColor: row?.colorScheme?.cellColor,
          color: row?.colorScheme?.fontColor,
        };
        break;
      case 'BACKGROUND':
        return {
          backgroundColor: row?.colorScheme?.cellColor,
        };
        break;
      case 'FONT':
        return {
          color: row?.colorScheme?.fontColor,
        };
        break;
      default:
        return {};
    }
  };

  const renderResultEnter = () => {
    return (
      <>
        {resultRecords.current?.length > 0 && (
          <div className='relative'>
            <div className='h-full shadow-lg rounded-lg border border-gray-200'>
              <div className='overflow-x-auto'>
                <div
                  style={{
                    display: 'flex',
                    width: '100%',
                  }}
                >
                  {/* Fixed Columns */}
                  <div className='flex flex-none'>
                    <div className='flex flex-col'>
                      <div
                        className='text-white py-1 px-1 rounded-t-lg text-center'
                        style={{
                          width: '250px',
                          backgroundColor: '#6A727F',
                          borderRadius: '0',
                        }}
                      >
                        Analyte Code - Name
                      </div>
                      {resultRecords.current?.map((record, subIndex) => (
                        <div
                          key={subIndex}
                          className='text-center text-sm cursor-pointer'
                          style={{
                            width: '250px',
                            padding: '5px',
                            height: '47px',
                            ...rowStyle(record),
                          }}
                          // style={rowStyle(record)}
                        >
                          <span
                            title={`${record.analyteCode} - ${record.analyteName}`}
                          >
                            {truncateText(
                              `${record.analyteCode} - ${record.analyteName}`,
                              30,
                            )}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className='flex flex-col'>
                      <div
                        className='text-white py-1 px-1 rounded-t-lg text-center'
                        style={{
                          width: '150px',
                          backgroundColor: '#6A727F',
                          borderRadius: '0',
                        }}
                      >
                        Reportable
                      </div>
                      {resultRecords.current?.map((record, subIndex) => (
                        <div
                          key={subIndex}
                          className='text-center  text-sm cursor-pointer'
                          style={{
                            width: '150px',
                            padding: '5px',
                            height: '47px',
                            ...rowStyle(record),
                          }}
                        >
                          <Form.Toggle
                            value={record.reportable}
                            onChange={reportable => {
                              resultRecords.current =
                                resultRecords.current?.map(item => {
                                  if (item._id == record?._id) {
                                    return {
                                      ...item,
                                      reportable,
                                    };
                                  }
                                  return item;
                                });
                            }}
                          />
                        </div>
                      ))}
                    </div>

                    <div className='flex flex-col'>
                      <div
                        className='text-white py-1 px-1 rounded-t-lg text-center'
                        style={{
                          width: '150px',
                          backgroundColor: '#6A727F',
                          borderRadius: '0',
                        }}
                      >
                        Result
                      </div>
                      {resultRecords.current?.map((record, subIndex) => (
                        <div
                          key={subIndex}
                          className='text-center  text-sm cursor-pointer'
                          style={{
                            width: '150px',
                            padding: '5px',
                            height: '47px',
                            ...rowStyle(record),
                          }}
                        >
                          <span title={record.result}>
                            {record?.isResultEditor ? (
                              <DisplayResult
                                row={record}
                                rowIndex={subIndex}
                                rowData={props.data}
                                onSelect={result => {
                                  resultRecords.current =
                                    resultRecords.current?.map(item => {
                                      if (item._id == record?._id) {
                                        return {
                                          ...item,
                                          result,
                                        };
                                      }
                                      return item;
                                    });
                                }}
                              />
                            ) : (
                              <span
                                className='flex'
                                style={{ fontWeight: 'bold' }}
                              >
                                {record.result}
                              </span>
                            )}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className='flex flex-col'>
                      <div
                        className='text-white py-1 px-1 rounded-t-lg text-center'
                        style={{
                          width: '150px',
                          backgroundColor: '#6A727F',
                          borderRadius: '0',
                        }}
                      >
                        Conclusion
                      </div>
                      {resultRecords.current?.map((record, subIndex) => (
                        <div
                          key={subIndex}
                          className=' text-center  text-sm cursor-pointer'
                          style={{
                            width: '150px',
                            padding: '5px',
                            height: '47px',
                            ...rowStyle(record),
                          }}
                        >
                          <div className='flex items-center justify-end flex-col bg-white relative'>
                            <Tooltip
                              tooltipText={
                                record._id !== selectedRowId
                                  ? 'Expand'
                                  : 'Collapse'
                              }
                            >
                              <Icons.IconContext
                                color='#000000'
                                size='20'
                                onClick={() =>
                                  setSelectedRowId(
                                    record._id === selectedRowId
                                      ? ''
                                      : record._id,
                                  )
                                }
                              >
                                {Icons.getIconTag(
                                  record._id !== selectedRowId
                                    ? Icons.IconBi.BiExpand
                                    : Icons.IconBi.BiCollapse,
                                )}
                              </Icons.IconContext>
                            </Tooltip>

                            {record._id === selectedRowId && (
                              <div>
                                <Form.MultilineInput
                                  rows={3}
                                  placeholder='Conclusion'
                                  className='text-black'
                                  defaultValue={record?.conclusion}
                                  onBlur={conclusion => {
                                    resultRecords.current =
                                      resultRecords.current?.map(item => {
                                        if (item._id == record?._id) {
                                          return {
                                            ...item,
                                            conclusion,
                                          };
                                        }
                                        return item;
                                      });
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Scrollable Columns */}
                  <div className='flex-1 overflow-x-auto'>
                    <div className='flex'>
                      <div
                        className='flex-none text-center'
                        style={{
                          color: 'white',
                          fontSize: '14px',
                          padding: '4px',
                          width: '150px',
                          backgroundColor: 'rgb(106, 114, 127)',
                        }}
                      >
                        Units
                      </div>

                      <div
                        className='flex-none text-center'
                        style={{
                          color: 'white',
                          fontSize: '14px',
                          padding: '4px',
                          width: refRangeRowId ? '550px' : '250px',
                          backgroundColor: 'rgb(106, 114, 127)',
                        }}
                      >
                        Range
                      </div>

                      <div
                        className='flex-none text-center'
                        style={{
                          color: 'white',
                          fontSize: '14px',
                          padding: '4px',
                          width: '121px',
                          backgroundColor: 'rgb(106, 114, 127)',
                        }}
                      >
                        Abnormal
                      </div>

                      <div
                        className='flex-none text-center'
                        style={{
                          color: 'white',
                          fontSize: '14px',
                          padding: '4px',
                          width: '150px',
                          backgroundColor: 'rgb(106, 114, 127)',
                        }}
                      >
                        Critical
                      </div>

                      <div
                        className='flex-none text-center'
                        style={{
                          color: 'white',
                          fontSize: '14px',
                          padding: '4px',
                          width: '150px',
                          backgroundColor: 'rgb(106, 114, 127)',
                        }}
                      >
                        Calculation Flag
                      </div>

                      <div
                        className='flex-none text-center'
                        style={{
                          color: 'white',
                          fontSize: '14px',
                          padding: '4px',
                          width: '150px',
                          backgroundColor: 'rgb(106, 114, 127)',
                        }}
                      >
                        Show Ranges
                      </div>

                      <div
                        className='flex-none text-center'
                        style={{
                          color: 'white',
                          fontSize: '14px',
                          padding: '4px',
                          width: '150px',
                          backgroundColor: 'rgb(106, 114, 127)',
                        }}
                      >
                        Result Status
                      </div>

                      <div
                        className='flex-none text-center'
                        style={{
                          color: 'white',
                          fontSize: '14px',
                          padding: '4px',
                          width: '150px',
                          backgroundColor: 'rgb(106, 114, 127)',
                        }}
                      >
                        Result Type
                      </div>
                    </div>

                    {resultRecords.current?.map((record, subIndex) => (
                      <div
                        key={subIndex}
                        className='flex'
                        style={{ ...rowStyle(record) }}
                      >
                        <div
                          className='flex-none text-center '
                          style={{ width: '150px' }}
                        >
                          <span title={record.units}>
                            {truncateText(record.units, 10)}
                          </span>
                        </div>
                        <div
                          className='flex-none text-center'
                          style={{ width: refRangeRowId ? '550px' : '220px' }}
                        >
                          <div className='flex items-center justify-center gap-2'>
                            <span title={record.units}>
                              {_.isNaN(Number.parseFloat(record.loNor)) &&
                              _.isNaN(Number.parseFloat(record.hiNor))
                                ? '-'
                                : _.isNaN(Number.parseFloat(record.loNor))
                                ? `${record.hiNor} - >`
                                : _.isNaN(Number.parseFloat(record.hiNor))
                                ? `< - ${record.loNor}`
                                : `${record.loNor} - ${record.hiNor}`}
                            </span>
                            <div className='h-[47px]'>
                              {record.refRangesList?.length > 0 && (
                                <Tooltip
                                  tooltipText={
                                    record._id !== refRangeRowId
                                      ? 'Expand Reference Range'
                                      : 'Collapse Reference Range'
                                  }
                                >
                                  <Icons.IconContext
                                    color='#000000'
                                    size='20'
                                    onClick={() =>
                                      setRefRangeRowId(
                                        record._id === refRangeRowId
                                          ? ''
                                          : record._id,
                                      )
                                    }
                                  >
                                    {Icons.getIconTag(
                                      record._id !== refRangeRowId
                                        ? Icons.IconBi.BiExpand
                                        : Icons.IconBi.BiCollapse,
                                    )}
                                  </Icons.IconContext>
                                </Tooltip>
                              )}
                            </div>
                          </div>
                          {refRangeRowId === record._id && (
                            <div>
                              <RefRangesExpandList
                                id='_id'
                                data={record?.refRangesList || []}
                                totalSize={record?.refRangesList?.length || 0}
                                columns={[
                                  {
                                    dataField: 'result',
                                    text: 'Result',
                                    editable: false,
                                  },
                                  {
                                    dataField: 'rangeType',
                                    text: 'Range Type',
                                  },
                                  { dataField: 'low', text: 'Low' },
                                  { dataField: 'high', text: 'High' },
                                  {
                                    dataField: 'rangeSetOn',
                                    text: 'Range Set On',
                                  },
                                  { dataField: 'rangeId', text: 'Range Id' },
                                  {
                                    dataField: 'version',
                                    text: 'Range Version',
                                  },
                                ]}
                              />
                            </div>
                          )}
                        </div>

                        <div
                          className='flex-none text-center '
                          style={{ width: '150px' }}
                        >
                          <Form.Toggle
                            disabled={true}
                            style={{ textAlign: 'center' }}
                            value={record.critical ? true : record.abnFlag}
                          />
                        </div>
                        <div
                          className='flex-none text-center '
                          style={{ width: '150px' }}
                        >
                          <Form.Toggle
                            disabled={true}
                            value={record.critical}
                          />
                        </div>
                        <div
                          className='flex-none text-center '
                          style={{ width: '150px' }}
                        >
                          <Form.Toggle
                            disabled
                            value={record.calculationFlag}
                          />
                        </div>
                        <div
                          className='flex-none text-center '
                          style={{ width: '150px' }}
                        >
                          <Form.Toggle
                            value={record.showRanges}
                            onChange={showRanges => {
                              resultRecords.current =
                                resultRecords.current?.map(item => {
                                  if (item._id == record?._id) {
                                    return {
                                      ...item,
                                      showRanges,
                                    };
                                  }
                                  return item;
                                });
                            }}
                          />
                        </div>
                        <div
                          className='flex-none text-center '
                          style={{ width: '150px' }}
                        >
                          <span title={record.resultStatus}>
                            {truncateText(record.resultStatus, 10)}
                          </span>
                        </div>
                        <div
                          className='flex-none text-center'
                          style={{ width: '150px' }}
                        >
                          {record.resultType}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className='flex justify-start gap-2 mt-1'>
                <button
                  className='py-2 mt-1 w-24 focus:outline-none bg-blue-600 items-center outline shadow-sm font-medium text-center rounded-md text-white disabled:opacity-50 disabled:cursor-not-allowed'
                  // disabled={
                  //   resultRecords.current
                  //     ?.map(item => {
                  //       if (item?.result && !_.isEmpty(item.result))
                  //         return true;
                  //       else false;
                  //     })
                  //     ?.filter(item => !item)?.length == 0
                  //     ? false
                  //     : true
                  // }
                  onClick={() => {
                    if (
                      resultRecords.current &&
                      resultRecords.current
                        ?.map(item => {
                          if (item?.result && !_.isEmpty(item.result))
                            return true;
                          else false;
                        })
                        ?.filter(item => !item)?.length == 0
                    ) {
                      const records = resultRecords.current?.map(item => {
                        return {
                          ...item,
                          resultStatus: getResultStatus(item.resultType, item),
                          testStatus: getTestStatus(item.resultType, item),
                          abnFlag: getAbnFlag(item.resultType, item),
                          critical: getCretical(item.resultType, item),
                          updateField: 'result',
                          updateType: 'directSave',
                          result: undefined,
                          ...item?.result,
                          resultDate: new Date(),
                          flagUpdate: undefined,
                          testReportOrder: undefined,
                          analyteReportOrder: undefined,
                          selectedId: undefined,
                        };
                      });
                      props.onResultUpdateBatch(records);
                      setIsHide(false);
                      resultRecords.current = [];
                    } else {
                      Toast.error({
                        message: 'Please enter all result.',
                      });
                    }
                  }}
                >
                  Save
                </button>
                <div
                  className='flex w-100 p-2 flex-row justify-center gap-4 items-center'
                  style={{ backgroundColor: '#6A727F' }}
                >
                  <Tooltip tooltipText={'Doctor'}>
                    <PiStethoscopeBold color='#ffffff' size={'30'} />
                  </Tooltip>
                  <Tooltip tooltipText={'Patient'}>
                    <FaUserInjured color='#ffffff' size={'30'} />
                  </Tooltip>
                  <Tooltip tooltipText={'Sample Information'}>
                    <PiTestTubeFill color='#ffffff' size={'30'} />
                  </Tooltip>
                  <Tooltip tooltipText={'Attachment'}>
                    <ImAttachment color='#ffffff' size={'30'} />
                  </Tooltip>
                  <Tooltip tooltipText={'Internal Comment'}>
                    <FaComment color='#ffffff' size={'30'} />
                  </Tooltip>
                  <Tooltip tooltipText={'External Comment'}>
                    <FaCommentAlt color='#ffffff' size={'30'} />
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  const renderDataRows = () => {
    return (
      <>
        <div
          className={`sticky top-0  text-white border-white ${
            isHide ? 'hidden' : 'shown'
          } bg-[#6A727F]`}
        >
          <div
            className={`flex justify-around items-center py-2 ${
              props.tabSelected == 'Done' ? 'ml-4' : 'ml-0'
            }`}
          >
            <div className='flex text-center' style={{ width: '250px' }}>
              Test Code - Name
            </div>
            <div className='flex text-center' style={{ width: '150px' }}>
              Department
            </div>
            <div className='flex text-center' style={{ width: '50px' }}>
              Lab ID
            </div>
            <div className='flex text-center' style={{ width: '100px' }}>
              Sample ID
            </div>
            <div className='flex text-center' style={{ width: '50px' }}>
              Test S.
            </div>
            <div className='flex text-center' style={{ width: '220px' }}>
              Patient Name
            </div>
            <div className='flex text-center' style={{ width: '100px' }}>
              Lab
            </div>
            <div className='flex text-center' style={{ width: '100px' }}>
              Due Date
            </div>
            <div className='flex text-center' style={{ width: '100px' }}>
              Result Date
            </div>
          </div>

          {distinctRecords?.map((record, index) => (
            <div
              className={`flex ${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
              } cursor-pointer ${isHide ? 'hidden' : 'shown'}`}
              key={record._id}
            >
              {props.tabSelected == 'Done' && (
                <div className='flex bg-[#6A727F] w-6 p-1 items-center justify-center'>
                  <input
                    className='flex w-6 h-6'
                    type='checkbox'
                    checked={arrFinishRecord.current?.includes(record?._id)}
                    onClick={() => {
                      const ids: Array<string> = props.data[index].result?.map(
                        item => item?._id,
                      );
                      //remove exists id
                      if (arrFinishRecord.current?.includes(record?._id)) {
                        const finalArr: any = arrFinishRecord.current
                          ?.map(item => {
                            console.log({ item });
                            if (ids.includes(item)) return;
                            return item;
                          })
                          ?.filter(item => item);
                        arrFinishRecord.current = finalArr;
                      } else {
                        if (arrFinishRecord.current?.length > 0) {
                          arrFinishRecord.current =
                            arrFinishRecord.current.concat(ids);
                        } else {
                          arrFinishRecord.current = ids;
                        }
                      }
                      setReload(!reload);
                    }}
                  />
                </div>
              )}
              <div
                className='flex w-full justify-around items-center py-2  border-b text-sm'
                onClick={() => {
                  setIsHide(true);
                  handleRowClick(index);
                }}
              >
                <div
                  className='flex  text-center text-gray-700 gap-2 items-center -ml-2'
                  style={{ width: '250px' }}
                >
                  <span className='flex bg-blue-800 w-6 h-6 rounded-full text-white items-center text-center justify-center'>
                    {record?.count}
                  </span>
                  <span title={`${record.testCode} - ${record.testName}`}>
                    {truncateText(
                      `${record.testCode} - ${record.testName}`,
                      22,
                    )}
                  </span>
                </div>

                <div
                  className='flex text-center text-gray-700'
                  style={{ width: '150px' }}
                >
                  <span title={record.departmentName}>
                    {truncateText(record.departmentName, 20)}
                  </span>
                </div>
                <div
                  className='flex text-center text-gray-700'
                  style={{ width: '50px' }}
                >
                  <span title={record.labId}>
                    {truncateText(record.labId, 10)}
                  </span>
                </div>
                <div
                  className='flex text-center text-gray-700'
                  style={{ width: '100px' }}
                >
                  <span title={record.sampleId}>
                    {truncateText(record.sampleId, 10)}
                  </span>
                </div>
                <div
                  className='flex text-center text-gray-700'
                  style={{ width: '50px' }}
                >
                  <span title={record?.testStatus}>
                    {truncateText(record?.testStatus, 10)}
                  </span>
                </div>
                <div
                  className='flex text-center text-gray-700'
                  style={{ width: '220px' }}
                >
                  <span title={record.name}>
                    {truncateText(record.name, 30)}
                  </span>
                </div>
                <div
                  className='flex text-center text-gray-700'
                  style={{ width: '100px' }}
                >
                  <span title={record.pLab}>
                    {truncateText(record.pLab, 10)}
                  </span>
                </div>
                <div
                  className='flex text-center text-gray-700'
                  style={{ width: '100px' }}
                >
                  <span title={record.dueDate}>
                    {truncateText(record.dueDate, 10)}
                  </span>
                </div>
                <div
                  className='flex text-center text-gray-700'
                  style={{ width: '100px' }}
                >
                  <span title={record.resultDate}>
                    {truncateText(
                      record.resultDate &&
                        dayjs(record.resultDate).format('YYYY-MM-DD HH:mm:ss'),
                      10,
                    )}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {props.tabSelected == 'Done' && (
            <div className='flex p-2'>
              <button
                className='bg-blue-800 rounded-md p-2  disabled:opacity-50'
                disabled={arrFinishRecord.current?.length > 0 ? false : true}
                onClick={() => {
                  if (arrFinishRecord.current?.length > 0) {
                    props.onFinishResult &&
                      props.onFinishResult(arrFinishRecord.current);
                    props.onTabSelected('Pending');
                  } else {
                    Toast.error({
                      message: 'Please select any one record',
                    });
                  }
                }}
              >
                Submit
              </button>
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <div className={`${props.isView ? 'shown' : 'hidden'} `}>
      <div className='flex flex-row flex-wrap justify-between mb-2'>
        {renderStatusButtons()}
        {renderTestStatusButtons()}
      </div>
      <div className='flex flex-col max-h-[calc(100vh_-_10vh)] overflow-y-auto'>
        {renderDataRows()}
        <div className='relative z-0'>{renderResultEnter()}</div>
      </div>
      <ModalConfirm
        {...modalConfirm}
        onClick={() => {
          setIsHide(false);
          resultRecords.current = [];
          setModalConfirm({ visible: false });
        }}
        onClose={() => {
          setModalConfirm({ visible: false });
        }}
      />
    </div>
  );
};
