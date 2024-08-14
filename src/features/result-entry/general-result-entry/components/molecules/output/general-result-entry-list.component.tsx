import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import _ from 'lodash';
import { Form, Tooltip, Icons } from '@/library/components';
import { DisplayResult } from './display-result.components';
import { GeneralResultEntryExpand } from './general-result-entry-expand.component';
import { RefRangesExpandList } from './ref-ranges-expand-list.component';
import { FaUserInjured, FaComment, FaCommentAlt } from 'react-icons/fa';
import { PiTestTubeFill, PiStethoscopeBold } from 'react-icons/pi';
import { ImAttachment } from 'react-icons/im';

interface GeneralResultEntryListProps {
  data: any;
  totalSize: number;
  selectedId?: string;
  isView?: boolean;
  isDelete?: boolean;
  isUpdate?: boolean;
  isExport?: boolean;
  onUpdateValue: (item: any, id: string) => void;
  onSaveFields: (fields: any, id: string, type: string) => void;
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
  const [expandedRow, setExpandedRow] = useState<{
    rowIndex: number | null;
    data: any[];
  }>({ rowIndex: null, data: [] });
  const [visibleRecords, setVisibleRecords] = useState<any[]>([]);
  const [refRangeRowId, setRefRangeRowId] = useState<string>('');
  const [selectedRowId, setSelectedRowId] = useState<string>('');

  // eslint-disable-next-line unicorn/no-array-reduce
  const distinctRecords = visibleRecords.reduce((acc, current) => {
    const x = acc.find(
      item =>
        item.testName === current.testName &&
        item.labId === current.labId &&
        item.panelCode === current.panelCode,
    );
    if (!x) {
      acc.push(current);
    }
    return acc;
  }, []);

  useEffect(() => {
    setVisibleRecords(props.data);
    setExpandedRow({ rowIndex: null, data: [] });
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
    setExpandedRow(prevState => {
      if (prevState.rowIndex === index) {
        setVisibleRecords(props.data);
        return { rowIndex: null, data: [] };
      }
      const filteredData = props.data.filter(
        item =>
          item.labId === record.labId &&
          item.panelCode === record.panelCode &&
          item.testCode === record.testCode,
      );
      setVisibleRecords([record]);
      return { rowIndex: record._id, data: filteredData };
    });
  };

  const truncateText = (text: string, maxLength: number) =>
    text?.length > maxLength ? text.slice(0, maxLength) + '...' : text;

  const renderStatusButtons = () => (
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
  );

  const renderTestStatusButtons = () => (
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
  );

  const renderDataRows = () =>
    distinctRecords.map((record, index) => (
      <React.Fragment key={record._id}>
        <div
          className={`flex justify-between items-center py-2 px-2 border-b text-sm ${
            index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
          } cursor-pointer`}
          onClick={() => handleRowClick(record, record._id)}
        >
          <div
            className='flex-none text-justify text-gray-700'
            style={{ width: '250px' }}
          >
            <span title={`${record.testCode} - ${record.testName}`}>
              {truncateText(`${record.testCode} - ${record.testName}`, 30)}
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
            <span title={record.labId}>{truncateText(record.labId, 10)}</span>
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
            <span title={record.name}>{truncateText(record.name, 10)}</span>
          </div>
          <div
            className='flex-none text-center text-gray-700'
            style={{ width: '80px' }}
          >
            <span title={record.pLab}>{truncateText(record.pLab, 10)}</span>
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
                  dayjs(record.resultDate).format('YYYY-MM-DD HH:mm:ss'),
                10,
              )}
            </span>
          </div>
        </div>

        {expandedRow?.rowIndex === record._id && (
          <div className='relative'>
            <div className='h-full shadow-lg rounded-lg border border-gray-200'>
              <div className='overflow-x-auto' style={{ maxHeight: '24rem' }}>
                <div
                  style={{
                    display: 'table',
                    width: 'auto',
                    tableLayout: 'fixed',
                  }}
                >
                  <div
                    className='sticky top-0 text-white py-2 px-4 rounded-t-lg z-10'
                    style={{ backgroundColor: '#6A727F', display: 'table-row' }}
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
                        Conclusion
                      </div>
                      <div
                        className='flex-none text-center'
                        style={{ width: '100px' }}
                      >
                        Units
                      </div>
                      <div
                        className='flex-none text-center'
                        style={{ width: refRangeRowId ? '550px' : '200px' }}
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
                        Result Type
                      </div>
                    </div>
                  </div>

                  <div
                    className='overflow-y-auto top-0'
                    style={{ maxHeight: '300px', display: 'table-row-group' }}
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
                          className='flex-none text-center'
                          style={{ width: '100px' }}
                        >
                          <div className='flex items-center justify-end flex-col'>
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
                                />
                              </div>
                            )}
                          </div>
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
                          style={{ width: refRangeRowId ? '550px' : '200px' }}
                        >
                          <div className='flex items-center justify-center flex-row gap-2'>
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
                            <div>
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
                            value={record.critical ? true : record.abnFlag}
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
                          <Form.Toggle
                            disabled
                            value={record.calculationFlag}
                          />
                        </div>
                        <div
                          className='flex-none text-center'
                          style={{ width: '100px' }}
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
                  onClick={() => {}}
                >
                  Save
                </button>
                <div
                  className='flex w-100 p-2  flex-row justify-center  gap-4 items-center'
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
                  <Tooltip tooltipText={'Attactment'}>
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
      </React.Fragment>
    ));

  return (
    <div className={`${props.isView ? 'shown' : 'hidden'} `}>
      <div className='flex flex-row flex-wrap justify-between mb-2'>
        {renderStatusButtons()}
        {renderTestStatusButtons()}
      </div>

      <div className='shadow-lg rounded-lg border border-gray-200 overflow-hidden'>
        <div
          className='sticky top-0 text-white py-1 px-4 z-20'
          style={{ backgroundColor: '#6A727F' }}
        >
          <div className='flex justify-between items-center'>
            <div className='flex-none text-center' style={{ width: '250px' }}>
              Test Code - Name
            </div>
            <div className='flex-none text-justify' style={{ width: '150px' }}>
              Department
            </div>
            <div className='flex-none text-justify' style={{ width: '100px' }}>
              Lab ID
            </div>
            <div className='flex-none text-justify' style={{ width: '100px' }}>
              Sample ID
            </div>
            <div className='flex-none text-justify' style={{ width: '100px' }}>
              Test Status
            </div>
            <div className='flex-none text-center' style={{ width: '100px' }}>
              Patient Name
            </div>
            <div className='flex-none text-center' style={{ width: '100px' }}>
              Lab
            </div>
            <div className='flex-none text-justify' style={{ width: '100px' }}>
              Due Date
            </div>
            <div className='flex-none text-center' style={{ width: '100px' }}>
              Result Date
            </div>
          </div>
        </div>

        <div className='max-h-[calc(100vh_-_50vh)] overflow-y-auto'>
          {renderDataRows()}
        </div>
      </div>
    </div>
  );
};
