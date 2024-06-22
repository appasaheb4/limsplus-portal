/* eslint-disable  */
import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import _ from 'lodash';
import { Icons, Tooltip, Form } from '@components';

interface ModalConfigurationUpdateProps {
  show?: boolean;
  details?: any;
  onClick: (item: any) => void;
  onClose: () => void;
}

export const ModalConfigurationUpdate = ({
  show = false,
  details,
  onClick,
  onClose,
}: ModalConfigurationUpdateProps) => {
  const [configuration, setConfiguration] = useState<any>({});
  const [showModal, setShowModal] = React.useState(show);

  useEffect(() => {
    console.log({ details: details?.configuration });

    setConfiguration(details?.configuration);
    setShowModal(show);
  }, [show]);

  return (
    <Container>
      {showModal && (
        <>
          <div className='justify-center items-center  overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
            <div className='relative w-auto my-6 mx-auto max-w-3xl'>
              <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                <div className='flex items-start justify-between p-3 border-b border-solid border-gray-300 rounded-t'>
                  <h3 className='text-3xl font-semibold'>
                    {'Configuration Update'}
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
                <div className='flex p-2 w-full '>
                  <div className='grid grid-cols-2 gap-1 w-full'>
                    <Form.InputWrapper label='Email:'>
                      <div className='px-4'>
                        <Form.Input
                          label='Host'
                          placeholder='Host'
                          value={configuration?.host}
                          onChange={host => {
                            setConfiguration({
                              ...configuration,
                              host,
                            });
                          }}
                        />
                        <Form.Input
                          label='Port'
                          type='number'
                          placeholder='Port'
                          value={configuration?.port?.toString()}
                          onChange={port => {
                            setConfiguration({
                              ...configuration,
                              port: Number.parseInt(port),
                            });
                          }}
                        />
                        <Form.Input
                          label='Email'
                          placeholder='Email'
                          value={configuration?.email}
                          onChange={email => {
                            setConfiguration({
                              ...configuration,
                              email,
                            });
                          }}
                        />
                        <div className='flex  items-center w-full gap-2 '>
                          <Form.Input
                            label='Password'
                            placeholder='Password'
                            value={configuration?.password}
                            onChange={password => {
                              setConfiguration({
                                ...configuration,
                                password,
                              });
                            }}
                          />
                          <div className='w-20 pt-4'>
                            <Tooltip tooltipText='How to generate password'>
                              <Icons.RIcon
                                nameIcon='FaInfoCircle'
                                propsIcon={{
                                  size: 24,
                                  color: '#2563EB',
                                }}
                                onClick={() => {
                                  window.open(
                                    '/assets/documents/CreatAppPassword.pdf',
                                    '_blank',
                                  );
                                }}
                              />
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    </Form.InputWrapper>
                    <Form.InputWrapper
                      label='WhatsApp:'
                      labelClassName='font-bold'
                    >
                      <div className='px-4'>
                        <Form.Input
                          label='App Id'
                          placeholder='App Id'
                          value={configuration?.appId}
                          onChange={appId => {
                            setConfiguration({
                              ...configuration,
                              appId,
                            });
                          }}
                        />
                        <Form.Input
                          label='App Secret'
                          placeholder='App Secret'
                          value={configuration?.appSecret}
                          onChange={appSecret => {
                            setConfiguration({
                              ...configuration,
                              appSecret,
                            });
                          }}
                        />
                        <Form.Input
                          label='Recipient Waid'
                          placeholder='Recipient Waid'
                          value={configuration?.recipientWaid}
                          onChange={recipientWaid => {
                            setConfiguration({
                              ...configuration,
                              recipientWaid,
                            });
                          }}
                        />
                        <Form.Input
                          label='Version'
                          placeholder='Version'
                          value={configuration?.version}
                          onChange={version => {
                            setConfiguration({
                              ...configuration,
                              version,
                            });
                          }}
                        />
                        <Form.Input
                          label='Phone Number Id'
                          placeholder='Phone Number Id'
                          value={configuration?.phoneNumberId}
                          onChange={phoneNumberId => {
                            setConfiguration({
                              ...configuration,
                              phoneNumberId,
                            });
                          }}
                        />
                        <Form.Input
                          label='Access Token'
                          placeholder='Access Token'
                          value={configuration?.accessToken}
                          onChange={accessToken => {
                            setConfiguration({
                              ...configuration,
                              accessToken,
                            });
                          }}
                        />
                      </div>
                    </Form.InputWrapper>
                  </div>
                </div>
                {/* <div className='flex items-center  p-3 border-t border-solid border-gray-300 rounded-b justify-between'>
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
                </div> */}
                <div className='flex items-center justify-end  border-t border-solid border-gray-300 rounded-b p-2'>
                  <button
                    className='text-red-500 background-transparent font-bold uppercase px-4 py-2 text-sm outline-none focus:outline-none mr-1 mb-1'
                    type='button'
                    style={{ transition: 'all .15s ease' }}
                    onClick={() => {
                      setShowModal(false);
                      onClose && onClose();
                    }}
                  >
                    Later
                  </button>
                  <button
                    className='bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1'
                    type='button'
                    style={{ transition: 'all .15s ease' }}
                    onClick={() => {
                      onClick(configuration);
                    }}
                  >
                    Update
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
