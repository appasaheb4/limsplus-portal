/* eslint-disable  */
import React, {useEffect} from 'react';
import {Container} from 'reactstrap';
import {Icons} from '@components';
import {pdf} from '@react-pdf/renderer';
import {PdfReceipt} from '../../../receipt/components';
import {saveAs} from 'file-saver';
import {SocialIcon} from 'react-social-icons';

interface ModalReceiptShareProps {
  show?: boolean;
  title?: string;
  data?: any;
  onClick: (data: any, item: any, index: number) => void;
  onClose: () => void;
}

export const ModalReceiptShare = ({
  show = false,
  data,
  onClose,
}: ModalReceiptShareProps) => {
  const [showModal, setShowModal] = React.useState(show);

  useEffect(() => {
    setShowModal(show);
  }, [show]);

  const currentpageurl = 'url';

  return (
    <Container>
      {showModal && (
        <>
          <div className='justify-center items-center  overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
            <div className='relative w-auto my-6 mx-auto max-w-3xl'>
              <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                <div className='flex items-start justify-between p-3 border-b border-solid border-gray-300 rounded-t'>
                  <h3 className='text-3xl font-semibold'>
                    {'Payment Receipt Share'}
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
                      <>
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
                            const doc = <PdfReceipt data={data} />;
                            const asPdf = pdf(doc);
                            asPdf.updateContainer(doc);
                            const blob = await asPdf.toBlob();
                            saveAs(blob, 'Receipt.pdf');
                          }}
                        >
                          {Icons.getIconTag(
                            Icons.Iconhi.HiOutlineFolderDownload,
                          )}
                        </Icons.IconContext>
                        <SocialIcon
                          network='email'
                          style={{height: 32, width: 32}}
                          onClick={() => {
                            window.open(
                              'mailto:recipient@domain.com?subject=Payment%20Receipt&body=Your%20payment%20receipt%20link:www.limsplus.com',
                              '_blank',
                            );
                          }}
                        />
                        <SocialIcon
                          network='whatsapp'
                          style={{height: 32, width: 32}}
                          onClick={() => {
                            window.open(
                              'https://web.whatsapp.com/send?text=/' +
                                currentpageurl,
                              '_blank',
                            );
                          }}
                        />
                        <SocialIcon
                          network='twitter'
                          style={{height: 32, width: 32}}
                          onClick={() => {
                            window.open(
                              'https://twitter.com/intent/tweet?url=/' +
                                currentpageurl,
                              '_blank',
                            );
                          }}
                        />
                        <SocialIcon
                          network='facebook'
                          style={{height: 32, width: 32}}
                          onClick={() => {
                            window.open(
                              'https://www.facebook.com/sharer.php?u=/' +
                                currentpageurl,
                              '_blank',
                            );
                          }}
                        />
                        <SocialIcon
                          network='instagram'
                          style={{height: 32, width: 32}}
                          onClick={() => {
                            window.open(
                              'https://www.instagram.com/accounts/onetap/?next=' +
                                'http://test-consumer.doctall.com',
                            );
                          }}
                        />
                      </>
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
