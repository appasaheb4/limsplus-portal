import React, { useEffect, useState, useRef } from 'react';
import { Container } from 'reactstrap';
import _ from 'lodash';
import { Buttons, Icons, ModalImportFile } from '@/library/components';
import { Styles } from '@/config';
import mammoth from 'mammoth';

// import MDEditor from '@uiw/react-md-editor';

import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import RichTextEditor from 'quill-react-commercial';
import 'quill-react-commercial/lib/index.css';

const modules1 = {
  codeHighlight: true,
  table: {
    operationMenu: {
      insertColumnRight: {
        text: 'Insert Column Right',
      },
    }, // Generally not required
    backgroundColors: {
      colors: ['#4a90e2', '#999'], // backgroundcolor of table cell, default: ['#dbc8ff', '#6918b4', '#4a90e2', '#999', '#fff']
      text: 'Background Colors', // default: 'Background Colors'
    },
    toolBarOptions: {
      dialogRows: 3, // default: 9
      dialogColumns: 4, // default: 9
      i18: 'en',
    }, // when click table in toorbar, the configs of the dialog
  }, // default: false
  imageResize: true, // default: true
  imageDrop: true, // default: true
  magicUrl: true, // Automatically recognize URLs, emails, etc., and add LinkBlot; default: true
  markdown: true, // Automatically support markdown and convert to rich text; default: true
  link: true, // default: true
  // imageHandler: {
  //   imgUploadApi?: (formData: FormData) => Promise<string>,
  //   uploadSuccCB?: (data: unknown) => void,
  //   uploadFailCB?: (error: unknown) => void,
  //   imgRemarkPre?: 'Fig. ',
  //   maxSize?: 2,
  //   imageAccept?: string,
  // },
  toolbarOptions: [
    ['undo', 'redo'],
    [
      { font: ['wsYaHei', 'songTi', 'serif', 'arial'] },
      { size: ['12px', '14px', '18px', '36px'] },
    ],
    [{ color: [] }, { background: [] }],
    ['bold', 'italic', 'underline', 'strike'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { list: 'check' },
      { indent: '-1' },
      { indent: '+1' },
      { align: [] },
    ],
    [
      'blockquote',
      'code-block',
      'link',
      'image',
      { script: 'sub' },
      { script: 'super' },
      'table',
      'clean',
    ],
  ],
};

// // let SizeStyle = Quill.import('attributors/style/size');
// // SizeStyle.whitelist = ['10px', '15px', '18px', '20px', '32px', '54px'];
// // Quill.register(SizeStyle, true);
// const Font = ReactQuill.Quill.import('formats/font');
// Font.whitelist = ['large', 'medium', 'small', 'regular', 'bold', 'pullquote'];
// ReactQuill.Quill.register(Font, true);

// const modules = {
//   toolbar: [
//     [{ header: ['1', '2', '3', '4', '5', '6'] }, { font: [] }],
//     [
//       {
//         size: ['small', false, 'large', 'huge'],
//       },
//     ],
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

// const formats = [
//   'header',
//   'mention',
//   'bold',
//   'italic',
//   'underline',
//   'strike',
//   'blockquote',
//   'code-block',
//   'color',
//   'table',
//   'font',
//   'list',
//   'bullet',
//   'indent',
//   'link',
//   'image',
//   'video',
// ];

interface ModalDocxContentProps {
  title?: string;
  visible: boolean;
  details?: any;
  status?: boolean;
  onUpdate: (details: string) => void;
  onClose: () => void;
}

export const ModalDocxContent = ({
  title = 'Update details',
  visible,
  details = '{"ops":[{"insert":"Hello quill-react-commercial!\\n"}]}',
  status = false,
  onUpdate,
  onClose,
}: ModalDocxContentProps) => {
  const editor = useRef<any>();
  const [value, setValue] = useState(details);
  const [showModal, setShowModal] = React.useState(visible);
  const [modalDetail, setModalDetail] = useState<any>();

  const quill = useRef<any>(null);
  const getQuill = quillIns => {
    quill.current = quillIns;
  };

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

  function quillGetHTML(inputDelta) {
    var tempQuill = new Quill(document.createElement('div'));
    tempQuill.setContents(inputDelta);
    return tempQuill.root.innerHTML;
  }

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
                        {/* <ReactQuill
                          ref={editor}
                          placeholder='Type here'
                          theme='snow'
                          value={value}
                          modules={modules}
                          formats={formats}
                          readOnly={status}
                          onChange={details => {
                            console.log({ details });
                            setValue(details);
                          }}
                        /> */}
                        {/* <MDEditor
                          value={value}
                          onChange={details => {
                            console.log({ details });
                            setValue(details);
                          }}
                          autoFocus
                          tabSize={50}
                          defaultTabEnable
                          height={window.outerHeight / 2 + 60}
                        /> */}
                        {/* <MDEditor.Markdown
                          source={value}
                          style={{ whiteSpace: 'pre-wrap' }}
                        /> */}
                        <RichTextEditor
                          getQuill={getQuill}
                          content={quill.current}
                          modules={modules1 as any}
                          onChange={details => {
                            quill.current = details;
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
                          onUpdate && onUpdate(JSON.stringify(quill.current));
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
