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

  const editorCell = (row: any) => {
    return row.status !== 'I' ? true : false;
  };

  // useEffect(() => {
  //   setSelectId(props?.selectedId || '');
  //   setLocalData(
  //     props.selectedId
  //       ? props.data?.map(item => ({
  //           ...item,
  //           selectedId: props.selectedId || '',
  //         }))
  //       : JSON.parse(JSON.stringify(props.data)),
  //   );
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [props.selectedId, props.data]);

  // const isFinishResultDisable = (data: Array<any>) => {
  //   let isDisable = true;
  //   if (data?.length == 0) return isDisable;
  //   else {
  //     const labs = _.groupBy(data, function (b: any) {
  //       return b.labId;
  //     });
  //     Object.keys(labs).forEach(function (key) {
  //       const testCodes = _.groupBy(labs[key], function (b: any) {
  //         return b.testCode;
  //       });

  //       Object.keys(testCodes).forEach(function (key1) {
  //         const totalRecords = testCodes[key1];
  //         let filterRecords = totalRecords?.map(item => {
  //           if (
  //             item.finishResult == 'P' &&
  //             item.panelStatus != 'P' &&
  //             item.testStatus != 'P'
  //           ) {
  //             return item;
  //           } else return;
  //         });
  //         filterRecords = _.reject(filterRecords, _.isEmpty);
  //         if (totalRecords?.length == filterRecords?.length) {
  //           isDisable = false;
  //         }
  //       });
  //     });
  //     return isDisable;
  //   }
  // };

  // const handleExpandClick = row => {
  //   if (selectId === row._id) {
  //     setSelectId('');
  //     props.onExpand && props.onExpand('');
  //   } else {
  //     setSelectId(row._id);
  //     props.onExpand && props.onExpand(row);
  //   }
  // };

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
        <div className='h-screen bg-gray-100'>
          <div className='overflow-auto h-full shadow-lg rounded-lg border border-gray-200'>
            {/* Header Row */}
            <div className='flex justify-between bg-indigo-600 text-white py-2 px-4 rounded-t-lg sticky top-0 z-10'>
              <div className='flex-1 text-center'>Department</div>
              <div className='flex-1 text-center'>Lab ID</div>
              <div className='flex-1 text-center'>Sample ID</div>
              <div className='flex-2 text-center'>Patient Name</div>
              <div className='flex-1 text-center'>Contact No</div>
              <div className='flex-2 text-center whitespace-nowrap'>
                Test Code - Name
              </div>
              <div className='flex-1 text-center'>Test Status</div>
              <div className='flex-1 text-center'>Due Date</div>
              <div className='flex-1 text-center'>Result Date</div>
              <div className='flex-1 text-center'>Entered By</div>
              <div className='flex-1 text-center'>Environment</div>
              <div className='flex-1 text-center'>Company</div>
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
                <div className='flex-1 text-center text-gray-700 whitespace-nowrap'>
                  <span title={record.departmentName}>
                    {truncateText(record.departmentName, 10)}
                  </span>
                </div>
                <div className='flex-1 text-center text-gray-700 whitespace-nowrap'>
                  <span title={record.labId}>
                    {truncateText(record.labId, 10)}
                  </span>
                </div>
                <div className='flex-1 text-center text-gray-700 whitespace-nowrap'>
                  <span title={record.sampleId}>
                    {truncateText(record.sampleId, 10)}
                  </span>
                </div>
                <div className='flex-2 text-center text-gray-700 whitespace-nowrap'>
                  <span title={record.name}>
                    {truncateText(record.name, 10)}
                  </span>
                </div>
                <div className='flex-1 text-center text-gray-700 whitespace-nowrap'>
                  <span title={record.contactNo}>
                    {truncateText(record.contactNo, 10)}
                  </span>
                </div>
                <div className='flex-2 text-center text-gray-700 whitespace-nowrap'>
                  <span title={`${record.testCode} - ${record.testName}`}>
                    {truncateText(
                      `${record.testCode} - ${record.testName}`,
                      10,
                    )}
                  </span>
                </div>

                <div className='flex-1 text-center text-gray-700'>
                  <span title={record.testStatus}>
                    {truncateText(record.testStatus, 10)}
                  </span>
                </div>
                <div className='flex-1 text-center text-gray-700'>
                  <span title={record.dueDate}>
                    {truncateText(record.dueDate, 10)}
                  </span>
                </div>
                <div className='flex-1 text-center text-gray-700'>
                  <span title={record.resultDate}>
                    {truncateText(
                      record.resultDate &&
                        dayjs(record.resultDate).format('YYYY-MM-DD HH:mm:ss'),
                      10,
                    )}
                  </span>
                </div>
                <div className='flex-1 text-center text-gray-700'>
                  <span title={record.extraData?.enteredBy}>
                    {truncateText(record.extraData?.enteredBy, 10)}
                  </span>
                </div>
                <div className='flex-1 text-center text-gray-700'>
                  <span title={record.environment}>
                    {truncateText(record.environment, 10)}
                  </span>
                </div>
                <div className='flex-1 text-center text-gray-700'>
                  <span title={record.companyCode}>
                    {truncateText(record.companyCode, 10)}
                  </span>
                </div>
              </div>
            ))}
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
