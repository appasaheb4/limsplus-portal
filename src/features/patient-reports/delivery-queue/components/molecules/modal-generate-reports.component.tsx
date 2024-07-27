/* eslint-disable  */
import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import _ from 'lodash';
import { Icons, Tooltip, Form } from '@components';
import { pdf as pdfGen, PDFViewer, Document } from '@react-pdf/renderer';
import { ModalDeliveryQueueReports } from './modal-delivery-queue-reports.component';
import {
  PdfTemp0001,
  PdfTemp0002,
  PdfTemp0003,
  PdfTemp0004,
  PdfTemp0005,
  PdfTemp0006,
  PdfTemp0007,
  PdfTemp0008,
  PdfTemp0009,
  PdfTemp0010,
} from '@/features/report-builder/report-template/components';
import printjs from 'print-js';
import { FaRegCopy } from 'react-icons/fa';
import { Accordion, AccordionItem } from 'react-sanfona';
import '@/library/assets/css/accordion.css';
import { SocialIcon } from 'react-social-icons';

interface ModalGenerateReportsProps {
  show?: boolean;
  title?: string;
  data?: any;
  reportTo?: any;
  templateDetails?: any;
  onClick: (data: any, item: any, index: number) => void;
  onClose: () => void;
  onReceiptUpload: (file: any, type: string) => void;
}

export const ModalGenerateReports = ({
  show = false,
  data,
  reportTo,
  templateDetails,
  onClose,
  onReceiptUpload,
}: ModalGenerateReportsProps) => {
  const [reportList, setReportList] = useState<any>();
  const [showModal, setShowModal] = React.useState(show);
  const [isWithHeader, setWithHeader] = useState(true);
  const [isPdfViewer, setPdfViewer] = useState(false);
  const [pdf, setPdf] = useState('');
  const [copySuccess, setCopySuccess] = useState('');

  useEffect(() => {
    setShowModal(show);
    if (reportTo?.pdf) setPdf(reportTo?.pdf);
  }, [show, reportTo]);

  useEffect(() => {
    if (data) {
      let newObj = _.mapKeys(data, (value, key) => key.split(' -')[0]);
      let arrReportList: any = [];
      for (const values of Object.entries(newObj)) {
        let templateReportOrder = 0;
        values[1].map(item =>
          item?.patientResultList?.map(e => {
            if (e.reportTemplate?.split(' - ')[0] == values[0]) {
              templateReportOrder = e.reportTemplateOrder;
            }
          }),
        );
        arrReportList.push({
          template: values[0],
          patientReports: values[1],
          order: templateReportOrder,
        });
      }
      arrReportList = _.orderBy(arrReportList, 'order', 'asc');
      setReportList(arrReportList);
    }
  }, [data]);

  const getReports = reports => {
    const documentTitle = 'Delivery Queue';
    return (
      <Document title={documentTitle}>
        {reports.map(item => (
          <>
            {item.template == 'TEMP0001' &&
              _.uniqBy(item?.patientReports, 'labId').map(
                (patientReports: any, i: number) => (
                  <PdfTemp0001
                    key={i}
                    data={{
                      patientReports: {
                        ...patientReports,
                        patientResultList:
                          patientReports?.patientResultList?.filter(
                            item =>
                              item?.reportTemplate?.split(' -')[0] ==
                              'TEMP0001',
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

            {item.template == 'TEMP0002' &&
              _.uniqBy(item?.patientReports, 'labId').map(
                (patientReports: any, i: number) => (
                  <PdfTemp0002
                    key={i}
                    data={{
                      patientReports: {
                        ...patientReports,
                        patientResultList:
                          patientReports?.patientResultList?.filter(
                            item =>
                              item?.reportTemplate?.split(' -')[0] ==
                              'TEMP0002',
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
            {item.template == 'TEMP0003' &&
              _.uniqBy(item?.patientReports, 'labId').map(
                (patientReports: any, i: number) => (
                  <PdfTemp0003
                    key={i}
                    data={{
                      patientReports: {
                        ...patientReports,
                        patientResultList:
                          patientReports?.patientResultList?.filter(
                            item =>
                              item?.reportTemplate?.split(' -')[0] ==
                              'TEMP0003',
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
            {item.template == 'TEMP0004' &&
              _.uniqBy(item?.patientReports, 'labId').map(
                (patientReports: any, i: number) => (
                  <PdfTemp0004
                    key={i}
                    data={{
                      patientReports: {
                        ...patientReports,
                        patientResultList:
                          patientReports?.patientResultList?.filter(
                            item =>
                              item?.reportTemplate?.split(' -')[0] ==
                              'TEMP0004',
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
            {item.template == 'TEMP0005' &&
              _.uniqBy(item?.patientReports, 'labId').map(
                (patientReports: any, i: number) => (
                  <PdfTemp0005
                    key={i}
                    data={{
                      patientReports: {
                        ...patientReports,
                        patientResultList:
                          patientReports?.patientResultList?.filter(
                            item =>
                              item?.reportTemplate?.split(' -')[0] ==
                              'TEMP0005',
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
            {item.template == 'TEMP0006' &&
              _.uniqBy(item?.patientReports, 'labId').map(
                (patientReports: any, i: number) => (
                  <PdfTemp0006
                    key={i}
                    data={{
                      patientReports: {
                        ...patientReports,
                        patientResultList:
                          patientReports?.patientResultList?.filter(
                            item =>
                              item?.reportTemplate?.split(' -')[0] ==
                              'TEMP0006',
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
            {item.template == 'TEMP0007' &&
              _.uniqBy(item?.patientReports, 'labId').map(
                (patientReports: any, i: number) => (
                  <PdfTemp0007
                    key={i}
                    data={{
                      patientReports: {
                        ...patientReports,
                        patientResultList:
                          patientReports?.patientResultList?.filter(
                            item =>
                              item?.reportTemplate?.split(' -')[0] ==
                              'TEMP0007',
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
            {item.template == 'TEMP0008' &&
              _.uniqBy(item?.patientReports, 'labId').map(
                (patientReports: any, i: number) => (
                  <PdfTemp0008
                    key={i}
                    data={{
                      patientReports: {
                        ...patientReports,
                        patientResultList:
                          patientReports?.patientResultList?.filter(
                            item =>
                              item?.reportTemplate?.split(' -')[0] ==
                              'TEMP0008',
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
            {item.template == 'TEMP0009' &&
              _.uniqBy(item?.patientReports, 'labId').map(
                (patientReports: any, i: number) => (
                  <PdfTemp0009
                    key={i}
                    data={{
                      patientReports: {
                        ...patientReports,
                        patientResultList:
                          patientReports?.patientResultList?.filter(
                            item =>
                              item?.reportTemplate?.split(' -')[0] ==
                              'TEMP0009',
                          ),
                      },
                      pageBranding: templateDetails?.find(
                        item => item?.templateCode == 'TEMP0009',
                      ),
                    }}
                    isWithHeader={isWithHeader}
                  />
                ),
              )}
            {item.template == 'TEMP0010' &&
              _.uniqBy(item?.patientReports, 'labId').map(
                (patientReports: any, i: number) => (
                  <PdfTemp0010
                    data={{
                      patientReports: {
                        ...patientReports,
                        patientResultList:
                          patientReports?.patientResultList?.filter(
                            item =>
                              item?.reportTemplate?.split(' -')[0] ==
                              'TEMP0010',
                          ),
                      },
                      pageBranding: templateDetails?.find(
                        item => item?.templateCode == 'TEMP0010',
                      ),
                    }}
                    isWithHeader={isWithHeader}
                  />
                ),
              )}
          </>
        ))}
      </Document>
    );
  };

  const sharePdfLink = async () => {
    const doc = getReports(reportList);
    const asPdf = pdfGen(doc);
    asPdf.updateContainer(doc);
    const blob: any = await asPdf.toBlob();
    blob.name = `Report_${reportTo?.labId}.pdf`;
    onReceiptUpload(blob, reportTo);
  };

  const copyToClipboard = e => {
    navigator.clipboard
      .writeText(reportTo?.pdf || '')
      .then(() => {
        setCopySuccess('Copied!');
        setTimeout(() => setCopySuccess(''), 2000);
      })
      .catch(() => {
        setCopySuccess('Failed to copy!');
        setTimeout(() => setCopySuccess(''), 2000);
      });
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
                <div className='relative p-2 grid grid-cols-2 flex-auto'>
                  <div className='flex flex-row items-center justify-center gap-2'>
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
                                const doc = await getReports(reportList);
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
                  <div className='flex flex-col'>
                    <span className='flex'>Report To:</span>
                    <div className='flex flex-col mb-2'>
                      <Accordion style={{ margin: 0, padding: 0 }}>
                        {reportTo?.options?.map(item => {
                          return (
                            <AccordionItem
                              title={`${item}`}
                              style={{ margin: 0, padding: 0 }}
                            >
                              {item?.toLowerCase() == 'patients' && (
                                <div
                                  about='patient'
                                  className='flex flex-col gap-2'
                                >
                                  {reportTo?.patientVisit?.mobileNo && (
                                    <span className='flex p-2 rounded-sm bg-blue-800 text-white w-fit items-center gap-2'>
                                      {reportTo?.patientVisit?.mobileNo || ''}
                                      {pdf && (
                                        <Tooltip tooltipText='Share on whatsapp'>
                                          <SocialIcon
                                            network='whatsapp'
                                            style={{ height: 32, width: 32 }}
                                            onClick={() => {
                                              window.open(
                                                `https://api.whatsapp.com/send?phone=+91${reportTo?.patientVisit?.mobileNo?.toString()}&text=Your%20Final/Intrim%20Report%20is%20ready%20for%20Lab%20No%20${
                                                  reportTo?.labId
                                                }%20To%20access%20report%20click%20following%20link:%20${pdf}`,
                                                '_blank',
                                              );
                                            }}
                                          />
                                        </Tooltip>
                                      )}
                                    </span>
                                  )}
                                  {reportTo?.patientVisit?.email && (
                                    <span className='flex p-2 rounded-sm bg-blue-800 text-white w-fit items-center gap-2'>
                                      {reportTo?.patientVisit?.email}
                                      {pdf && (
                                        <Tooltip tooltipText='Email on shared'>
                                          <Icons.RIcon
                                            nameIcon='SlCheck'
                                            propsIcon={{
                                              size: 24,
                                              color: '#2563EB',
                                            }}
                                          />
                                        </Tooltip>
                                      )}
                                    </span>
                                  )}
                                </div>
                              )}
                              {item?.toLowerCase() == 'doctors' && (
                                <div
                                  about='doctors'
                                  className='flex flex-col gap-2'
                                >
                                  {reportTo?.doctor?.mobileNo && (
                                    <span className='flex p-2 rounded-sm bg-blue-800 text-white w-fit items-center gap-2'>
                                      {reportTo?.doctor?.mobileNo}
                                      {pdf && (
                                        <Tooltip tooltipText='Share on whatsapp'>
                                          <SocialIcon
                                            network='whatsapp'
                                            style={{ height: 32, width: 32 }}
                                            onClick={() => {
                                              window.open(
                                                `https://api.whatsapp.com/send?phone=+91${reportTo?.doctor?.mobileNo?.toString()}&text=Your%20Final/Intrim%20Report%20is%20ready%20for%20Lab%20No%20${
                                                  reportTo?.labId
                                                }%20To%20access%20report%20click%20following%20link:%20${pdf}`,
                                                '_blank',
                                              );
                                            }}
                                          />
                                        </Tooltip>
                                      )}
                                    </span>
                                  )}
                                  {reportTo?.doctor?.email && (
                                    <span className='flex p-2 rounded-sm bg-blue-800 text-white w-fit items-center gap-2'>
                                      {reportTo?.doctor?.email}
                                      {pdf && (
                                        <Tooltip tooltipText='Email on shared'>
                                          <Icons.RIcon
                                            nameIcon='SlCheck'
                                            propsIcon={{
                                              size: 24,
                                              color: '#2563EB',
                                            }}
                                          />
                                        </Tooltip>
                                      )}
                                    </span>
                                  )}
                                </div>
                              )}
                              {item?.toLowerCase() == 'clients' && (
                                <div
                                  about='corporateClients'
                                  className='flex flex-col gap-2'
                                >
                                  {reportTo?.corporateClients?.reportToMobiles
                                    ?.length > 0 && (
                                    <>
                                      {reportTo?.corporateClients?.reportToMobiles?.map(
                                        (item, index) => (
                                          <span className='flex p-2 rounded-sm bg-blue-800 text-white w-fit items-center gap-2'>
                                            {item?.name +
                                              ' - ' +
                                              item?.mobileNo || ''}
                                            {pdf && (
                                              <Tooltip tooltipText='Share on whatsapp'>
                                                <SocialIcon
                                                  network='whatsapp'
                                                  style={{
                                                    height: 32,
                                                    width: 32,
                                                  }}
                                                  onClick={() => {
                                                    window.open(
                                                      `https://api.whatsapp.com/send?phone=+91${item?.mobileNo?.toString()}&text=Your%20Final/Intrim%20Report%20is%20ready%20for%20Lab%20No%20${
                                                        reportTo?.labId
                                                      }%20To%20access%20report%20click%20following%20link:%20${pdf}`,
                                                      '_blank',
                                                    );
                                                  }}
                                                />
                                              </Tooltip>
                                            )}
                                          </span>
                                        ),
                                      )}
                                    </>
                                  )}
                                  {reportTo?.corporateClients
                                    ?.reportToEmails && (
                                    <>
                                      {reportTo?.corporateClients?.reportToEmails?.map(
                                        (item, index) => (
                                          <span className='flex p-2 rounded-sm bg-blue-800 text-white w-fit items-center gap-2'>
                                            {item?.name + ' - ' + item?.email}
                                            {pdf && (
                                              <Tooltip tooltipText='Email on shared'>
                                                <Icons.RIcon
                                                  nameIcon='SlCheck'
                                                  propsIcon={{
                                                    size: 24,
                                                    color: '#2563EB',
                                                  }}
                                                />
                                              </Tooltip>
                                            )}
                                          </span>
                                        ),
                                      )}
                                    </>
                                  )}
                                </div>
                              )}
                            </AccordionItem>
                          );
                        })}
                      </Accordion>
                    </div>
                    <button
                      className='bg-blue-800 font-bold p-2 text-white rounded-md mb-2 w-fit self-center'
                      type='button'
                      style={{ transition: 'all .15s ease' }}
                      onClick={() => {
                        sharePdfLink();
                      }}
                    >
                      Share Link
                    </button>
                    {reportTo?.pdf && (
                      <div className='flex items-center bg-gray-200 p-2 rounded-md w-full'>
                        <input
                          type='text'
                          value={reportTo.pdf}
                          readOnly
                          className='bg-transparent flex-1 p-1 outline-none'
                        />
                        <button
                          className='ml-2 bg-blue-600 text-white p-1 rounded-md flex items-center'
                          onClick={copyToClipboard}
                        >
                          <FaRegCopy className='mr-1' />
                          Copy
                        </button>
                        {copySuccess && (
                          <span className='ml-2 text-green-500'>
                            {copySuccess}
                          </span>
                        )}
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

      <ModalDeliveryQueueReports
        title='Delivery Queue Reports'
        show={isPdfViewer}
        reportList={reportList}
        close={() => {
          setPdfViewer(false);
        }}
        onGetReports={() => getReports(reportList)}
        autoClose={
          reportList?.length > 0
            ? reportList[0]?.template == 'TEMP0007'
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
