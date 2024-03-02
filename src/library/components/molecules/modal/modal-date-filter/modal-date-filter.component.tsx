import { stores } from '@/stores';
import React, { useEffect, useRef, useState } from 'react';
import { Container } from 'reactstrap';
import * as Assets from '@/library/assets';
import { Form } from '@/library/components';

interface ModalProps {
  show?: boolean;
  close?: () => void;
  onClose?: () => void;
  onFilter?: any;
  column?: any;
}

export const ModalDateRangeFilter = (props: ModalProps) => {
  const [showModal, setShowModal] = useState(props.show);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const endDateRef = useRef<any>(null);
  const startDateRef = useRef(null);
  const [datesFilled, setDatesFilled] = useState(false);

  useEffect(() => {
    if (startDateRef.current && endDateRef.current && startDate) {
      endDateRef.current.click();
    }
  }, [startDate]);

  useEffect(() => {
    setShowModal(props.show);
  }, [props]);

  const handleStartDateChange = e => {
    const date = e.target.value;
    setStartDate(date);
    setEndDate(null);
    setDatesFilled(!!date);
    setEndDate(date);
  };

  const handleEndDateChange = e => {
    const date = e.target.value;
    setEndDate(date);
    setDatesFilled(!!startDate && !!date);
  };

  return (
    <>
      <Container>
        {showModal && (
          <>
            <div className='justify-center items-center  overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
              <div className='relative w-auto my-6 mx-auto max-w-3xl'>
                <div
                  className={`border-0 rounded-lg shadow-lg relative flex flex-col w-full ${
                    stores.appStore.applicationSetting.theme === 'dark'
                      ? 'dark:bg-boxdark'
                      : 'bg-white'
                  }  outline-none focus:outline-none`}
                >
                  <div>
                    <button
                      className='p-1  border-0 text-black opacity-1 ml-6 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                      onClick={() => {
                        props.close && props.close();
                        props.onClose && props.onClose();
                        setShowModal(false);
                      }}
                    >
                      <span className=' text-black h-6 w-6 text-2xl block outline-none focus:outline-none'>
                        ×
                      </span>
                    </button>
                  </div>
                  <div className='flex  flex-col  items-center justify-between p-2 border-b border-solid border-gray-300 rounded-t'>
                    <div className='items-center justify-center flex mb-2'>
                      <img
                        src={
                          stores.appStore.applicationSetting.theme === 'dark'
                            ? Assets.images.limsplusTran
                            : Assets.images.linplusLogo
                        }
                        className='img-fluid'
                        style={{
                          width: '200px',
                          height: '122px',
                          marginTop: '-40px',
                        }}
                        alt='lims plus'
                      />
                    </div>
                    <div>
                      <div className='items-center justify-center flex'>
                        <span className='text-4xl'>Date Range</span>
                      </div>
                    </div>
                  </div>

                  <div className='relative p-2 flex flex-auto justify-center'>
                    <div className='flex flex-row gap-2 items-center'>
                      <Form.InputWrapper
                        label='From Date'
                        style={{ paddingLeft: '5px' }}
                      >
                        <input
                          ref={startDateRef}
                          type='date'
                          value={startDate || ''}
                          onChange={handleStartDateChange}
                          className={
                            'leading-4 p-2 focus:outline-none focus:ring shadow-sm text-base border-2 border-gray-300 rounded-md text-black ml-1 '
                          }
                        />
                      </Form.InputWrapper>
                      <Form.InputWrapper
                        label='To Date'
                        style={{ paddingLeft: '5px' }}
                      >
                        <input
                          ref={endDateRef}
                          type='date'
                          value={endDate || ''}
                          onChange={handleEndDateChange}
                          className={
                            'leading-4 p-2 focus:outline-none focus:ring shadow-sm text-base border-2 border-gray-300 rounded-md text-black ml-1'
                          }
                        />
                      </Form.InputWrapper>
                    </div>
                  </div>

                  <div className='flex items-center justify-end p-2 border-t border-solid border-gray-300 rounded-b'>
                    <button
                      className={`bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ${
                        !datesFilled && 'opacity-50 cursor-not-allowed'
                      }`}
                      type='button'
                      style={{ transition: 'all .15s ease' }}
                      onClick={() => {
                        setShowModal(false);
                        props.onFilter && props.onFilter(startDate, endDate);
                        setStartDate(null);
                        setEndDate(null);
                        setDatesFilled(false);
                      }}
                      disabled={!datesFilled}
                    >
                      Yes
                    </button>
                    <button
                      className='bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1'
                      type='button'
                      style={{ transition: 'all .15s ease' }}
                      onClick={() => {
                        props.close && props.close();
                        props.onClose && props.onClose();
                        setShowModal(false);
                      }}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
          </>
        )}
      </Container>
    </>
  );
};
