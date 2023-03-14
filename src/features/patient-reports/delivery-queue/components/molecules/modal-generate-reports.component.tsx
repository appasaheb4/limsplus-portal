/* eslint-disable  */
import React, {useEffect, useState} from 'react';
import {Container} from 'reactstrap';
import _ from 'lodash';
import {Icons, Tooltip, Form, Modal} from '@components';
import {pdf, PDFViewer, Document} from '@react-pdf/renderer';

import {
  PdfTemp0001,
  PdfTemp0002,
  PdfTemp0003,
  PdfTemp0004,
  PdfTemp0005,
  PdfTemp0006,
  PdfTemp0007,
  PdfTemp0008,
} from '@/features/report-builder/report-template/components';

import printjs from 'print-js';

interface ModalGenerateReportsProps {
  show?: boolean;
  title?: string;
  data?: any;
  templateDetails?: any;
  onClick: (data: any, item: any, index: number) => void;
  onClose: () => void;
  onReceiptUpload: (file: any, type: string) => void;
}

export const ModalGenerateReports = ({
  show = false,
  data,
  templateDetails,
  onClose,
  onReceiptUpload,
}: ModalGenerateReportsProps) => {
  const [reportList, setReportList] = useState<any>();
  const [showModal, setShowModal] = React.useState(show);
  const [isWithHeader, setWithHeader] = useState(true);
  const [isPdfViewer, setPdfViewer] = useState(false);

  useEffect(() => {
    setShowModal(show);
  }, [show]);

  useEffect(() => {
    if (data) {
      let newObj = _.mapKeys(data, (value, key) => key.split(' -')[0]);
      setReportList(newObj);
    }
  }, [data]);

  const getReports = reports => {
    const documentTitle = 'Delivery Queue';
    return (
      <Document title={documentTitle}>
        {reports['TEMP0001'] &&
          _.uniqBy(reportList['TEMP0001'], 'labId').map(
            (patientReports: any) => (
              <PdfTemp0001
                data={{
                  patientReports: {
                    ...patientReports,
                    patientResultList:
                      patientReports?.patientResultList?.filter(
                        item =>
                          item?.reportTemplate?.split(' -')[0] == 'TEMP0001',
                      ),
                  },
                  pageBranding: templateDetails?.find(
                    item => item.templateCode == 'TEMP0001',
                  ),
                }}
                isWithHeader={isWithHeader}
              />
            ),
          )}
        {reports['TEMP0002'] &&
          _.uniqBy(reportList['TEMP0002'], 'labId').map(
            (patientReports: any) => (
              <PdfTemp0002
                data={{
                  patientReports: {
                    ...patientReports,
                    patientResultList:
                      patientReports?.patientResultList?.filter(
                        item =>
                          item?.reportTemplate?.split(' -')[0] == 'TEMP0002',
                      ),
                  },
                  pageBranding: templateDetails?.find(
                    item => item.templateCode == 'TEMP0002',
                  ),
                }}
                isWithHeader={isWithHeader}
              />
            ),
          )}
        {reports['TEMP0003'] &&
          _.uniqBy(reportList['TEMP0003'], 'labId').map(
            (patientReports: any) => (
              <PdfTemp0003
                data={{
                  patientReports: {
                    ...patientReports,
                    patientResultList:
                      patientReports?.patientResultList?.filter(
                        item =>
                          item?.reportTemplate?.split(' -')[0] == 'TEMP0003',
                      ),
                  },
                  pageBranding: templateDetails?.find(
                    item => item.templateCode == 'TEMP0003',
                  ),
                }}
                isWithHeader={isWithHeader}
              />
            ),
          )}
        {reports['TEMP0004'] &&
          _.uniqBy(reportList['TEMP0004'], 'labId').map(
            (patientReports: any) => (
              <PdfTemp0004
                data={{
                  patientReports: {
                    ...patientReports,
                    patientResultList:
                      patientReports?.patientResultList?.filter(
                        item =>
                          item?.reportTemplate?.split(' -')[0] == 'TEMP0004',
                      ),
                  },
                  pageBranding: templateDetails?.find(
                    item => item?.templateCode == 'TEMP0004',
                  ),
                }}
                isWithHeader={isWithHeader}
              />
            ),
          )}
        {reports['TEMP0005'] &&
          _.uniqBy(reportList['TEMP0005'], 'labId').map(
            (patientReports: any) => (
              <PdfTemp0005
                data={{
                  patientReports: {
                    ...patientReports,
                    patientResultList:
                      patientReports?.patientResultList?.filter(
                        item =>
                          item?.reportTemplate?.split(' -')[0] == 'TEMP0005',
                      ),
                  },
                  pageBranding: templateDetails?.find(
                    item => item.templateCode == 'TEMP0005',
                  ),
                }}
                isWithHeader={isWithHeader}
              />
            ),
          )}
        {reports['TEMP0006'] &&
          _.uniqBy(reportList['TEMP0006'], 'labId').map(
            (patientReports: any) => (
              <PdfTemp0006
                data={{
                  patientReports: {
                    ...patientReports,
                    patientResultList:
                      patientReports?.patientResultList?.filter(
                        item =>
                          item?.reportTemplate?.split(' -')[0] == 'TEMP0006',
                      ),
                  },
                  pageBranding: templateDetails?.find(
                    item => item.templateCode == 'TEMP0006',
                  ),
                }}
                isWithHeader={isWithHeader}
              />
            ),
          )}
        {reports['TEMP0007'] &&
          _.uniqBy(reportList['TEMP0007'], 'labId').map(
            (patientReports: any) => (
              <PdfTemp0007
                data={{
                  patientReports: {
                    ...patientReports,
                    patientResultList:
                      patientReports?.patientResultList?.filter(
                        item =>
                          item?.reportTemplate?.split(' -')[0] == 'TEMP0007',
                      ),
                  },
                  pageBranding: templateDetails?.find(
                    item => item.templateCode == 'TEMP0007',
                  ),
                }}
                isWithHeader={isWithHeader}
              />
            ),
          )}
        {reports['TEMP0008'] &&
          _.uniqBy(reportList['TEMP0008'], 'labId').map(
            (patientReports: any) => (
              <PdfTemp0008
                data={{
                  patientReports: {
                    ...patientReports,
                    patientResultList:
                      patientReports?.patientResultList?.filter(
                        item =>
                          item?.reportTemplate?.split(' -')[0] == 'TEMP0008',
                      ),
                  },
                  pageBranding: templateDetails?.find(
                    item => item.templateCode == 'TEMP0008',
                  ),
                }}
                isWithHeader={isWithHeader}
              />
            ),
          )}
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
                          value={isWithHeader ? 'withHeader' : 'withoutHeader'}
                          values={[
                            {value: 'withHeader', label: 'With Header'},
                            {value: 'withoutHeader', label: 'Without Header'},
                          ]}
                          onChange={value => {
                            setWithHeader(value == 'withHeader' ? true : false);
                          }}
                        />
                        <div className='flex flex-row content-center justify-center gap-2'>
                          <Tooltip tooltipText='View'>
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
                                setPdfViewer(true);
                                onClose && onClose();
                              }}
                            >
                              {Icons.getIconTag(Icons.Iconmd.MdOutlinePreview)}
                            </Icons.IconContext>
                          </Tooltip>
                          <Tooltip tooltipText='Print'>
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
                                const doc = await getReports(reportList);
                                const blob = await pdf(doc).toBlob();
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
                <div className='flex items-center  p-3 border-t border-solid border-gray-300 rounded-b justify-between'>
                  <span className='text-red'>
                    Note: ResultType FR & BO report opening new tab runtime
                  </span>
                  <button
                    className='text-red background-transparent font-bold uppercase  text-sm outline-none focus:outline-none'
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

      <Modal
        title='Delivery Queue Reports'
        show={isPdfViewer}
        close={() => {
          setPdfViewer(false);
        }}
        autoClose={
          _.has(reportList, 'TEMP0007')
            ? _.size(reportList) == 1
              ? true
              : false
            : _.has(reportList, 'TEMP0008')
            ? _.size(reportList) == 1
              ? true
              : false
            : false
        }
        children={
          isPdfViewer ? (
            <PDFViewer
              style={{
                width: window.innerWidth,
                height: window.innerHeight / 1.2,
              }}
              showToolbar={false}
            >
              {getReports(reportList)}
            </PDFViewer>
          ) : null
        }
      />
    </Container>
  );
};
