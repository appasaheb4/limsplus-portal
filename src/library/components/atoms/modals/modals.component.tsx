import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import { Form, Icons, Tooltip } from '../..';
import * as Assets from '@/library/assets';
import { stores } from '@/stores';
import { Table } from 'reactstrap';
import { FiArrowRightCircle } from 'react-icons/fi';

interface ModalProps {
  show?: boolean;
  title?: string;
  type?: string;
  body?: string;
  click?: (type?: string) => void;
  close: () => void;
  onClose?: () => void;
  autoClose?: boolean;
  children?: React.ReactNode;
}

export const Modal = (props: ModalProps) => {
  const [showModal, setShowModal] = React.useState(props.show);
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

export const ModalConfirm = (props: ModalProps) => {
  const [showModal, setShowModal] = React.useState(props.show);
  useEffect(() => {
    setShowModal(props.show);
  }, [props]);

  return (
    <Container>
      {showModal && (
        <>
          <div className='justify-center items-center  overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
            <div className='relative w-auto my-6 mx-auto max-w-3xl'>
              {/*content*/}
              <div
                className={`border-0 rounded-lg shadow-lg relative flex flex-col w-full ${
                  stores.appStore.applicationSetting.theme === 'dark'
                    ? 'dark:bg-boxdark'
                    : 'bg-white'
                }  outline-none focus:outline-none`}
              >
                <div>
                  <button
                    className='p-1  border-0 text-black opacity-1 ml-6 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                    onClick={() => {
                      props.close && props.close();
                      props.onClose && props.onClose();
                      setShowModal(false);
                    }}
                  >
                    <span className=' text-black h-6 w-6 text-2xl block outline-none focus:outline-none'>
                      ×
                    </span>
                  </button>
                </div>
                <div className='flex  flex-col  items-center justify-between p-2 border-b border-solid border-gray-300 rounded-t'>
                  <div className='items-center justify-center flex mb-2'>
                    <img
                      src={
                        stores.appStore.applicationSetting.theme === 'dark'
                          ? Assets.images.limsplusTran
                          : Assets.images.linplusLogo
                      }
                      className='img-fluid'
                      style={{
                        width: '200px',
                        height: '122px',
                        marginTop: '-40px',
                      }}
                      alt='lims plus'
                    />
                  </div>
                  <div>
                    <div className='items-center justify-center flex'>
                      <span className='text-4xl'>{props.title}</span>
                    </div>
                  </div>
                </div>
                {/*body*/}
                {props.body && (
                  <>
                    <div className='relative p-2 flex flex-auto justify-center'>
                      <p className='my-4 text-lg leading-relaxed'>
                        <span className='text-3xl text-center'>
                          {props.body}
                        </span>
                      </p>
                    </div>
                  </>
                )}

                {/*footer*/}
                <div className='flex items-center justify-end p-2 border-t border-solid border-gray-300 rounded-b'>
                  <button
                    className='bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1'
                    type='button'
                    style={{ transition: 'all .15s ease' }}
                    onClick={() => {
                      props.close && props.close();
                      props.onClose && props.onClose();
                      setShowModal(false);
                    }}
                  >
                    No
                  </button>
                  <button
                    className='bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1'
                    type='button'
                    style={{ transition: 'all .15s ease' }}
                    onClick={() => {
                      setShowModal(false);
                      props.click && props.click(props.type);
                    }}
                  >
                    Yes
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

interface ModalImportFileProps {
  show?: boolean;
  title?: string;
  btnLabel?: string;
  body?: string;
  accept?: string;
  click: (file: any) => void;
  close: () => void;
}

export const ModalImportFile = (props: ModalImportFileProps) => {
  const [showModal, setShowModal] = React.useState(props.show);
  const [file, setFile] = useState<any>(null);
  useEffect(() => {
    setShowModal(props.show);
  }, [props]);
  return (
    <Container>
      {showModal && (
        <>
          <div className='justify-center items-center  overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
            <div className='relative w-auto my-6 mx-auto max-w-3xl'>
              {/*content*/}
              <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                {/*header*/}
                <div className='flex items-start justify-between p-2 border-b border-solid border-gray-300 rounded-t'>
                  <h3 className='text-3xl font-semibold'>{props.title}</h3>
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
                {/*body*/}
                <div className='relative p-2 flex-auto'>
                  <Form.InputFile
                    label='Import'
                    id='file'
                    accept={props.accept}
                    placeholder='Import File'
                    onChange={(e: any) => {
                      setFile(e.target.files[0]);
                    }}
                  />
                </div>
                {/*footer*/}
                <div className='flex items-center justify-end p-2 border-t border-solid border-gray-300 rounded-b'>
                  <button
                    className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1'
                    type='button'
                    style={{ transition: 'all .15s ease' }}
                    onClick={() => {
                      props.close();
                      setShowModal(false);
                    }}
                  >
                    Close
                  </button>
                  <button
                    className='bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1'
                    type='button'
                    style={{ transition: 'all .15s ease' }}
                    onClick={() => {
                      if (file) {
                        setShowModal(false);
                        props.click(file);
                      }
                    }}
                  >
                    {props.btnLabel || 'Import'}
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

interface ModalPostalCodeProps {
  postalCode: any;
  show?: boolean;
  data?: any;
  click?: (type?: string) => void;
  close: () => void;
  onClose?: () => void;
  onSelectedRow?: (item) => void;
}
export const ModalPostalCode = (props: ModalPostalCodeProps) => {
  const [showModal, setShowModal] = React.useState(props.show);
  const [editRow, setEditRow] = useState<any>();
  const [data, setData] = useState<any[]>(
    props.data || [
      {
        Pincode: '',
        Country: '',
        State: '',
        District: '',
        Block: '',
        Name: '',
      },
    ],
  );
  useEffect(() => {
    setShowModal(props.show);
    setData(
      props.data || [
        {
          Pincode: '',
          Country: '',
          State: '',
          District: '',
          Block: '',
          Name: '',
        },
      ],
    );
  }, [props]);

  return (
    <Container>
      {showModal && (
        <>
          <div className='justify-center items-center  overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
            <div className='relative w-auto my-6 mx-auto max-w-5xl'>
              {/*content*/}
              <div
                className={`border-0 rounded-lg shadow-lg relative flex flex-col w-full ${
                  stores.appStore.applicationSetting.theme === 'dark'
                    ? 'dark:bg-boxdark'
                    : 'bg-white'
                }  outline-none focus:outline-none`}
              >
                <div>
                  <button
                    className='p-1  border-0 text-black opacity-1 ml-6 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                    onClick={() => {
                      props.close && props.close();
                      props.onClose && props.onClose();
                      setShowModal(false);
                      setData([
                        {
                          Pincode: '',
                          Country: '',
                          State: '',
                          District: '',
                          Block: '',
                          Name: '',
                        },
                      ]);
                    }}
                  >
                    <span className=' text-black h-6 w-6 text-2xl block outline-none focus:outline-none'>
                      ×
                    </span>
                  </button>
                </div>
                <div className='flex  flex-col  items-center justify-between p-2 border-b border-solid border-gray-300 rounded-t'>
                  <div className='items-center justify-center flex mb-2'>
                    <img
                      src={
                        stores.appStore.applicationSetting.theme === 'dark'
                          ? Assets.images.limsplusTran
                          : Assets.images.linplusLogo
                      }
                      className='img-fluid'
                      style={{
                        width: '200px',
                        height: '122px',
                        marginTop: '-40px',
                      }}
                      alt='lims plus'
                    />
                  </div>
                  <div>
                    <div className='items-center justify-center flex'>
                      <span className='text-4xl'>Postal Code</span>
                    </div>
                  </div>
                </div>
                {/*body*/}

                <>
                  <div
                    className='relative p-2'
                    style={{ maxHeight: '500px', overflow: 'scroll' }}
                  >
                    <div className='flex flex-row gap-2'>
                      <Table striped bordered>
                        <thead>
                          <tr className='p-0 text-xs'>
                            <th className='text-white' style={{ minWidth: 60 }}>
                              Postal Code
                            </th>
                            <th className='text-white' style={{ minWidth: 60 }}>
                              Country
                            </th>
                            <th className='text-white' style={{ minWidth: 70 }}>
                              State
                            </th>
                            <th
                              className='text-white'
                              style={{ minWidth: 150 }}
                            >
                              District
                            </th>
                            <th className='text-white' style={{ minWidth: 70 }}>
                              City
                            </th>
                            <th
                              className='text-white'
                              style={{ minWidth: 100 }}
                            >
                              Area
                            </th>
                            <th className='text-white sticky right-0 z-10'>
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className='text-xs'>
                          {data?.map((item, index) => (
                            <tr key={index}>
                              <td>
                                <Form.Input
                                  value={item?.Pincode}
                                  disabled={!props.postalCode ? false : true}
                                  onChange={Pincode => {
                                    const rowData = [...data];
                                    rowData[index].Pincode = Pincode;
                                    setData(rowData);
                                  }}
                                />
                              </td>
                              <td>
                                <Form.Input
                                  value={item?.Country?.toUpperCase()}
                                  disabled={
                                    !props.postalCode
                                      ? false
                                      : editRow !== index
                                  }
                                  onChange={Country => {
                                    const rowData = [...data];
                                    rowData[index].Country = Country;
                                    setData(rowData);
                                  }}
                                />
                              </td>
                              <td>
                                <Form.Input
                                  disabled={
                                    !props.postalCode
                                      ? false
                                      : editRow !== index
                                  }
                                  value={item?.State?.toUpperCase()}
                                  onChange={State => {
                                    const rowData = [...data];
                                    rowData[index].State = State;
                                    setData(rowData);
                                  }}
                                />
                              </td>
                              <td>
                                <Form.MultilineInput
                                  disabled={
                                    !props.postalCode
                                      ? false
                                      : editRow !== index
                                  }
                                  value={item?.District?.toUpperCase()}
                                  onChange={District => {
                                    const rowData = [...data];
                                    rowData[index].District = District;
                                    setData(rowData);
                                  }}
                                />
                              </td>
                              <td>
                                <Form.Input
                                  disabled={
                                    !props.postalCode
                                      ? false
                                      : editRow !== index
                                  }
                                  value={item?.Block?.toUpperCase()}
                                  onChange={Block => {
                                    const rowData = [...data];
                                    rowData[index].Block = Block;
                                    setData(rowData);
                                  }}
                                />
                              </td>
                              <td>
                                <Form.MultilineInput
                                  disabled={
                                    !props.postalCode
                                      ? false
                                      : editRow !== index
                                  }
                                  value={item?.Name?.toUpperCase()}
                                  onChange={Name => {
                                    const rowData = [...data];
                                    rowData[index].Name = Name;
                                    setData(rowData);
                                  }}
                                />
                              </td>
                              <td>
                                <div className='flex flex-row'>
                                  <Tooltip tooltipText='Edit'>
                                    <Icons.IconContext
                                      color='#000'
                                      size='20'
                                      onClick={() => {
                                        setEditRow(index);
                                      }}
                                    >
                                      {Icons.getIconTag(Icons.IconBi.BiEdit)}
                                    </Icons.IconContext>
                                  </Tooltip>

                                  <Tooltip tooltipText='Select'>
                                    <FiArrowRightCircle
                                      size={20}
                                      onClick={() => {
                                        props.onSelectedRow &&
                                          props.onSelectedRow(item);
                                        setShowModal(false);
                                        setData([
                                          {
                                            Pincode: '',
                                            Country: '',
                                            State: '',
                                            District: '',
                                            Block: '',
                                            Name: '',
                                          },
                                        ]);
                                      }}
                                    />
                                  </Tooltip>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </>

                {/*footer*/}
                <div className='flex items-center justify-end p-2 border-t border-solid border-gray-300 rounded-b'>
                  <button
                    className='bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1'
                    type='button'
                    style={{ transition: 'all .15s ease' }}
                    onClick={() => {
                      props.close && props.close();
                      props.onClose && props.onClose();
                      setShowModal(false);
                      setData([
                        {
                          Pincode: '',
                          Country: '',
                          State: '',
                          District: '',
                          Block: '',
                          Name: '',
                        },
                      ]);
                    }}
                  >
                    No
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
