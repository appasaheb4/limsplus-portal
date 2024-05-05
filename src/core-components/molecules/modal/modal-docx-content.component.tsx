import React, { useEffect, useState, useRef } from 'react';
import { Container } from 'reactstrap';

import { Buttons, Icons, ModalImportFile } from '@/library/components';
import { Styles } from '@/config';
import mammoth from 'mammoth';

import quillTable from 'quill-table';
import ReactQuill, { Quill } from 'react-quill';
// import Mention from 'quill-mention';
import 'quill-mention/dist/quill.mention.min.css';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

const atValues = [
  { id: 1, value: 'Fredrik Sundqvist' },
  { id: 2, value: 'Patrik Sjölin' },
];
const hashValues = [
  { id: 3, value: 'Fredrik Sundqvist 2' },
  { id: 4, value: 'Patrik Sjölin 2' },
];

Quill.register(quillTable.TableCell);
Quill.register(quillTable.TableRow);
Quill.register(quillTable.Table);
Quill.register(quillTable.Contain);
Quill.register('modules/table', quillTable.TableModule);
const maxRows = 8;
const maxCols = 5;

const tableOptions: any = [];
for (let r = 1; r <= maxRows; r++) {
  for (let c = 1; c <= maxCols; c++) {
    tableOptions.push('newtable_' + r + '_' + c);
  }
}

const editorModules = {
  table: false, /// disable table module
  tableUI: false,
  toolbar: [
    [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'video', 'image'],
    ['clean'],
    ['code-block'],
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],
    [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
    [{ direction: 'rtl' }, { table: tableOptions }],
  ],
  // mention: {
  //   allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
  //   mentionDenotationChars: ['@', '#'],
  //   source: function (searchTerm, renderList, mentionChar) {
  //     let values;

  //     if (mentionChar === '@') {
  //       values = atValues;
  //     } else {
  //       values = hashValues;
  //     }

  //     if (searchTerm.length === 0) {
  //       renderList(values, searchTerm);
  //     } else {
  //       const matches: any = [];
  //       for (let i = 0; i < values.length; i++)
  //         if (~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase()))
  //           matches.push(values[i]);
  //       renderList(matches, searchTerm);
  //     }
  //   },
  // },
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: true,
  },
};

// const modules = {
//   toolbar: [
//     [{ header: ['1', '2', '3', '4', '5', '6'] }, { font: [] }],
//     [{ size: ['12px', '16px', '24px', '36px'] }],
//     ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//     [{ color: [] }, { background: [] }],
//     [{ align: [] }],
//     [{ indent: '-1' }, { indent: '+1' }],
//     [
//       { list: 'ordered' },
//       { list: 'bullet' },
//       { indent: '-1' },
//       { indent: '+1' },
//     ],
//     ['table', 'link', 'image', 'video'],
//     ['clean'],
//   ],
//   clipboard: {
//     matchVisual: false,
//   },
//   history: {
//     delay: 500,
//     maxStack: 100,
//     userOnly: true,
//   },
// };

const formats = [
  'header',
  'mention',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'code-block',
  'color',
  'table',
  'font',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
];

interface ModalDocxContentProps {
  title?: string;
  visible: boolean;
  details?: string;
  status?: boolean;
  onUpdate: (details: string) => void;
  onClose: () => void;
}

export const ModalDocxContent = ({
  title = 'Update details',
  visible,
  details,
  status = false,
  onUpdate,
  onClose,
}: ModalDocxContentProps) => {
  const editor = useRef<any>();
  const [value, setValue] = useState(details);
  const [showModal, setShowModal] = React.useState(visible);
  const [modalDetail, setModalDetail] = useState<any>();

  useEffect(() => {
    setShowModal(visible);
    setValue(details);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const handleFileChange = async (file: any) => {
    const reader = new FileReader();
    reader.addEventListener('load', async (e: any) => {
      const arrayBuffer: any = e.target.result;
      const result = await mammoth.extractRawText({ arrayBuffer });
      setValue(result.value);
    });
    reader.readAsArrayBuffer(file);
  };

  return (
    <>
      <Container>
        {showModal && (
          <>
            <div className='justify-center items-center  overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
              <div
                className='relative  my-6 mx-auto'
                style={{
                  height: '842px',
                  width: '595px',
                  /* to centre page on screen*/
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                {/*content*/}
                <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                  {/*header*/}
                  <div className='flex items-start justify-between p-2 border-b border-solid border-gray-300 rounded-t'>
                    <h3 className='text-3xl font-semibold'>{title}</h3>
                    {!status && (
                      <>
                        <Buttons.Button
                          size='medium'
                          type='outline'
                          onClick={() => {
                            setModalDetail({
                              show: true,
                              title: 'Import Doc File',
                            });
                          }}
                        >
                          <span className='flex flex-row'>
                            <Icons.EvaIcon
                              icon='arrowhead-down-outline'
                              size='medium'
                              color={Styles.COLORS.BLACK}
                            />
                            Import
                          </span>
                        </Buttons.Button>
                      </>
                    )}
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
                        <ReactQuill
                          ref={editor}
                          placeholder='Type here'
                          theme='snow'
                          value={value}
                          modules={editorModules}
                          formats={formats}
                          readOnly={status}
                          onChange={details => {
                            console.log({ details });
                            setValue(details);
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
                    {!status && (
                      <button
                        className='bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm p-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1'
                        type='button'
                        style={{ transition: 'all .15s ease' }}
                        onClick={() => {
                          onUpdate && onUpdate(value || '');
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
          handleFileChange(file);
        }}
        close={() => {
          setModalDetail({ show: false });
        }}
      />
    </>
  );
};
