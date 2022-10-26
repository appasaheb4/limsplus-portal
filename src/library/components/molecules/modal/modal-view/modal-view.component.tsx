import React, {useEffect} from 'react';
import {Container} from 'reactstrap';

export interface ModalViewProps {
  visible?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

export const ModalView = ({visible, onClose, children}: ModalViewProps) => {
  //   const [showModal, setShowModal] = React.useState(visible);
  //   useEffect(() => {
  //     setShowModal(visible);
  //   }, [visible]);

  return (
    <Container>
      {visible && (
        <>
          <div
            className='justify-center items-center  overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'
            onClick={() => {
              onClose && onClose();
            }}
          >
            <div className='relative w-auto my-6 mx-auto max-w-3xl'>
              {/*content*/}
              <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                {/*header*/}
                <div className='flex justify-end p-2 border-b border-solid border-gray-300 rounded-t'>
                  <button
                    className='border-0 text-black opacity-1  text-3xl leading-none font-semibold outline-none focus:outline-none'
                    onClick={() => {
                      onClose && onClose();
                    }}
                  >
                    <span className=' text-black h-6 w-6 text-2xl block outline-none focus:outline-none'>
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className='p-2'>{children}</div>
              </div>
            </div>
          </div>
          <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
        </>
      )}
    </Container>
  );
};
