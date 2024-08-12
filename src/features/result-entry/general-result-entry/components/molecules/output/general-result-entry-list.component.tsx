/* eslint-disable no-case-declarations */
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import _, { isNaN } from 'lodash';
import {
  Form,
  Buttons,
  Tooltip,
  Icons,
  textFilter,
} from '@/library/components';
import { DisplayResult } from './display-result.components';

import { GeneralResultEntryExpand } from './general-result-entry-expand.component';
import { InputResult } from './input-result.components';
import {
  getResultStatus,
  getTestStatus,
  getAbnFlag,
  getCretical,
} from '../../../utils';
import {
  FaInfoCircle,
  FaChartLine,
  FaList,
  FaImage,
  FaTable,
  FaShareAlt,
} from 'react-icons/fa';
import { RefRangesExpandList } from './ref-ranges-expand-list.component';
import { stores, useStores } from '@/stores';
import { useStore } from 'react-redux';

interface GeneralResultEntryListProps {
  data: any;
  totalSize: number;
  selectedId?: string;
  isView?: boolean;
  isDelete?: boolean;
  isUpdate?: boolean;
  isExport?: boolean;
  onUpdateValue: (item: any, id: string) => void;
  onSaveFields: (fileds: any, id: string, type: string) => void;
  onUpdateFields?: (fields: any, id: string) => void;
  onPageSizeChange?: (page: number, totalSize: number) => void;
  onFinishResult?: (updateRecordIds: Array<string>) => void;
  onFilter?: (
    type: string,
    filter: any,
    page: number,
    totalSize: number,
  ) => void;
  onFilterFinishResult?: (code: string) => void;
  onTestStatusFilter?: (code: string) => void;
  onExpand?: (items: any) => void;
  onTableReload?: () => void;
  selectedRowData?: any;
}

export const GeneralResultEntryList = (props: GeneralResultEntryListProps) => {
  const [modalDetail, setModalDetail] = useState<any>();
  const [selectedRowId, setSelectedRowId] = useState('');
  const [refRangeRowId, setRefRangleRowId] = useState('');

  const statusData = [
    { code: 'P', value: 'Pending', color: 'blue', disable: false },
    { code: 'RC', value: 'Recheck', color: 'orange', disable: true },
    { code: 'RT', value: 'Retest', color: 'pink', disable: true },
    { code: 'D', value: 'Done', color: 'green', disable: false },
    { code: '', value: 'All', color: 'red', disable: false },
  ];

  const testStatus = [
    { code: 'N', value: 'Normal', color: 'blue' },
    { code: 'A', value: 'Abnormal', color: 'yellow' },
    { code: 'C', value: 'Critical', color: 'green' },
    // { code: '', value: 'All', color: 'red' },
  ];

  const handleRowClick = (record, index) => {
    const matchingRecords = props?.data?.filter(
      item => item.testName === record.testName,
    );
    setModalDetail({
      rowIndex: index,
      isVisible: !modalDetail?.isVisible,
      data: matchingRecords,
    });
  };

  // Remove duplicates and filter out the unwanted keys
  // eslint-disable-next-line unicorn/no-array-reduce
  const distinctRecords = props?.data?.reduce((acc, current) => {
    const x = acc.find(item => item.testName === current.testName);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  function truncateText(text, maxLength) {
    return text?.length > maxLength ? text?.slice(0, maxLength) + '...' : text;
  }

  const ActionBar = () => {
    return (
      <div className='flex flex-col items-center space-y-2 p-2 bg-gray-100 rounded-full absolute right-4 top-10 z-100'>
        <button className='w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-200'>
          <FaInfoCircle className='text-gray-600' size={24} />
        </button>
        <button className='w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-200'>
          <FaChartLine className='text-gray-600' size={24} />
        </button>
        <button className='w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-200'>
          <FaList className='text-gray-600' size={24} />
        </button>
        <button className='w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-200'>
          <FaImage className='text-gray-600' size={24} />
        </button>
        <button className='w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-200'>
          <FaTable className='text-gray-600' size={24} />
        </button>
        <button className='w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-200'>
          <FaShareAlt className='text-gray-600' size={24} />
        </button>
      </div>
    );
  };

  return (
    <>
      <div className={`${props.isView ? 'shown' : 'hidden'} `}>
        <div className='flex flex-row flex-wrap justify-between mb-2'>
          <div className='flex flex-wrap gap-0'>
            {statusData.map(status => (
              <button
                key={status.code}
                disabled={status.disable}
                className={`bg-${status.color}-600 ml-2 px-3.5 py-2 focus:outline-none items-center outline shadow-sm font-medium text-center rounded-md  text-white disabled:opacity-50 disabled:cursor-not-allowed`}
                // onClick={() => {
                //   setFilterStatus(status.code);
                //   onFilterFinishResult && onFilterFinishResult(status.code);
                // }}
              >
                {status.value}
              </button>
            ))}
          </div>
          <div className='flex justify-end gap-1'>
            {testStatus.map(status => (
              <button
                key={status.code}
                className={`bg-${status.color}-600 px-3.5 py-2 focus:outline-none  items-center  outline shadow-sm  font-medium  text-center rounded-md  text-white disabled:opacity-50 disabled:cursor-not-allowed`}
                // onClick={() => {
                //   setFilterStatus(status.code);
                //   onTestStatusFilter?.(status.code);
                // }}
              >
                {status.value}
              </button>
            ))}
          </div>
        </div>

        <div className='h-[calc(100vh_-_50vh)] bg-gray-100'>
          <div className=' h-full shadow-lg rounded-lg border border-gray-200'>
            {/* Header Row */}
            <div className='overflow-y-auto'>
              <div className=' max-h-[800px]'>
                <div className='flex justify-between bg-gray-600 text-white py-2 px-2 rounded-t-lg'>
                  <div
                    className='flex-none text-center sticky top-10 z-100 '
                    style={{ width: '250px' }}
                  >
                    Test Code - Name
                  </div>
                  <div
                    className='flex-none text-center sticky top-0 z-100'
                    style={{ width: '150px' }}
                  >
                    Department
                  </div>
                  <div
                    className='flex-none text-center sticky top-0 z-100'
                    style={{ width: '100px' }}
                  >
                    Lab ID
                  </div>
                  <div
                    className='flex-none text-center sticky top-0 z-100'
                    style={{ width: '80px' }}
                  >
                    Test Status
                  </div>
                  <div
                    className='flex-none text-center sticky top-0 z-100'
                    style={{ width: '100px' }}
                  >
                    Result Status
                  </div>
                  <div
                    className='flex-none text-center sticky top-0 z-100'
                    style={{ width: '80px' }}
                  >
                    Sample ID
                  </div>
                  <div
                    className='flex-none text-center sticky top-0 z-100'
                    style={{ width: '150px' }}
                  >
                    Patient Name
                  </div>
                  <div
                    className='flex-none text-center sticky top-0 z-100'
                    style={{ width: '100px' }}
                  >
                    Lab
                  </div>

                  <div
                    className='flex-none text-center sticky top-0 z-100'
                    style={{ width: '100px' }}
                  >
                    Due Date
                  </div>
                  <div
                    className='flex-none text-center sticky top-0 z-100'
                    style={{ width: '100px' }}
                  >
                    Result Date
                  </div>
                  <div
                    className='flex-none text-center sticky top-0 z-100'
                    style={{ width: '150px' }}
                  >
                    Environment
                  </div>
                </div>

                {/* Data Rows */}
                <div className='overflow-y-scroll h-[500px]'>
                  {distinctRecords.map((record, index) => (
                    <>
                      <div
                        key={index}
                        className={`flex justify-between items-center py-2 px-2 border-b text-sm ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                        } cursor-pointer`}
                        onClick={() => handleRowClick(record, index)}
                      >
                        <div
                          className='flex-none text-center text-gray-700'
                          style={{ width: '250px' }}
                        >
                          <span
                            title={`${record.testCode} - ${record.testName}`}
                          >
                            {truncateText(
                              `${record.testCode} - ${record.testName}`,
                              30,
                            )}
                          </span>
                        </div>
                        <div
                          className='flex-none text-center text-gray-700'
                          style={{ width: '150px' }}
                        >
                          <span title={record.departmentName}>
                            {truncateText(record.departmentName, 20)}
                          </span>
                        </div>
                        <div
                          className='flex-none text-center text-gray-700'
                          style={{ width: '100px' }}
                        >
                          <span title={record.labId}>
                            {truncateText(record.labId, 10)}
                          </span>
                        </div>
                        <div
                          className='flex-none text-center text-gray-700'
                          style={{ width: '80px' }}
                        >
                          <span title={record.testStatus}>
                            {truncateText(record.testStatus, 10)}
                          </span>
                        </div>
                        <div
                          className='flex-none text-center text-gray-700'
                          style={{ width: '100px' }}
                        >
                          <span title={record.resultStatus}>
                            {truncateText(record.resultStatus, 10)}
                          </span>
                        </div>
                        <div
                          className='flex-none text-center text-gray-700'
                          style={{ width: '80px' }}
                        >
                          <span title={record.sampleId}>
                            {truncateText(record.sampleId, 10)}
                          </span>
                        </div>
                        <div
                          className='flex-none text-center text-gray-700'
                          style={{ width: '150px' }}
                        >
                          <span title={record.name}>
                            {truncateText(record.name, 20)}
                          </span>
                        </div>
                        <div
                          className='flex-none text-center text-gray-700'
                          style={{ width: '100px' }}
                        >
                          <span title={record.pLab}>
                            {truncateText(record.pLab, 10)}
                          </span>
                        </div>

                        <div
                          className='flex-none text-center text-gray-700'
                          style={{ width: '100px' }}
                        >
                          <span title={record.dueDate}>
                            {truncateText(record.dueDate, 10)}
                          </span>
                        </div>
                        <div
                          className='flex-none text-center text-gray-700'
                          style={{ width: '100px' }}
                        >
                          <span title={record.resultDate}>
                            {truncateText(
                              record.resultDate &&
                                dayjs(record.resultDate).format(
                                  'YYYY-MM-DD HH:mm:ss',
                                ),
                              10,
                            )}
                          </span>
                        </div>
                        <div
                          className='flex-none text-center text-gray-700  border-gray-200'
                          style={{ width: '150px' }}
                        >
                          <span title={record.environment}>
                            {truncateText(record.environment, 10)}
                          </span>
                        </div>
                      </div>

                      {modalDetail?.isVisible &&
                        modalDetail?.rowIndex === index && (
                          <>
                            <div className='bg-gray-100 relative'>
                              <div className='overflow-auto h-full shadow-lg rounded-lg border border-gray-200'>
                                {/* Scrollable Container for Header and Data */}
                                <div className='overflow-x-auto'>
                                  {/* Header Row */}
                                  <div>
                                    <div className='flex bg-gray-600 text-white py-2 px-2 rounded-t-lg sticky top-0 z-10'>
                                      <div
                                        className='flex-none text-center sticky top-0 z-100'
                                        style={{ width: '250px' }}
                                      >
                                        Analyte Code - Name
                                      </div>
                                      <div
                                        className='flex-none text-center sticky top-0 z-100'
                                        style={{ width: '100px' }}
                                      >
                                        Reportable
                                      </div>
                                      <div
                                        className='flex-none text-center sticky top-0 z-100'
                                        style={{ width: '100px' }}
                                      >
                                        Result Type
                                      </div>
                                      <div
                                        className='flex-none text-center sticky top-0 z-100'
                                        style={{ width: '150px' }}
                                      >
                                        Result
                                      </div>
                                      <div
                                        className='flex-none text-center sticky top-0 z-100'
                                        style={{ width: '100px' }}
                                      >
                                        Units
                                      </div>
                                      <div
                                        className='flex-none text-center sticky top-0 z-100'
                                        style={{
                                          width: refRangeRowId
                                            ? '550px'
                                            : '250px',
                                        }}
                                      >
                                        Normal Range
                                      </div>
                                      <div
                                        className='flex-none text-center sticky top-0 z-100'
                                        style={{ width: '150px' }}
                                      >
                                        Show Ranges
                                      </div>
                                      <div
                                        className='flex-none text-center sticky top-0 z-100'
                                        style={{ width: '100px' }}
                                      >
                                        Result Status
                                      </div>
                                      <div
                                        className='flex-none text-center sticky top-0 z-100'
                                        style={{ width: '100px' }}
                                      >
                                        Abnormal
                                      </div>
                                      <div
                                        className='flex-none text-center sticky top-0 z-100'
                                        style={{ width: '100px' }}
                                      >
                                        Critical
                                      </div>
                                      <div
                                        className='flex-none text-center sticky top-0 z-100'
                                        style={{
                                          width: selectedRowId
                                            ? '100px'
                                            : '50px',
                                        }}
                                      >
                                        Conclusion
                                      </div>
                                    </div>

                                    <div className='flex justify-center items-center bg-gray-50'>
                                      {ActionBar()}
                                    </div>

                                    <div className='overflow-y-scroll h-auto'>
                                      {modalDetail?.data?.map(
                                        (record, index) => (
                                          <div
                                            key={index}
                                            className={`flex px-2 border-b text-sm ${
                                              index % 2 === 0
                                                ? 'bg-white'
                                                : 'bg-gray-50'
                                            } cursor-pointer`}
                                          >
                                            <div
                                              className='flex-none text-center text-gray-700'
                                              style={{ width: '250px' }}
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
                                            <div
                                              className='flex-none text-center text-gray-700'
                                              style={{ width: '100px' }}
                                            >
                                              <Form.Toggle
                                                // disabled={!editorCell(row)}
                                                value={record.reportable}
                                                // onChange={showRanges => {
                                                //   props.onUpdateValue(
                                                //     { showRanges },
                                                //     row._id,
                                                //   );
                                                // }}
                                              />
                                            </div>
                                            <div
                                              className='flex-none text-center text-gray-700'
                                              style={{ width: '100px' }}
                                            >
                                              {record.resultType}
                                            </div>
                                            <div
                                              className='flex-none text-center text-gray-700'
                                              style={{ width: '150px' }}
                                            >
                                              <span title={record.result}>
                                                {record?.isResultEditor ? (
                                                  <DisplayResult
                                                    row={record}
                                                    rowIndex={index}
                                                    rowData={props.data}
                                                  />
                                                ) : (
                                                  <span
                                                    style={{
                                                      fontWeight: 'bold',
                                                    }}
                                                  >
                                                    {record.result}
                                                  </span>
                                                )}
                                              </span>
                                            </div>
                                            <div
                                              className='flex-none text-center text-gray-700'
                                              style={{ width: '100px' }}
                                            >
                                              <span title={record.units}>
                                                {truncateText(record.units, 10)}
                                              </span>
                                            </div>
                                            <div
                                              className='flex-none text-center text-gray-700'
                                              style={{
                                                width: refRangeRowId
                                                  ? '550px'
                                                  : '250px',
                                              }}
                                            >
                                              <div className='flex items-center justify-center flex-row gap-2'>
                                                <span title={record.units}>
                                                  {isNaN(
                                                    Number.parseFloat(
                                                      record.loNor,
                                                    ),
                                                  ) &&
                                                  isNaN(
                                                    Number.parseFloat(
                                                      record.hiNor,
                                                    ),
                                                  )
                                                    ? '-'
                                                    : isNaN(
                                                        Number.parseFloat(
                                                          record.loNor,
                                                        ),
                                                      )
                                                    ? `${record.hiNor} - >`
                                                    : isNaN(
                                                        Number.parseFloat(
                                                          record.hiNor,
                                                        ),
                                                      )
                                                    ? `< - ${record.loNor}`
                                                    : `${record.loNor} - ${record.hiNor}`}
                                                </span>
                                                <div>
                                                  {record.refRangesList
                                                    ?.length > 0 && (
                                                    <Tooltip
                                                      tooltipText={
                                                        record._id !=
                                                        refRangeRowId
                                                          ? 'Expand Reference Range'
                                                          : 'Collapse Reference Range'
                                                      }
                                                    >
                                                      <Icons.IconContext
                                                        color={'#000000'}
                                                        size='20'
                                                        onClick={() => {
                                                          if (
                                                            record._id ===
                                                            refRangeRowId
                                                          ) {
                                                            setRefRangleRowId(
                                                              '',
                                                            );
                                                          } else {
                                                            setRefRangleRowId(
                                                              record._id,
                                                            );
                                                          }
                                                        }}
                                                      >
                                                        {Icons.getIconTag(
                                                          record._id !=
                                                            refRangeRowId
                                                            ? Icons.IconBi
                                                                .BiExpand
                                                            : Icons.IconBi
                                                                .BiCollapse,
                                                        )}
                                                      </Icons.IconContext>
                                                    </Tooltip>
                                                  )}
                                                </div>
                                              </div>
                                              {refRangeRowId == record._id ? (
                                                <div>
                                                  <RefRangesExpandList
                                                    id='_id'
                                                    data={
                                                      record?.refRangesList ||
                                                      []
                                                    }
                                                    totalSize={
                                                      record?.refRangesList
                                                        ?.length || 0
                                                    }
                                                    columns={[
                                                      {
                                                        dataField: 'result',
                                                        text: 'Result',
                                                        editable: false,
                                                        formatter: () => (
                                                          <>
                                                            <span>
                                                              {record.result}
                                                            </span>
                                                          </>
                                                        ),
                                                      },
                                                      {
                                                        dataField: 'rangeType',
                                                        text: 'Range Type',
                                                      },
                                                      {
                                                        dataField: 'low',
                                                        text: 'Low',
                                                      },
                                                      {
                                                        dataField: 'high',
                                                        text: 'High',
                                                      },
                                                      {
                                                        dataField: 'rangeSetOn',
                                                        text: 'Range Set On',
                                                      },
                                                      {
                                                        dataField: 'rangeId',
                                                        text: 'Range Id',
                                                      },
                                                      {
                                                        dataField: 'version',
                                                        text: 'Range Version',
                                                      },
                                                    ]}
                                                  />
                                                </div>
                                              ) : null}
                                            </div>
                                            <div
                                              className='flex-none text-center text-gray-700'
                                              style={{ width: '150px' }}
                                            >
                                              <Form.Toggle
                                                // disabled={!editorCell(row)}
                                                value={record.showRanges}
                                                // onChange={showRanges => {
                                                //   props.onUpdateValue(
                                                //     { showRanges },
                                                //     row._id,
                                                //   );
                                                // }}
                                              />
                                            </div>
                                            <div
                                              className='flex-none text-center text-gray-700'
                                              style={{ width: '100px' }}
                                            >
                                              <span title={record.resultStatus}>
                                                {truncateText(
                                                  record.resultStatus,
                                                  10,
                                                )}
                                              </span>
                                            </div>
                                            <div
                                              className='flex-none text-center text-gray-700'
                                              style={{ width: '100px' }}
                                            >
                                              <Form.Toggle
                                                disabled={
                                                  record.resultType === 'F' ||
                                                  record.resultType === 'M'
                                                    ? false
                                                    : true
                                                }
                                                value={
                                                  record.critical
                                                    ? true
                                                    : record.abnFlag
                                                }
                                                // onChange={abnFlag => {
                                                //   props.onUpdateValue(
                                                //     { abnFlag },
                                                //     record._id,
                                                //   );
                                                // }}
                                              />
                                            </div>
                                            <div
                                              className='flex-none text-center text-gray-700'
                                              style={{ width: '100px' }}
                                            >
                                              <Form.Toggle
                                                disabled={
                                                  record.resultType === 'F' ||
                                                  record.resultType === 'M'
                                                    ? false
                                                    : true
                                                }
                                                value={record.critical}
                                                // onChange={critical => {
                                                //   props.onUpdateValue(
                                                //     { critical },
                                                //     row._id,
                                                //   );
                                                // }}
                                              />
                                            </div>
                                            <div
                                              className='flex-none text-center text-red-700 '
                                              style={{
                                                width: selectedRowId
                                                  ? '100px'
                                                  : '50px',
                                              }}
                                            >
                                              <div className='flex justify-center flex-col'>
                                                <Tooltip
                                                  tooltipText={
                                                    record._id != selectedRowId
                                                      ? 'Expand'
                                                      : 'Collapse'
                                                  }
                                                >
                                                  <Icons.IconContext
                                                    color='#000000'
                                                    size='20'
                                                    onClick={() => {
                                                      if (
                                                        record._id ===
                                                        selectedRowId
                                                      ) {
                                                        setSelectedRowId('');
                                                      } else {
                                                        setSelectedRowId(
                                                          record._id,
                                                        );
                                                      }
                                                    }}
                                                  >
                                                    {Icons.getIconTag(
                                                      record._id !=
                                                        selectedRowId
                                                        ? Icons.IconBi.BiExpand
                                                        : Icons.IconBi
                                                            .BiCollapse,
                                                    )}
                                                  </Icons.IconContext>
                                                </Tooltip>

                                                {record._id ===
                                                  selectedRowId && (
                                                  <div>
                                                    <Form.MultilineInput
                                                      rows={3}
                                                      placeholder='Conclusion'
                                                      className='text-black'
                                                      defaultValue={
                                                        record?.conclusion
                                                      }
                                                    />
                                                  </div>
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        ),
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                    </>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
