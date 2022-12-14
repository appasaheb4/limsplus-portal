/* eslint-disable  */
import React, {useEffect, useState} from 'react';
import {Container} from 'reactstrap';
import _ from 'lodash';
import {Icons, Tooltip, Form} from '@components';
import {pdf} from '@react-pdf/renderer';
import {
  PdfTPRTemp0001,
  PdfTPRTemp0002,
  PdfTPRTemp0003,
  PdfTemp0004,
  PdfTemp0005,
  PdfTemp0006,
} from '@/features/report-builder/report-template/components';
import {saveAs} from 'file-saver';
import {SocialIcon} from 'react-social-icons';
import printjs from 'print-js';

interface ModalGenerateReportsProps {
  show?: boolean;
  title?: string;
  data?: any;
  onClick: (data: any, item: any, index: number) => void;
  onClose: () => void;
  onReceiptUpload: (file: any, type: string) => void;
}

export const ModalGenerateReports = ({
  show = false,
  data,
  onClose,
  onReceiptUpload,
}: ModalGenerateReportsProps) => {
  const [reportList, setReportList] = useState<any>();
  const [showModal, setShowModal] = React.useState(show);
  const [reportType, setReportType] = useState('withHeader');

  useEffect(() => {
    setShowModal(show);
  }, [show]);

  useEffect(() => {
    if (data) {
      let newObj = _.mapKeys(data, (value, key) => key.split(' -')[0]);
      setReportList(newObj);
      console.log({newObj});
    }
  }, [data]);

  const getReports = reports => {
    return (
      <>
        {reports['TEMP0004'] && <PdfTemp0004 data={{}} />}
        {reports['TEMP0004'] && <PdfTemp0005 data={{}} />}
      </>
    );
  };

  // const sharePdfLink = async (type: string) => {
  //   const doc = <PdfTemp0006 data={data} />;
  //   const asPdf = pdf(doc);
  //   asPdf.updateContainer(doc);
  //   const blob: any = await asPdf.toBlob();
  //   blob.name = 'Medical-Report.pdf';
  //   onReceiptUpload(blob, type);
  // };

  return (
    <Container>
      {showModal && (
        <>
          <div className='justify-center items-center  overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
            <div className='relative w-auto my-6 mx-auto max-w-3xl'>
              <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                <div className='flex items-start justify-between p-3 border-b border-solid border-gray-300 rounded-t'>
                  <h3 className='text-3xl font-semibold'>
                    {'Generate Reports'}
                  </h3>
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
                <div className='relative p-2 flex-auto'>
                  <div className='flex flex-row items-center justify-center gap-2'>
                    {data && (
                      <div className='flex flex-col gap-3'>
                        <Form.InputRadio
                          label='Report Type'
                          labelStyle={{fontWeight: 'bold', fontSize: 16}}
                          value={reportType}
                          values={[
                            {value: 'withHeader', label: 'With Header'},
                            {value: 'withoutHeader', label: 'Without Header'},
                          ]}
                          onChange={value => {
                            setReportType(value);
                          }}
                        />
                        <div className='flex flex-row content-center justify-center gap-2'>
                          <Tooltip tooltipText='Download'>
                            <Icons.IconContext
                              color='#fff'
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
                                // const doc = <PdfTemp0006 data={data} />;
                                // const asPdf = pdf(doc);
                                // asPdf.updateContainer(doc);
                                // const blob = await asPdf.toBlob();
                                // saveAs(blob, 'MedicalReport.pdf');
                                getReports(reportList);
                              }}
                            >
                              {Icons.getIconTag(
                                Icons.Iconhi.HiOutlineFolderDownload,
                              )}
                            </Icons.IconContext>
                          </Tooltip>
                          {reportList && getReports(reportList)}
                          {/* <Tooltip tooltipText='Print'>
                            <Icons.IconContext
                              color='#fff'
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
                                const blob = await pdf(
                                  <PdfTemp0006 data={data} />,
                                ).toBlob();
                                const blobURL = URL.createObjectURL(blob);
                                printjs(blobURL);
                              }}
                            >
                              {Icons.getIconTag(Icons.IconBi.BiPrinter)}
                            </Icons.IconContext>
                          </Tooltip> */}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className='flex items-center justify-end p-3 border-t border-solid border-gray-300 rounded-b'>
                  <button
                    className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1'
                    type='button'
                    style={{transition: 'all .15s ease'}}
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
    </Container>
  );
};
