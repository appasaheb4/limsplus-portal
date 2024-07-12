import React, { useEffect, useState, useRef } from 'react';
import { Container } from 'reactstrap';
import { observer } from 'mobx-react';
import _ from 'lodash';
import Payment from '@/features/account-receivable/payment/screens/payment.screen';

interface ModalPaymentProps {
  title?: string;
  visible: boolean;
  onClick: (details: string) => void;
  onClose: () => void;
}

export const ModalPayment = observer(
  ({ title = 'Payment', visible, onClick, onClose }: ModalPaymentProps) => {
    const [showModal, setShowModal] = useState(visible);
    useEffect(() => {
      setShowModal(visible);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible]);

    return (
      <>
        <Container>
          {showModal && (
            <>
              <div className='justify-center items-center  overflow-x-hidden overflow-y-auto fixed inset-0 z-50 ml-60  outline-none focus:outline-none'>
                <div
                  className='relative  my-6  mx-auto editor'
                  style={{
                    width: '95%',
                  }}
                >
                  {/*content*/}
                  <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                    {/*header*/}
                    <div className='flex items-center justify-between p-2 border-b border-solid border-gray-300 rounded-t'>
                      <h3 className='text-3xl font-semibold'>{title}</h3>

                      <button
                        className='p-1  border-0 text-black opacity-1 ml-6 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                        onClick={() => {
                          setShowModal(false);
                          onClose && onClose();
                        }}
                      >
                        <span className=' text-black h-6 w-6 text-2xl block outline-none focus:outline-none'>
                          ×
                        </span>
                      </button>
                    </div>
                    {/*body*/}
                    <div className='flex flex-col overflow-scroll  min-h-[560px]'>
                      <Payment
                        isFullAccess={false}
                        onSubmit={details => {
                          onClose && onClose();
                        }}
                      />
                    </div>
                    {/*footer*/}
                    <div className='flex items-center justify-end p-2 border-t border-solid border-gray-300 rounded-b'>
                      <button
                        className='text-red-500 background-transparent font-bold uppercase p-2 text-sm outline-none focus:outline-none mr-1 mb-1'
                        type='button'
                        style={{ transition: 'all .15s ease' }}
                        onClick={() => {
                          setShowModal(false);
                          onClose && onClose();
                        }}
                      >
                        Close
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
  },
);
