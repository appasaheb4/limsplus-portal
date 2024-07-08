import React, { useEffect, useState, useRef } from 'react';
import { Container } from 'reactstrap';
import { observer } from 'mobx-react';
import _ from 'lodash';
import {
  ModalImportFile,
  AutoCompleteFilterMutiSelectMultiFieldsDisplay,
} from '@/library/components';
import JoditEditor from 'jodit-react';
import 'jodit/esm/plugins/resizer/resizer';
import { useStores } from '@/stores';
import { ModalReportHtmlView } from './modal-report-html-view.component';
import Ruler from '@scena/ruler';

interface ModalDocxContentProps {
  title?: string;
  visible: boolean;
  testName?: string;
  details?: any;
  department?: string;
  folder?: string;
  isEditable?: boolean;
  isLibraryImport?: boolean;
  onUpdate: (details: string) => void;
  onClose: () => void;
}

export const ModalDocxContent = observer(
  ({
    title = 'Update details',
    visible,
    testName = '',
    details = '',
    department = '',
    folder = 'patient-reports',
    isEditable = false,
    isLibraryImport = false,
    onUpdate,
    onClose,
  }: ModalDocxContentProps) => {
    const editor = useRef<any>();
    const [showModal, setShowModal] = useState(visible);
    const [modalReportHtmlView, setModalReportHtmlView] = useState<any>({
      visible: false,
    });
    const [modalDetail, setModalDetail] = useState<any>();
    const [content, setContent] = useState('');
    const [selectedItems, setSelectedItems] = useState<any>();
    const selectedItemsRef = useRef<any>();

    const { libraryStore } = useStores();

    useEffect(() => {
      setShowModal(visible);
      setContent(`<p>${testName}</p><p><br></p>` + details);
      if (department) {
        libraryStore.libraryService.filterByFields({
          input: {
            filter: {
              fields: ['department'],
              srText: department,
            },
            page: 0,
            limit: 10,
          },
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible]);
    // ruler
    useEffect(() => {
      if (showModal)
        setTimeout(() => {
          const ruler1 = new Ruler(
            document.querySelector('.ruler.horizontal') as HTMLElement,
            {
              type: 'horizontal',
            },
          );
          const ruler2 = new Ruler(
            document.querySelector('.ruler.vertical') as HTMLElement,
            {
              type: 'vertical',
              direction: 'start',
            },
          );
          window.addEventListener('resize', () => {
            ruler1.resize();
            ruler2.resize();
          });
        }, 1000);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showModal]);

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
                  <div
                    className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'
                    style={{
                      height: window.outerHeight / 1.3,
                    }}
                  >
                    {/*header*/}
                    <div className='flex items-center justify-between p-2 border-b border-solid border-gray-300 rounded-t'>
                      <h3 className='text-3xl font-semibold'>{title}</h3>

                      <div
                        className={`flex flex-row  items-center ${
                          isLibraryImport ? 'shown' : 'hidden'
                        }`}
                      >
                        <span className='text-xl w-full font-semibold'>
                          Import from library
                        </span>
                        <AutoCompleteFilterMutiSelectMultiFieldsDisplay
                          loader={false}
                          placeholder='Search by libraryCode'
                          data={{
                            list: libraryStore.listLibrary?.filter(
                              item =>
                                item.status == 'A' &&
                                item.department == department,
                            ),
                            selected: selectedItemsRef.current,
                            displayKey: ['libraryCode', 'description'],
                          }}
                          hasError={false}
                          onUpdate={item => {
                            const items = selectedItemsRef.current;
                            const details: any = [];
                            items?.filter(item => {
                              details.push(item?.details);
                            });
                            setContent(
                              `<p>${testName}</p><p><br></p>` +
                                details?.join('<br/>'),
                            );
                            libraryStore.updateLibraryList(
                              libraryStore.listLibraryCopy,
                            );
                          }}
                          onFilter={(value: string) => {
                            libraryStore.libraryService.filterByFields({
                              input: {
                                filter: {
                                  fields: ['libraryCode', 'description'],
                                  srText: value,
                                },
                                page: 0,
                                limit: 10,
                              },
                            });
                          }}
                          onSelect={item => {
                            let library = selectedItemsRef.current;
                            if (!item.selected) {
                              if (library && library.length > 0) {
                                library.push(item);
                              } else library = [item];
                            } else {
                              library = library?.filter(items => {
                                return items._id !== item._id;
                              });
                            }
                            const details: any = [];
                            library?.filter(item => {
                              details.push(item?.details);
                            });
                            setContent(
                              `<p>${testName}</p><p><br></p>` +
                                details?.join('<br/>'),
                            );
                            selectedItemsRef.current = library;
                            setSelectedItems(library);
                          }}
                        />
                      </div>
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
                    <div className='relative p-2'>
                      <div className='grid grid-cols-1'>
                        <div
                          className={`flex  ruler horizontal h-10 w[${
                            screen.width / 1.3
                          }px]`}
                        ></div>
                        <div className='flex  ruler vertical h-[560px]'></div>
                        <div className='flex absolute mt-12 ml-12 w-full'>
                          <JoditEditor
                            ref={editor}
                            config={
                              {
                                height: 540,
                                width: window.innerWidth / 1.3,
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
                                  //url: 'http://localhost:8080/api/assets/uploadFile',
                                  url: 'https://limsplus-service.azurewebsites.net/api/assets/uploadFile',
                                  prepareData: function (data) {
                                    data.append('folder', folder);
                                    data.delete('path');
                                    data.delete('source');
                                  },
                                  isSuccess: function (resp) {
                                    setContent(
                                      content.concat(
                                        `<img src=${resp?.data?.data} alt="logo"/>`,
                                      ),
                                    );
                                  },
                                },
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
                      <button
                        className='bg-slate-500 text-white font-bold uppercase p-2 text-sm outline-none focus:outline-none mr-1 mb-1 rounded'
                        type='button'
                        style={{ transition: 'all .15s ease' }}
                        onClick={() => {
                          setModalReportHtmlView({
                            visible: true,
                            details: content,
                          });
                        }}
                      >
                        Preview
                      </button>
                      {isEditable && (
                        <button
                          className='bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm p-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1'
                          type='button'
                          style={{ transition: 'all .15s ease' }}
                          onClick={() => {
                            // const regex = /(^|;)\s*font-[^;]+/g;
                            const regex = /style=(.*)font-[^;]+;/g;
                            // const regex = /style=(.*)font-family[^;]+;/g;
                            const subst = '';
                            const result = content.replace(regex, subst);
                            onUpdate && onUpdate(result);
                            onUpdate && onUpdate(content);
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
