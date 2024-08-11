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
import { RefRangesExpandList } from './ref-ranges-expand-list.component';
import { stores, useStores } from '@/stores';
import { useStore } from 'react-redux';
import { ModalResultReportOrder } from '../result/modal-result.component';

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

  const handleRowClick = record => {
    const matchingRecords = props?.data?.filter(
      item => item.testName === record.testName,
    );
    setModalDetail({
      isVisible: true,
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

  return (
    <>
      <div className={`${props.isView ? 'shown' : 'hidden'}`}>
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

        <div className=' bg-gray-100'>
          <div className='overflow-auto h-full shadow-lg rounded-lg border border-gray-200'>
            {/* Header Row */}
            <div className='overflow-x-auto'>
              <div className='min-w-max'>
                <div className='flex justify-between bg-indigo-600 text-white py-2 px-4 rounded-t-lg sticky top-0 z-10'>
                  <div
                    className='flex-none text-center border-r border-indigo-700'
                    style={{ width: '250px' }}
                  >
                    Test Code - Name
                  </div>
                  <div
                    className='flex-none text-center border-r border-indigo-700'
                    style={{ width: '150px' }}
                  >
                    Department
                  </div>
                  <div
                    className='flex-none text-center border-r border-indigo-700'
                    style={{ width: '80px' }}
                  >
                    Lab ID
                  </div>
                  <div
                    className='flex-none text-center border-r border-indigo-700'
                    style={{ width: '80px' }}
                  >
                    Sample ID
                  </div>
                  <div
                    className='flex-none text-center border-r border-indigo-700'
                    style={{ width: '100px' }}
                  >
                    Patient Name
                  </div>
                  <div
                    className='flex-none text-center border-r border-indigo-700'
                    style={{ width: '80px' }}
                  >
                    Lab
                  </div>

                  <div
                    className='flex-none text-center border-r border-indigo-700'
                    style={{ width: '80px' }}
                  >
                    Test Status
                  </div>
                  <div
                    className='flex-none text-center border-r border-indigo-700'
                    style={{ width: '100px' }}
                  >
                    Due Date
                  </div>
                  <div
                    className='flex-none text-center border-r border-indigo-700'
                    style={{ width: '100px' }}
                  >
                    Result Date
                  </div>
                  <div
                    className='flex-none text-center border-indigo-700'
                    style={{ width: '100px' }}
                  >
                    Environment
                  </div>
                </div>

                {/* Data Rows */}
                {distinctRecords.map((record, index) => (
                  <div
                    key={index}
                    className={`flex justify-between items-center py-2 px-4 border-b text-sm ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    } cursor-pointer`}
                    onClick={() => handleRowClick(record)}
                  >
                    <div
                      className='flex-none text-center text-gray-700 border-r border-gray-200'
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
                      className='flex-none text-center text-gray-700 border-r border-gray-200'
                      style={{ width: '150px' }}
                    >
                      <span title={record.departmentName}>
                        {truncateText(record.departmentName, 20)}
                      </span>
                    </div>
                    <div
                      className='flex-none text-center text-gray-700 border-r border-gray-200'
                      style={{ width: '80px' }}
                    >
                      <span title={record.labId}>
                        {truncateText(record.labId, 10)}
                      </span>
                    </div>
                    <div
                      className='flex-none text-center text-gray-700 border-r border-gray-200'
                      style={{ width: '80px' }}
                    >
                      <span title={record.sampleId}>
                        {truncateText(record.sampleId, 10)}
                      </span>
                    </div>
                    <div
                      className='flex-none text-center text-gray-700 border-r border-gray-200'
                      style={{ width: '100px' }}
                    >
                      <span title={record.name}>
                        {truncateText(record.name, 10)}
                      </span>
                    </div>
                    <div
                      className='flex-none text-center text-gray-700 border-r border-gray-200'
                      style={{ width: '80px' }}
                    >
                      <span title={record.pLab}>
                        {truncateText(record.pLab, 10)}
                      </span>
                    </div>

                    <div
                      className='flex-none text-center text-gray-700 border-r border-gray-200'
                      style={{ width: '80px' }}
                    >
                      <span title={record.testStatus}>
                        {truncateText(record.testStatus, 10)}
                      </span>
                    </div>
                    <div
                      className='flex-none text-center text-gray-700 border-r border-gray-200'
                      style={{ width: '100px' }}
                    >
                      <span title={record.dueDate}>
                        {truncateText(record.dueDate, 10)}
                      </span>
                    </div>
                    <div
                      className='flex-none text-center text-gray-700 border-r border-gray-200'
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
                      style={{ width: '100px' }}
                    >
                      <span title={record.environment}>
                        {truncateText(record.environment, 10)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <ModalResultReportOrder
          {...modalDetail}
          onClose={() => {
            setModalDetail({
              isVisible: false,
              data: [],
            });
          }}
        />
      </div>
    </>
  );
};
