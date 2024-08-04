import React, { useEffect } from 'react';
import { Container } from 'reactstrap';

interface ModalFullViewReportProps {
  show?: boolean;
  title?: string;
  type?: string;
  body?: string;
  close: () => void;
  children?: React.ReactNode;
}

export const ModalFullViewReport = (props: ModalFullViewReportProps) => {
  const [showModal, setShowModal] = React.useState(props.show);
  useEffect(() => {
    setShowModal(props.show);
  }, [props]);

  return (
    <Container>
      {showModal && (
        <>
          <div className='justify-center items-center  overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
            <div className='relative w-auto my-5 mx-auto max-w-7xl'>
              <div className='border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none'>
                <div className='flex items-start justify-between p-2 border-b border-solid border-gray-300 rounded-t'>
                  <h3 className='text-xl font-semibold'>{props.title}</h3>

                  <div className='flex gap-4'>
                    <button
                      className='p-1  border-0 text-black opacity-1 ml-6 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                      onClick={() => {
                        props.close();
                        setShowModal(false);
                      }}
                    >
                      <span className=' text-black h-6 w-6 text-2xl block outline-none focus:outline-none'>
                        ×
                      </span>
                    </button>
                  </div>
                </div>
                <div className='flex p-2 w-auto h-auto '>{props.children}</div>
              </div>
            </div>
          </div>
          <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
        </>
      )}
    </Container>
  );
};
