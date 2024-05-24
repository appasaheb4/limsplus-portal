import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Container } from 'reactstrap';
import _ from 'lodash';
import { ModalImportFile } from '@/library/components';
import JoditEditor, { Jodit } from 'jodit-react';
import 'jodit/esm/plugins/resizer/resizer';

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

  // Jodit.make('#editor', {
  //   controls: {
  //     font: {
  //       component: 'select',
  //     },
  //   },
  // });

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
                      <div id='editor'>
                        <JoditEditor
                          ref={editor}
                          config={
                            {
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
                              uploader: {
                                //url: 'http://localhost:8082/api/assets/uploadFile',
                                //url: 'http://localhost:8080/assets/uploadFile',
                                url: 'https://limsplus-service.azurewebsites.net/assets/uploadFile',
                                prepareData: function (data) {
                                  data.append('folder', 'patient-reports');
                                  data.delete('path');
                                  data.delete('source');
                                },
                                isSuccess: function (resp) {
                                  setContent(
                                    content.concat(
                                      `<img src=${resp?.data?.data} alt="logo" style="width:200;height:200"/>`,
                                    ),
                                  );
                                },
                              },
                              // uploader: {
                              //   insertImageAsBase64URI: false,
                              //   imagesExtensions: ['jpg', 'png', 'jpeg', 'gif'],
                              //   withCredentials: false,
                              //   format: 'json',
                              //   method: 'POST',
                              //   url: 'http://localhost:8082/api/assets/uploadFile',
                              //   body: {
                              //     folder: 'patient-reports',
                              //   },
                              //   headers: {
                              //     'Content-Type': [
                              //       'application/json; charset=utf-8',
                              //       'multipart/form-data',
                              //     ],
                              //   },
                              //   prepareData: function (data) {
                              //     data.append('folder', 'patient-reports');
                              //     console.log({ data });
                              //     return data;
                              //   },
                              //   isSuccess: function (resp) {
                              //     return !resp.error;
                              //   },
                              //   getMsg: function (resp) {
                              //     return resp.msg.join !== undefined
                              //       ? resp.msg.join(' ')
                              //       : resp.msg;
                              //   },
                              //   process: function (resp) {
                              //     console.log({ resp });

                              //     return {
                              //       files: [resp.data],
                              //       path: '',
                              //       baseurl: '',
                              //       error: resp.error ? 1 : 0,
                              //       msg: resp.msg,
                              //     };
                              //   },
                              //   defaultHandlerSuccess: function (data, resp) {
                              //     const files = data.files || [];
                              //     if (files.length) {
                              //       console.log({ file: files[0] });
                              //       // this.selection.insertImage(
                              //       //   files[0],
                              //       //   null,
                              //       //   250,
                              //       // );
                              //     }
                              //   },
                              //   defaultHandlerError: function (resp) {
                              //     console.log({ resp });
                              //     // this.events.fire(
                              //     //   'errorPopap',
                              //     //   this.i18n(resp.msg),
                              //     // );
                              //   },
                              // },
                            } as any
                          }
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
                          console.log({ result });
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
        }}
        close={() => {
          setModalDetail({ show: false });
        }}
      />
    </>
  );
};
