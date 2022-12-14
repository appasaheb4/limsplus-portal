import React, {useEffect, useState} from 'react';
import {Container} from 'reactstrap';
import {Form} from '../..';

interface ModalProps {
  show?: boolean;
  title?: string;
  type?: string;
  body?: string;
  click: (type?: string) => void;
  close: () => void;
}

export const ModalConfirm = (props: ModalProps) => {
  const [showModal, setShowModal] = React.useState(props.show);
  useEffect(() => {
    setShowModal(props.show);
  }, [props]);

  return (
    <Container>
      {showModal && (
        <>
          <div className='justify-center items-center  overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
            <div className='relative w-auto my-6 mx-auto max-w-3xl'>
              {/*content*/}
              <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                {/*header*/}
                <div className='flex items-start justify-between p-2 border-b border-solid border-gray-300 rounded-t'>
                  <h3 className='text-3xl font-semibold'>{props.title}</h3>
                </div>
                {/*body*/}
                {props.body && (
                  <>
                    <div className='relative p-2 flex-auto'>
                      <p className='my-4 text-gray-600 text-lg leading-relaxed'>
                        {props.body}
                      </p>
                    </div>
                  </>
                )}

                {/*footer*/}
                <div className='flex items-center justify-end p-2 border-t border-solid border-gray-300 rounded-b'>
                  <button
                    className='bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1'
                    type='button'
                    style={{transition: 'all .15s ease'}}
                    onClick={() => {
                      setShowModal(false);
                    }}
                  >
                    No
                  </button>
                  <button
                    className='bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1'
                    type='button'
                    style={{transition: 'all .15s ease'}}
                    onClick={() => {
                      setShowModal(false);
                      props.click(props.type);
                    }}
                  >
                    Yes
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

interface ModalImportFileProps {
  show?: boolean;
  title?: string;
  btnLabel?: string;
  body?: string;
  accept?: string;
  click: (file: any) => void;
  close: () => void;
}

export const ModalImportFile = (props: ModalImportFileProps) => {
  const [showModal, setShowModal] = React.useState(props.show);
  const [file, setFile] = useState<any>(null);
  useEffect(() => {
    setShowModal(props.show);
  }, [props]);
  return (
    <Container>
      {showModal && (
        <>
          <div className='justify-center items-center  overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
            <div className='relative w-auto my-6 mx-auto max-w-3xl'>
              {/*content*/}
              <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                {/*header*/}
                <div className='flex items-start justify-between p-2 border-b border-solid border-gray-300 rounded-t'>
                  <h3 className='text-3xl font-semibold'>{props.title}</h3>
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
                {/*body*/}
                <div className='relative p-2 flex-auto'>
                  <Form.InputFile
                    label='Import'
                    id='file'
                    accept={props.accept}
                    placeholder='Import File'
                    onChange={(e: any) => setFile(e.target.files[0])}
                  />
                </div>
                {/*footer*/}
                <div className='flex items-center justify-end p-2 border-t border-solid border-gray-300 rounded-b'>
                  <button
                    className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1'
                    type='button'
                    style={{transition: 'all .15s ease'}}
                    onClick={() => {
                      props.close();
                      setShowModal(false);
                    }}
                  >
                    Close
                  </button>
                  <button
                    className='bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1'
                    type='button'
                    style={{transition: 'all .15s ease'}}
                    onClick={() => {
                      if (file) {
                        setShowModal(false);
                        props.click(file);
                      }
                    }}
                  >
                    {props.btnLabel || 'Import'}
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
