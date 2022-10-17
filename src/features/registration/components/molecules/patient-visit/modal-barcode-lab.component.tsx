/* eslint-disable  */
import React, {useEffect, useRef} from 'react';
import {Container} from 'reactstrap';
import Barcode from 'react-barcode';
import ReactToPrint from 'react-to-print';
import './barcode.css';
interface ModalBarcodeLabProps {
  visible?: boolean;
  title?: string;
  data?: any;
  onClick: (data: any, item: any, index: number) => void;
  onClose: () => void;
  onReceiptUpload: (file: any, type: string) => void;
}

export const ModalBarcodeLab = ({
  visible = false,
  data,
  onClose,
  onReceiptUpload,
}: ModalBarcodeLabProps) => {
  const [showModal, setShowModal] = React.useState(visible);
  const barCodeRef = useRef<any>();

  useEffect(() => {
    setShowModal(visible);
  }, [visible]);

  return (
    <Container>
      {showModal && (
        <>
          <div className='justify-center items-center  overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
            <div className='relative w-auto my-6 mx-auto max-w-3xl'>
              <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                <div className='flex items-start justify-between p-3 border-b border-solid border-gray-300 rounded-t'>
                  <h3 className='text-3xl font-semibold'>
                    {'Are you sure print barcode?'}
                  </h3>
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
                <div className='relative p-2 flex-auto'>
                  <div className='flex flex-row items-center justify-center'>
                    <Barcode value={data?.value} ref={barCodeRef} />
                  </div>
                </div>
                <div className='flex items-center justify-end p-3 border-t border-solid border-gray-300 rounded-b gap-4'>
                  <button
                    className='text-red-500 background-transparent font-bold uppercase text-sm outline-none w-20 rounded-md p-1 border border-gray-400 shadow-lg focus:outline-none'
                    type='button'
                    style={{transition: 'all .15s ease'}}
                    onClick={() => {
                      setShowModal(false);
                      onClose && onClose();
                    }}
                  >
                    No
                  </button>
                  <ReactToPrint
                    trigger={() => (
                      <button
                        className='text-red-500 background-transparent font-bold uppercase  text-sm  w-20 rounded-md p-1 border border-gray-400 shadow-lg outline-none focus:outline-none'
                        type='button'
                        style={{transition: 'all .15s ease'}}
                        onClick={async () => {}}
                      >
                        Yes
                      </button>
                    )}
                    content={() => barCodeRef?.current}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
        </>
      )}
    </Container>
  );
};
