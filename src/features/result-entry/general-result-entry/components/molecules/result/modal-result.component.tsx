import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import _, { isNaN } from 'lodash';
import { Table } from 'reactstrap';
import { observer } from 'mobx-react';
import { Form, Toast, Buttons, Tooltip, Icons } from '@/library/components';
import { useStores } from '@/stores';
import dayjs from 'dayjs';
import { InputResult } from '../output/input-result.components';
import { icons } from '@/library/assets';
import { FaPhone } from 'react-icons/fa';
import { DisplayResult } from '../output/display-result.components';
import { RefRangesExpandList } from '../output/ref-ranges-expand-list.component';

export interface ModalResultProps {
  data: Array<any>;
  isVisible?: boolean;
  onClick?: (item: any) => void;
  onClose?: () => void;
}

export const ModalResultReportOrder = observer(
  ({ data, isVisible = false, onClick, onClose }: ModalResultProps) => {
    const [selectedRowId, setSelectedRowId] = useState('');
    const [refRangeRowId, setRefRangleRowId] = useState('');
    function truncateText(text, maxLength) {
      return text?.length > maxLength
        ? text?.slice(0, maxLength) + '...'
        : text;
    }
    return (
      <Container>
        {isVisible && (
          <>
            <div
              className='justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'
              onClick={() => {}}
            >
              <div className='relative w-auto my-6 mx-auto max-w-[72rem]'>
                {/*content*/}
                <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                  {/*header*/}
                  <div className='flex items-start justify-between p-2 border-b border-solid border-gray-300 rounded-t'>
                    <div className='flex justify-between w-[18vh] flex-row rounded-md shadow p-1 items-center text-center mb-2 border-2 border-transparent focus:border-white hover:border-white transition duration-300 ease-in-out transform hover:scale-105'>
                      <div className='mb-2'>
                        <img
                          src={data[0].sex == 'M' ? icons.male : icons.female}
                          style={{ width: 50, height: 50 }}
                          alt='gender icon'
                        />
                      </div>
                      <div className='flex flex-col'>
                        <span className='text-sm text-gray-500'>
                          PId: {data[0]?.pId?.toString()}
                        </span>
                        <span className='text-sm font-bold mt-1'>
                          {data[0]?.name?.toUpperCase() || ''}
                        </span>
                        <span className='text-sm text-gray-500 mt-1'>
                          {data[0].sex === 'M' ? 'Male' : 'Female' || 'Other'}
                        </span>
                        <span className='text-sm text-gray-500 mt-1'>
                          {data[0].age} {data[0].ageUnit}
                        </span>
                        <span className='text-sm text-gray-500 mt-1'>
                          {data[0]?.patientMobileNo && (
                            <span className='flex items-center justify-center gap-1'>
                              <FaPhone className='text-gray-400' />
                              {data[0]?.patientMobileNo}
                            </span>
                          )}
                        </span>
                      </div>
                    </div>

                    <button
                      className='p-1  border-0 text-black opacity-1 ml-6 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                      onClick={() => {
                        onClose && onClose();
                        //setShowModal(false)
                      }}
                    >
                      <span className=' text-black h-6 w-6 text-2xl block outline-none focus:outline-none'>
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className='flex flex-row justify-evenly w-full'>
                    {/* TestStatus Header */}
                    <div className='flex justify-start mb-2'>
                      <span className='text-lg font-bold'>TestStatus: </span>
                      <span className='text-lg ml-2'>
                        {data[0]?.testStatus}
                      </span>
                    </div>
                    <div className='flex justify-start mb-2'>
                      <span className='text-lg font-bold'>ResultStatus: </span>
                      <span className='text-lg ml-2'>
                        {data[0]?.resultStatus}
                      </span>
                    </div>
                    <div className='flex justify-start mb-2'>
                      <span className='text-lg font-bold'>Due Date</span>
                      <span className='text-lg ml-2'>{data[0]?.dueDate}</span>
                    </div>
                    <div className='flex justify-start mb-2'>
                      <span className='text-lg font-bold'>Result Date: </span>
                      <span className='text-lg ml-2'>
                        {data[0]?.resultDate}
                      </span>
                    </div>
                    <div className='flex justify-start mb-2'>
                      <span className='text-lg font-bold'>Environment</span>
                      <span className='text-lg ml-2'>
                        {data[0]?.environment}
                      </span>
                    </div>
                  </div>

                  <div className='relative p-2 flex-auto max-h-[60vh] overflow-y-scroll'>
                    <div className='bg-gray-100'>
                      <div className='overflow-auto h-full shadow-lg rounded-lg border border-gray-200'>
                        {/* Scrollable Container for Header and Data */}
                        <div className='overflow-x-auto'>
                          {/* Header Row */}
                          <div className='min-w-max'>
                            <div className='flex bg-indigo-600 text-white py-2 px-2 rounded-t-lg sticky top-0 z-10'>
                              <div
                                className='flex-none text-center border-r border-indigo-700'
                                style={{ width: '200px' }}
                              >
                                Analyte Code - Name
                              </div>
                              <div
                                className='flex-none text-center border-r border-indigo-700'
                                style={{ width: '100px' }}
                              >
                                Result
                              </div>
                              <div
                                className='flex-none text-center border-r border-indigo-700'
                                style={{ width: '100px' }}
                              >
                                Units
                              </div>
                              <div
                                className='flex-none text-center border-r border-indigo-700'
                                style={{
                                  width: refRangeRowId ? '550px' : '150px',
                                }}
                              >
                                Normal Range
                              </div>
                              <div
                                className='flex-none text-center border-r border-indigo-700'
                                style={{ width: '150px' }}
                              >
                                Show Ranges
                              </div>
                              <div
                                className='flex-none text-center border-r border-indigo-700'
                                style={{ width: '100px' }}
                              >
                                Result Status
                              </div>
                              <div
                                className='flex-none text-center border-r border-indigo-700'
                                style={{ width: '100px' }}
                              >
                                Abnormal
                              </div>
                              <div
                                className='flex-none text-center border-r border-indigo-700'
                                style={{ width: '100px' }}
                              >
                                Critical
                              </div>
                              <div className='flex-none text-center border-indigo-700'>
                                Conclusion
                              </div>
                            </div>

                            {/* Data Rows */}
                            {data?.map((record, index) => (
                              <div
                                key={index}
                                className={`flex px-2 border-b text-sm ${
                                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                } cursor-pointer`}
                              >
                                <div
                                  className='flex-none text-center text-gray-700 border-r border-gray-200'
                                  style={{ width: '200px' }}
                                >
                                  <span
                                    title={`${record.analyteCode} - ${record.analyteName}`}
                                  >
                                    {truncateText(
                                      `${record.analyteCode} - ${record.analyteName}`,
                                      20,
                                    )}
                                  </span>
                                </div>
                                <div
                                  className='flex-none text-center text-gray-700 border-r border-gray-200'
                                  style={{ width: '100px' }}
                                >
                                  <span title={record.result}>
                                    {record?.isResultEditor ? (
                                      <DisplayResult
                                        row={record}
                                        rowIndex={index}
                                        rowData={data}
                                      />
                                    ) : (
                                      <span style={{ fontWeight: 'bold' }}>
                                        {record.result}
                                      </span>
                                    )}
                                  </span>
                                </div>
                                <div
                                  className='flex-none text-center text-gray-700 border-r border-gray-200'
                                  style={{ width: '100px' }}
                                >
                                  <span title={record.units}>
                                    {truncateText(record.units, 10)}
                                  </span>
                                </div>
                                <div
                                  className='flex-none text-center text-gray-700 border-r border-gray-200'
                                  style={{
                                    width: refRangeRowId ? '550px' : '150px',
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
                                            formatter: () => (
                                              <>
                                                <span>{record.result}</span>
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
                                  className='flex-none text-center text-gray-700 border-r border-gray-200'
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
                                  className='flex-none text-center text-gray-700 border-r border-gray-200'
                                  style={{ width: '100px' }}
                                >
                                  <span title={record.resultStatus}>
                                    {truncateText(record.resultStatus, 10)}
                                  </span>
                                </div>
                                <div
                                  className='flex-none text-center text-gray-700 border-r border-gray-200'
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
                                      record.critical ? true : record.abnFlag
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
                                  className='flex-none text-center text-gray-700 border-r border-gray-200'
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
                                <div className='flex-none text-center text-gray-700 border-gray-200'>
                                  <div className='flex flex-col'>
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
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/*footer*/}
                  <div className='flex items-center justify-end p-2 border-t border-solid border-gray-300 rounded-b'>
                    <button
                      className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1'
                      type='button'
                      style={{ transition: 'all .15s ease' }}
                      onClick={() => {
                        onClose && onClose();
                        // setShowModal(false)
                      }}
                    >
                      Close
                    </button>
                    <button
                      className='bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1'
                      type='button'
                      style={{ transition: 'all .15s ease' }}
                      onClick={() => {
                        //setShowModal(false)
                      }}
                    >
                      Update
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
