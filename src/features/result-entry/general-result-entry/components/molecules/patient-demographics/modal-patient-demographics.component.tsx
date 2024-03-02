import React, { useEffect } from 'react';
import { Container } from 'reactstrap';

import { PatientDemographicsList } from './patient-demographics-list.components';

interface ModalPatientDemographicsProps {
  show: boolean;
  title?: string;
  data: any;
  type?: string;
  body?: string;
  onClose: () => void;
}

export const ModalPatientDemographics = (
  props: ModalPatientDemographicsProps,
) => {
  const [showModal, setShowModal] = React.useState(props.show);
  useEffect(() => {
    setShowModal(props.show);
  }, [props]);

  return (
    <Container>
      {showModal && (
        <>
          <div
            className='justify-center items-center  overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'
            onClick={() => {
              props.onClose();
              setShowModal(false);
            }}
          >
            <div className='relative w-auto my-6 mx-auto max-w-6xl'>
              {/*content*/}
              <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                {/*header*/}
                <div className='flex items-start justify-between p-2 border-b border-solid border-gray-300 rounded-t'>
                  <h3 className='text-3xl font-semibold'>
                    Patient Demographics
                  </h3>
                  <button
                    className='p-1  border-0 text-black opacity-1 ml-6 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                    onClick={() => {
                      props.onClose();
                      setShowModal(false);
                    }}
                  >
                    <span className=' text-black h-6 w-6 text-2xl block outline-none focus:outline-none'>
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className='flex m-2  overflow-scroll'>
                  <PatientDemographicsList
                    data={props.data || []}
                    totalSize={props.data?.length}
                  />
                </div>

                {/*footer*/}
                <div className='flex items-center justify-end p-2 border-t border-solid border-gray-300 rounded-b'>
                  <button
                    className='text-red-500 background-transparent font-bold uppercase  py-2 text-sm outline-none focus:outline-none'
                    type='button'
                    style={{ transition: 'all .15s ease' }}
                    onClick={() => {
                      props.onClose();
                      setShowModal(false);
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
  );
};
