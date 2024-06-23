import React, { useEffect, useState, useRef } from 'react';
import { Container } from 'reactstrap';
import { observer } from 'mobx-react';
import _ from 'lodash';
import JoditEditor from 'jodit-react';
import 'jodit/esm/plugins/resizer/resizer';
import { useStores } from '@/stores';
import { ModalReportHtmlView } from './modal-report-html-view.component';

interface ModalDocxContentProps {
  visible: boolean;
  onClose: () => void;
}

export const ModalDocxContentInput = observer(
  ({ visible, onClose }: ModalDocxContentProps) => {
    const editor = useRef<any>();
    const [showModal, setShowModal] = useState(visible);
    const [modalReportHtmlView, setModalReportHtmlView] = useState<any>({});
    const { libraryStore } = useStores();

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
                  className='relative  my-6  mx-auto '
                  style={{
                    width: '100vh',
                  }}
                >
                  {/*content*/}
                  <div
                    className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'
                    style={{
                      height: window.outerHeight / 2 + 50,
                    }}
                  >
                    <div className='flex items-center justify-between p-2 border-b border-solid border-gray-300 rounded-t'>
                      <h3 className='text-3xl font-semibold'>Details</h3>
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
                        <div id='editor'>
                          <JoditEditor
                            ref={editor}
                            value={libraryStore.library.details || ''}
                            config={
                              {
                                height: 400,
                                disabled: false,
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
                                uploader: {
                                  url: 'https://limsplus-service.azurewebsites.net/api/assets/uploadFile',
                                  prepareData: function (data) {
                                    data.append('folder', 'library');
                                    data.delete('path');
                                    data.delete('source');
                                  },
                                  isSuccess: function (resp) {
                                    libraryStore.updateLibrary({
                                      ...libraryStore.library,
                                      details:
                                        libraryStore.library.details?.concat(
                                          `<img src=${resp?.data?.data} alt="logo"/>`,
                                        ),
                                    });
                                  },
                                },
                              } as any
                            }
                            onBlur={newContent => {
                              libraryStore.updateLibrary({
                                ...libraryStore.library,
                                details: newContent,
                              });
                            }}
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
                      <button
                        className='bg-slate-500 text-white font-bold uppercase p-2 text-sm outline-none focus:outline-none mr-1 mb-1 rounded'
                        type='button'
                        style={{ transition: 'all .15s ease' }}
                        onClick={() => {
                          setModalReportHtmlView({
                            visible: true,
                            details: libraryStore.library.details,
                          });
                        }}
                      >
                        Preview
                      </button>
                      <button
                        className='bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm p-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1'
                        type='button'
                        style={{ transition: 'all .15s ease' }}
                        onClick={() => {
                          setShowModal(false);
                          onClose && onClose();
                        }}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
            </>
          )}
        </Container>
        <ModalReportHtmlView
          {...modalReportHtmlView}
          onClose={() => {
            setModalReportHtmlView({ visible: false });
          }}
        />
      </>
    );
  },
);
