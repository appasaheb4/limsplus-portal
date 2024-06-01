import React, { useEffect, useRef } from 'react';
import { Container } from 'reactstrap';
import { Form, Icons, Tooltip } from '@components';
import * as Assets from '@/library/assets';
import { stores } from '@/stores';
import { pdf, PDFViewer, Document } from '@react-pdf/renderer';
import printjs from 'print-js';
import dayjs from 'dayjs';

interface ModalDeliveryQueueReportsProps {
  show?: boolean;
  title?: string;
  type?: string;
  body?: string;
  reportList: any;
  click?: (type?: string) => void;
  close: () => void;
  onClose?: () => void;
  onGetReports: () => any;
  autoClose?: boolean;
  children?: React.ReactNode;
}

export const ModalDeliveryQueueReports = (
  props: ModalDeliveryQueueReportsProps,
) => {
  const [showModal, setShowModal] = React.useState(props.show);
  const link = useRef(null);
  useEffect(() => {
    setShowModal(props.show);
    if (props.autoClose) {
      setTimeout(() => {
        props.close && props.close();
      }, 1000);
    }
  }, [props]);

  return (
    <Container>
      {showModal && (
        <>
          <div className='justify-center items-center  overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
            <div className='relative w-auto my-5 mx-auto max-w-7xl'>
              <div className='border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none'>
                <div className='flex items-start justify-between p-2 border-b border-solid border-gray-300 rounded-t'>
                  <h3 className='text-xl font-semibold'>{props.title}</h3>

                  <div className='flex gap-4'>
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
                          const doc = await props.onGetReports();
                          const blob = await pdf(doc).toBlob();
                          const blobURL = URL.createObjectURL(blob);
                          printjs({
                            printable: blobURL,
                            type: 'pdf',
                            showModal: true,
                          });
                          props.close();
                        }}
                      >
                        {Icons.getIconTag(Icons.IconBi.BiPrinter)}
                      </Icons.IconContext>
                    </Tooltip>
                    <Tooltip tooltipText='Download'>
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
                          const doc = await props.onGetReports();
                          const blob = await pdf(doc).toBlob();
                          //const blobURL = URL.createObjectURL(blob);
                          const url = URL.createObjectURL(new Blob([blob]));
                          const link = document.createElement('a');
                          link.href = url;
                          link.download = `Delivery-Queue-Reports_${dayjs().format(
                            'DD-MM-YYYY',
                          )}.pdf`;
                          //   document.body.appendChild(link);
                          document.body.append(link);
                          link.click();
                          //   document.body.removeChild(link);
                          link.remove();
                          URL.revokeObjectURL(url);
                          props.close();
                        }}
                      >
                        {Icons.getIconTag(Icons.IconFa.FaDownload)}
                      </Icons.IconContext>
                    </Tooltip>
                    <button
                      className='p-1  border-0 text-black opacity-1 ml-6 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                      onClick={() => {
                        props.close();
                        setShowModal(false);
                      }}
                    >
                      <span className=' text-black h-6 w-6 text-2xl block outline-none focus:outline-none'>
                        ×
                      </span>
                    </button>
                  </div>
                </div>
                <div className='flex p-2 w-auto h-auto '>{props.children}</div>
              </div>
            </div>
          </div>
          <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
        </>
      )}
    </Container>
  );
};
