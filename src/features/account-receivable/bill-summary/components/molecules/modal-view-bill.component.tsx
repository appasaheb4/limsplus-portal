/* eslint-disable  */
import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import _ from 'lodash';
import { Icons, Tooltip, Form } from '@components';
import { pdf as pdfGen, PDFViewer, Document } from '@react-pdf/renderer';
import { PdfViewBill } from './pdf-view-bill';
import printjs from 'print-js';
import { ModalFullViewReport } from './modal-full-view-report.component';

interface ModalViewBillProps {
  show?: boolean;
  data?: any;
  onClick: () => void;
  onClose: () => void;
}

export const ModalViewBill = ({
  show = false,
  data,
  onClose,
}: ModalViewBillProps) => {
  const [showModal, setShowModal] = React.useState(show);
  const [isWithHeader, setWithHeader] = useState(true);
  const [isPdfViewer, setPdfViewer] = useState(false);
  const [details, setDetails] = useState({});

  useEffect(() => {
    setShowModal(show);
    if (data) setDetails(data);
  }, [show, data]);

  const getReports = variable => {
    const documentTitle = 'Bill Summary Report';
    return (
      <Document title={documentTitle}>
        <PdfViewBill data={variable} isWithHeader={isWithHeader} />
      </Document>
    );
  };

  return (
    <Container>
      {showModal && (
        <>
          <div className='justify-center items-center  overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
            <div className='relative w-auto my-6 mx-auto max-w-3xl'>
              <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                <div className='flex items-start justify-between p-3 border-b border-solid border-gray-300 rounded-t'>
                  <h3 className='text-3xl font-semibold'>{'Bill Summary'}</h3>
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
                <div className='flex items-center justify-center p-4'>
                  <div className='flex  items-center justify-center gap-2'>
                    {data && (
                      <div className='flex flex-col gap-3'>
                        <Form.InputRadio
                          label='Report Type'
                          labelStyle={{ fontWeight: 'bold', fontSize: 16 }}
                          value={isWithHeader ? 'withHeader' : 'withoutHeader'}
                          values={[
                            { value: 'withHeader', label: 'With Header' },
                            { value: 'withoutHeader', label: 'Without Header' },
                          ]}
                          onChange={value => {
                            setWithHeader(value == 'withHeader' ? true : false);
                          }}
                        />
                        <div className='flex flex-row content-center justify-center gap-2'>
                          <Tooltip tooltipText='View'>
                            <Icons.IconContext
                              color='#ffffff'
                              size='25'
                              style={{
                                backgroundColor: '#808080',
                                width: 32,
                                height: 32,
                                borderRadius: 16,
                                align: 'center',
                                padding: 4,
                              }}
                              onClick={async () => {
                                setPdfViewer(true);
                                onClose && onClose();
                              }}
                            >
                              {Icons.getIconTag(Icons.Iconmd.MdOutlinePreview)}
                            </Icons.IconContext>
                          </Tooltip>
                          <Tooltip tooltipText='Print'>
                            <Icons.IconContext
                              color='#ffffff'
                              size='25'
                              style={{
                                backgroundColor: '#808080',
                                width: 32,
                                height: 32,
                                borderRadius: 16,
                                align: 'center',
                                padding: 4,
                              }}
                              onClick={async () => {
                                const doc = await getReports(details);
                                const blob = await pdfGen(doc).toBlob();
                                const blobURL = URL.createObjectURL(blob);
                                printjs({
                                  printable: blobURL,
                                  type: 'pdf',
                                  showModal: true,
                                });
                                onClose && onClose();
                              }}
                            >
                              {Icons.getIconTag(Icons.IconBi.BiPrinter)}
                            </Icons.IconContext>
                          </Tooltip>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className='flex p-3 border-t border-solid border-gray-300 justify-end'>
                  <button
                    className='text-red background-transparent font-bold uppercase  text-sm outline-none focus:outline-none '
                    type='button'
                    style={{ transition: 'all .15s ease' }}
                    onClick={() => {
                      setShowModal(false);
                      onClose && onClose();
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
      <ModalFullViewReport
        title='Bill Summary Reports'
        show={isPdfViewer}
        close={() => {
          setPdfViewer(false);
        }}
        children={
          isPdfViewer ? (
            <PDFViewer
              style={{
                width: window.innerWidth,
                height: window.innerHeight / 1.2,
              }}
              showToolbar={false}
            >
              {getReports(details)}
            </PDFViewer>
          ) : null
        }
      />
    </Container>
  );
};
