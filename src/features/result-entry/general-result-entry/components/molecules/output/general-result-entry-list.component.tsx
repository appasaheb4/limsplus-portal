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
  const [expandedRow, setExpandedRow] = useState<any>(null);
  const [visibleRecords, setVisibleRecords] = useState(props.data);
  const [refRangeRowId, setRefRangleRowId] = useState('');
  const [selectedRowId, setSelectedRowId] = useState('');

  useEffect(() => {
    setVisibleRecords(props.data);
  }, [props.data]);

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
  ];

  const handleRowClick = (record, index) => {
    if (expandedRow && expandedRow.rowIndex === index) {
      // If the row is already expanded, collapse it and show all distinct records
      setExpandedRow(null);
      setVisibleRecords(props.data); // Reset to show all distinct records
    } else {
      // Filter the main table to show only the clicked record and expand it
      setExpandedRow({
        rowIndex: index,
        data: props.data.filter(item => item.testName === record.testName),
      });
      setVisibleRecords([record]); // Show only the clicked distinct record
    }
  };

  // Filter to get unique records by testName
  // eslint-disable-next-line unicorn/no-array-reduce
  const distinctRecords = visibleRecords.reduce((acc, current) => {
    const x = acc.find(item => item.testName === current.testName);
    if (!x) {
      acc.push(current);
    }
    return acc;
  }, []);

  function truncateText(text, maxLength) {
    return text?.length > maxLength ? text?.slice(0, maxLength) + '...' : text;
  }

  return (
    <>
      <div className={`${props.isView ? 'shown' : 'hidden'} `}>
        <div className='flex flex-row flex-wrap justify-between mb-2'>
          <div className='flex flex-wrap gap-0'>
            {statusData.map(status => (
              <button
                key={status.code}
                disabled={status.disable}
                className={`bg-${status.color}-600 ml-2 px-3.5 py-2 focus:outline-none items-center outline shadow-sm font-medium text-center rounded-md text-white disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {status.value}
              </button>
            ))}
          </div>
          <div className='flex justify-end gap-1'>
            {testStatus.map(status => (
              <button
                key={status.code}
                className={`bg-${status.color}-600 px-3.5 py-2 focus:outline-none items-center outline shadow-sm font-medium text-center rounded-md text-white disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {status.value}
              </button>
            ))}
          </div>
        </div>

        {/* Table Container */}
        <div className='shadow-lg rounded-lg border border-gray-200 overflow-hidden'>
          {/* Header Row */}
          <div
            className='sticky top-0  text-white py-1 px-4 z-20'
            style={{ backgroundColor: '#6A727F' }}
          >
            <div className='flex justify-between items-center'>
              <div className='flex-none text-center' style={{ width: '250px' }}>
                Test Code - Name
              </div>
              <div
                className='flex-none text-justify'
                style={{ width: '150px' }}
              >
                Department
              </div>
              <div
                className='flex-none text-justify'
                style={{ width: '100px' }}
              >
                Lab ID
              </div>
              <div
                className='flex-none text-justify'
                style={{ width: '100px' }}
              >
                Sample ID
              </div>
              <div
                className='flex-none text-justify'
                style={{ width: '100px' }}
              >
                Test Status
              </div>

              <div className='flex-none text-center' style={{ width: '100px' }}>
                Patient Name
              </div>
              <div className='flex-none text-center' style={{ width: '100px' }}>
                Lab
              </div>
              <div
                className='flex-none text-justify'
                style={{ width: '100px' }}
              >
                Due Date
              </div>
              <div className='flex-none text-center' style={{ width: '100px' }}>
                Result Date
              </div>
            </div>
          </div>

          {/* Data Rows */}
          <div className='max-h-[calc(100vh_-_50vh)] overflow-y-auto'>
            {distinctRecords.map((record, index) => (
              <React.Fragment key={index}>
                <div
                  className={`flex justify-between items-center py-2 px-2 border-b text-sm ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  } cursor-pointer`}
                  onClick={() => handleRowClick(record, index)}
                >
                  <div
                    className='flex-none text-justify text-gray-700'
                    style={{ width: '250px' }}
                  >
                    <span title={`${record.testCode} - ${record.testName}`}>
                      {truncateText(
                        `${record.testCode} - ${record.testName}`,
                        30,
                      )}
                    </span>
                  </div>
                  <div
                    className='flex-none text-justify text-gray-700'
                    style={{ width: '150px' }}
                  >
                    <span title={record.departmentName}>
                      {truncateText(record.departmentName, 20)}
                    </span>
                  </div>
                  <div
                    className='flex-none text-justify text-gray-700'
                    style={{ width: '100px' }}
                  >
                    <span title={record.labId}>
                      {truncateText(record.labId, 10)}
                    </span>
                  </div>
                  <div
                    className='flex-none text-justify text-gray-700'
                    style={{ width: '100px' }}
                  >
                    <span title={record.sampleId}>
                      {truncateText(record.sampleId, 10)}
                    </span>
                  </div>
                  <div
                    className='flex-none text-center text-gray-700'
                    style={{ width: '100px' }}
                  >
                    <span title={record.testStatus}>
                      {truncateText(record.testStatus, 10)}
                    </span>
                  </div>

                  <div
                    className='flex-none text-justify text-gray-700'
                    style={{ width: '100px' }}
                  >
                    <span title={record.name}>
                      {truncateText(record.name, 10)}
                    </span>
                  </div>
                  <div
                    className='flex-none text-center text-gray-700'
                    style={{ width: '80px' }}
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
                </div>

                {expandedRow && expandedRow.rowIndex === index && (
                  <div className='relative'>
                    <div className='h-full shadow-lg rounded-lg border border-gray-200'>
                      <div className='overflow-x-auto'>
                        <div className='min-w-max'>
                          <div
                            className='sticky top-0 text-white py-2 px-1 rounded-t-lg z-10'
                            style={{ backgroundColor: '#6A727F' }}
                          >
                            <div className='flex justify-between'>
                              <div
                                className='flex-none text-center'
                                style={{ width: '250px' }}
                              >
                                Analyte Code - Name
                              </div>
                              <div
                                className='flex-none text-justify'
                                style={{ width: '100px' }}
                              >
                                Reportable
                              </div>

                              <div
                                className='flex-none text-justify'
                                style={{ width: '150px' }}
                              >
                                Result
                              </div>
                              <div
                                className='flex-none text-center'
                                style={{ width: '100px' }}
                              >
                                Units
                              </div>
                              <div
                                className='flex-none text-center'
                                style={{
                                  width: refRangeRowId ? '550px' : '200px',
                                }}
                              >
                                Range
                              </div>
                              <div
                                className='flex-none text-justify'
                                style={{ width: '150px' }}
                              >
                                Show Ranges
                              </div>
                              <div
                                className='flex-none text-justify'
                                style={{ width: '100px' }}
                              >
                                Result Status
                              </div>
                              <div
                                className='flex-none text-center'
                                style={{ width: '120px' }}
                              >
                                Abnormal
                              </div>
                              <div
                                className='flex-none text-center'
                                style={{ width: '120px' }}
                              >
                                Critical
                              </div>
                              <div
                                className='flex-none text-center'
                                style={{ width: '120px' }}
                              >
                                Calculation Flag
                              </div>
                              <div
                                className='flex-none text-center'
                                style={{ width: '100px' }}
                              >
                                Conclusion
                              </div>
                              <div
                                className='flex-none text-center'
                                style={{ width: '100px' }}
                              >
                                Result Type
                              </div>
                            </div>
                          </div>
                          <div
                            className='overflow-x-auto'
                            style={{ overflowY: 'auto', maxHeight: '300px' }}
                          >
                            {expandedRow.data.map((record, subIndex) => (
                              <div
                                key={subIndex}
                                className={`flex px-2 border-b text-sm ${
                                  subIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                } cursor-pointer`}
                              >
                                <div
                                  className='flex-none text-justify text-gray-700'
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
                                  className='flex-none text-justify text-gray-700'
                                  style={{ width: '100px' }}
                                >
                                  <Form.Toggle value={record.reportable} />
                                </div>

                                <div
                                  className='flex-none text-justify text-gray-700'
                                  style={{ width: '150px' }}
                                >
                                  <span title={record.result}>
                                    {record?.isResultEditor ? (
                                      <DisplayResult
                                        row={record}
                                        rowIndex={subIndex}
                                        rowData={props.data}
                                      />
                                    ) : (
                                      <span style={{ fontWeight: 'bold' }}>
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
                                    width: refRangeRowId ? '550px' : '200px',
                                  }}
                                >
                                  <div className='flex items-center justify-center flex-row gap-2'>
                                    <span title={record.units}>
                                      {isNaN(Number.parseFloat(record.loNor)) &&
                                      isNaN(Number.parseFloat(record.hiNor))
                                        ? '-'
                                        : isNaN(Number.parseFloat(record.loNor))
                                        ? `${record.hiNor} - >`
                                        : isNaN(Number.parseFloat(record.hiNor))
                                        ? `< - ${record.loNor}`
                                        : `${record.loNor} - ${record.hiNor}`}
                                    </span>
                                    <div>
                                      {record.refRangesList?.length > 0 && (
                                        <Tooltip
                                          tooltipText={
                                            record._id != refRangeRowId
                                              ? 'Expand Reference Range'
                                              : 'Collapse Reference Range'
                                          }
                                        >
                                          <Icons.IconContext
                                            color={'#000000'}
                                            size='20'
                                            onClick={() => {
                                              if (
                                                record._id === refRangeRowId
                                              ) {
                                                setRefRangleRowId('');
                                              } else {
                                                setRefRangleRowId(record._id);
                                              }
                                            }}
                                          >
                                            {Icons.getIconTag(
                                              record._id != refRangeRowId
                                                ? Icons.IconBi.BiExpand
                                                : Icons.IconBi.BiCollapse,
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
                                        data={record?.refRangesList || []}
                                        totalSize={
                                          record?.refRangesList?.length || 0
                                        }
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
                                  <Form.Toggle value={record.showRanges} />
                                </div>
                                <div
                                  className='flex-none text-center text-gray-700'
                                  style={{ width: '120px' }}
                                >
                                  <span title={record.resultStatus}>
                                    {truncateText(record.resultStatus, 10)}
                                  </span>
                                </div>
                                <div
                                  className='flex-none text-center text-gray-700'
                                  style={{ width: '100px' }}
                                >
                                  <Form.Toggle
                                    disabled={
                                      record.resultType !== 'F' &&
                                      record.resultType !== 'M'
                                    }
                                    value={
                                      record.critical ? true : record.abnFlag
                                    }
                                  />
                                </div>
                                <div
                                  className='flex-none text-center text-gray-700'
                                  style={{ width: '120px' }}
                                >
                                  <Form.Toggle
                                    disabled={
                                      record.resultType !== 'F' &&
                                      record.resultType !== 'M'
                                    }
                                    value={record.critical}
                                  />
                                </div>
                                <div
                                  className='flex-none text-center text-gray-700'
                                  style={{ width: '120px' }}
                                >
                                  <Form.Toggle value={record.calculationFlag} />
                                </div>
                                <div
                                  className='flex-none text-center'
                                  style={{ width: '100px' }}
                                >
                                  <div className='flex items-center justify-end flex-col'>
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
                                          if (record._id === selectedRowId) {
                                            setSelectedRowId('');
                                          } else {
                                            setSelectedRowId(record._id);
                                          }
                                        }}
                                      >
                                        {Icons.getIconTag(
                                          record._id != selectedRowId
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
                                        />
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div
                                  className='flex-none text-center text-gray-700'
                                  style={{ width: '100px' }}
                                >
                                  {record.resultType}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className='flex justify-center mt-1'>
                        <button
                          className={
                            'py-2 mt-1 w-24 focus:outline-none bg-blue-600 items-center outline shadow-sm font-medium text-center rounded-md  text-white disabled:opacity-50 disabled:cursor-not-allowed'
                          }
                          onClick={() => {}}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
