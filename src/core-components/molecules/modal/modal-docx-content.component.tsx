import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Container } from 'reactstrap';
import _ from 'lodash';
import { ModalImportFile } from '@/library/components';
import JoditEditor, { Jodit } from 'jodit-react';

interface ModalDocxContentProps {
  title?: string;
  visible: boolean;
  details?: any;
  isEditable?: boolean;
  onUpdate: (details: string) => void;
  onClose: () => void;
}

export const ModalDocxContent = ({
  title = 'Update details',
  visible,
  details = '',
  isEditable = false,
  onUpdate,
  onClose,
}: ModalDocxContentProps) => {
  const editor = useRef<any>();
  const [showModal, setShowModal] = React.useState(visible);
  const [modalDetail, setModalDetail] = useState<any>();

  const [content, setContent] = useState('');

  useEffect(() => {
    setShowModal(visible);
    setContent(details);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  return (
    <>
      <Container>
        {showModal && (
          <>
            <div className='justify-center items-center  overflow-x-hidden overflow-y-auto fixed inset-0 z-50 ml-60  outline-none focus:outline-none'>
              <div
                className='relative  my-6  mx-auto '
                style={{
                  width: '95%',
                }}
              >
                {/*content*/}
                <div
                  className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'
                  style={{
                    height: window.outerHeight / 2 + 200,
                  }}
                >
                  {/*header*/}
                  <div className='flex items-start justify-between p-2 border-b border-solid border-gray-300 rounded-t'>
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
                  <div className='relative p-2 flex-auto'>
                    <div className='grid grid-cols-1'>
                      <div>
                        <JoditEditor
                          ref={editor}
                          config={{
                            height: 540,
                            disabled: !isEditable,
                            events: {
                              afterOpenPasteDialog: (
                                dialog,
                                msg,
                                title,
                                callback,
                              ) => {
                                dialog.close();
                                callback();
                              },
                            },
                          }}
                          value={content || ''}
                          onBlur={newContent => {
                            setContent(newContent);
                          }}
                          onChange={newContent => {}}
                        />
                      </div>
                    </div>
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
                    {isEditable && (
                      <button
                        className='bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm p-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1'
                        type='button'
                        style={{ transition: 'all .15s ease' }}
                        onClick={() => {
                          const regex = /(style=".+?")/gm;
                          const subst = '';
                          const result = content.replace(regex, subst);
                          onUpdate && onUpdate(result);
                        }}
                      >
                        Upload
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
          </>
        )}
      </Container>

      <ModalImportFile
        accept='.docx'
        {...modalDetail}
        click={(file: any) => {
          setModalDetail({ show: false });
          //handleFileChange(file);
        }}
        close={() => {
          setModalDetail({ show: false });
        }}
      />
    </>
  );
};
