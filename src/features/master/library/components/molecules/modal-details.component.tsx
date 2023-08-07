import React, {useEffect, useState} from 'react';
import {Container} from 'reactstrap';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
  toolbar: [
    [{header: '1'}, {header: '2'}, {font: []}],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{list: 'ordered'}, {list: 'bullet'}, {indent: '-1'}, {indent: '+1'}],
    ['link'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

interface ModalDetailsProps {
  visible: boolean;
  details: string;
  onUpdate: (details: string) => void;
  onClose: () => void;
}

const ModalDetails = ({
  visible,
  details,
  onUpdate,
  onClose,
}: ModalDetailsProps) => {
  const [value, setValue] = useState(details);
  const [showModal, setShowModal] = React.useState(visible);

  useEffect(() => {
    setShowModal(visible);
    setValue(details);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);
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
                  <h3 className='text-3xl font-semibold'>Update details</h3>
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
                <div className='relative p-2 flex-auto'>
                  <div className='grid grid-cols-2 gap-2'>
                    <div>
                      <ReactQuill
                        placeholder='Type here'
                        theme='snow'
                        value={value}
                        modules={modules}
                        onChange={details => {
                          setValue(details);
                        }}
                      />
                    </div>
                    <div dangerouslySetInnerHTML={{__html: value}} />
                  </div>
                </div>
                {/*footer*/}
                <div className='flex items-center justify-end p-2 border-t border-solid border-gray-300 rounded-b'>
                  <button
                    className='text-red-500 background-transparent font-bold uppercase p-2 text-sm outline-none focus:outline-none mr-1 mb-1'
                    type='button'
                    style={{transition: 'all .15s ease'}}
                    onClick={() => {
                      setShowModal(false);
                      onClose && onClose();
                    }}
                  >
                    Close
                  </button>
                  <button
                    className='bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm p-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1'
                    type='button'
                    style={{transition: 'all .15s ease'}}
                    onClick={() => {
                      onUpdate && onUpdate(value);
                    }}
                  >
                    Upload
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

export default ModalDetails;
