import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import _, { isNaN } from 'lodash';
import { Table } from 'reactstrap';
import { observer } from 'mobx-react';
import { Form, Toast, Buttons } from '@/library/components';
import { useStores } from '@/stores';
import dayjs from 'dayjs';
import { InputResult } from '../output/input-result.components';
import { icons } from '@/library/assets';
import { FaPhone } from 'react-icons/fa';

export interface ModalResultProps {
  data: Array<any>;
  isVisible?: boolean;
  onClick?: (item: any) => void;
  onClose?: () => void;
}

export const ModalResultReportOrder = observer(
  ({ data, isVisible = false, onClick, onClose }: ModalResultProps) => {
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
              <div className='relative w-auto my-6 mx-auto max-w-[80rem]'>
                {/*content*/}
                <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                  {/*header*/}
                  <div className='flex items-start justify-between p-2 border-b border-solid border-gray-300 rounded-t'>
                    <div className='flex w-[28vh] flex-col rounded-md shadow p-4 items-center text-center mb-2 border-2 border-transparent focus:border-white hover:border-white transition duration-300 ease-in-out transform hover:scale-105'>
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
                        <span className='text-lg font-bold mt-1'>
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
                                style={{ width: '80px' }}
                              >
                                Sex
                              </div>
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
                                style={{ width: '150px' }}
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
                              <div
                                className='flex-none text-center border-r border-indigo-700'
                                style={{ width: '150px' }}
                              >
                                Conclusion
                              </div>
                              <div
                                className='flex-none text-center border-r border-indigo-700'
                                style={{ width: '100px' }}
                              >
                                Test Status
                              </div>
                              <div
                                className='flex-none text-center border-r border-indigo-700'
                                style={{ width: '150px' }}
                              >
                                Due Date
                              </div>
                              <div
                                className='flex-none text-center border-r border-indigo-700'
                                style={{ width: '150px' }}
                              >
                                Result Date
                              </div>
                              <div
                                className='flex-none text-center border-r border-indigo-700'
                                style={{ width: '150px' }}
                              >
                                Entered By
                              </div>
                              <div
                                className='flex-none text-center border-r border-indigo-700'
                                style={{ width: '150px' }}
                              >
                                Environment
                              </div>
                              <div
                                className='flex-none text-center'
                                style={{ width: '150px' }}
                              >
                                Company
                              </div>
                            </div>

                            {/* Data Rows */}
                            {data?.map((record, index) => (
                              <div
                                key={index}
                                className={`flex py-2 px-2 border-b text-sm ${
                                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                } cursor-pointer`}
                              >
                                <div
                                  className='flex-none text-center text-gray-700 border-r border-gray-200'
                                  style={{ width: '80px' }}
                                >
                                  <span title={record.sex}>
                                    {truncateText(record.sex, 10)}
                                  </span>
                                </div>
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
                                    <InputResult
                                      row={record}
                                      onSelect={async result => {}}
                                    />
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
                                  style={{ width: '150px' }}
                                >
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
                                </div>
                                <div
                                  className='flex-none text-center text-gray-700 border-r border-gray-200'
                                  style={{ width: '150px' }}
                                >
                                  <span title={record.units}>
                                    {truncateText(record.units, 10)}
                                  </span>
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
                                  <span title={record.abnFlag}>
                                    {truncateText(record.abnFlag, 10)}
                                  </span>
                                </div>
                                <div
                                  className='flex-none text-center text-gray-700 border-r border-gray-200'
                                  style={{ width: '100px' }}
                                >
                                  <span title={record.critical}>
                                    {truncateText(record.critical, 10)}
                                  </span>
                                </div>
                                <div
                                  className='flex-none text-center text-gray-700 border-r border-gray-200'
                                  style={{ width: '150px' }}
                                >
                                  <span title={record.conclusion}>
                                    {truncateText(record.conclusion, 10)}
                                  </span>
                                </div>
                                <div
                                  className='flex-none text-center text-gray-700 border-r border-gray-200'
                                  style={{ width: '100px' }}
                                >
                                  <span title={record.testStatus}>
                                    {truncateText(record.testStatus, 10)}
                                  </span>
                                </div>
                                <div
                                  className='flex-none text-center text-gray-700 border-r border-gray-200'
                                  style={{ width: '150px' }}
                                >
                                  <span title={record.dueDate}>
                                    {truncateText(record.dueDate, 10)}
                                  </span>
                                </div>
                                <div
                                  className='flex-none text-center text-gray-700 border-r border-gray-200'
                                  style={{ width: '150px' }}
                                >
                                  <span title={record.resultDate}>
                                    {truncateText(record.resultDate, 10)}
                                  </span>
                                </div>
                                <div
                                  className='flex-none text-center text-gray-700 border-r border-gray-200'
                                  style={{ width: '150px' }}
                                >
                                  <span title={record.extraData?.enteredBy}>
                                    {truncateText(
                                      record.extraData?.enteredBy,
                                      10,
                                    )}
                                  </span>
                                </div>
                                <div
                                  className='flex-none text-center text-gray-700 border-r border-gray-200'
                                  style={{ width: '150px' }}
                                >
                                  <span title={record.environment}>
                                    {truncateText(record.environment, 10)}
                                  </span>
                                </div>
                                <div
                                  className='flex-none text-center text-gray-700'
                                  style={{ width: '150px' }}
                                >
                                  <span title={record.companyCode}>
                                    {truncateText(record.companyCode, 10)}
                                  </span>
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
