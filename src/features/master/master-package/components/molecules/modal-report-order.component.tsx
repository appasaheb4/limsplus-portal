/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {Container} from 'reactstrap';
import _ from 'lodash';
import {Table} from 'reactstrap';
import {observer} from 'mobx-react';
import {Form, Toast, Buttons} from '@/library/components';
import {useStores} from '@/stores';

import {IconContext} from 'react-icons';
import {
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
} from 'react-icons/bs';

export interface ModalReportOrderProps {
  isVisible?: boolean;
  title?: string;
  packageCode?: string;
  onClick?: (item: any) => void;
  onClose?: () => void;
}

export const ModalReportOrder = observer(
  ({
    isVisible = false,
    title,
    packageCode,
    onClick,
    onClose,
  }: ModalReportOrderProps) => {
    const {masterPackageStore} = useStores();
    const [order, setOrder] = useState<any>([]);
    const [txtDisable, setTxtDisable] = useState(true);
    useEffect(() => {
      masterPackageStore.masterPackageService
        .findByFields({
          input: {filter: {packageCode}},
        })
        .then(res => {
          if (!res.findByFieldsPackageMaster.success)
            return Toast.warning({
              message: `😔 ${res.findByFieldsPackageMaster.message}`,
            });
          setOrder(
            _.map(res.findByFieldsPackageMaster.data, o =>
              _.pick(o, ['_id', 'panelCode', 'panelName', 'reportOrder']),
            ),
          );
        });
    }, [packageCode]);

    return (
      <Container>
        {isVisible && (
          <>
            <div
              className='justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'
              onClick={() => {
                //onClose && onClose()
                // setShowModal(false)
              }}
            >
              <div className='relative w-auto my-6 mx-auto max-w-3xl'>
                {/*content*/}
                <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                  {/*header*/}
                  <div className='flex items-start justify-between p-2 border-b border-solid border-gray-300 rounded-t'>
                    <h3 className='text-3xl font-semibold'>{title}</h3>
                    <button
                      className='p-1  border-0 text-black opacity-1 ml-6 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                      onClick={() => {
                        onClose && onClose();
                        //setShowModal(false)
                      }}
                    >
                      <span className=' text-black h-6 w-6 text-2xl block outline-none focus:outline-none'>
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}

                  <div className='relative p-2 flex-auto'>
                    <Table striped bordered className='max-h-5' size='sm'>
                      <thead>
                        <tr className='text-xs'>
                          <th className='text-white'>Panel</th>
                          <th>
                            <div className='text-white flex flex-row gap-2 items-center'>
                              Report Order
                              <Buttons.ButtonIcon
                                icon={
                                  <IconContext.Provider
                                    value={{color: '#ffffff'}}
                                  >
                                    <BsFillArrowUpCircleFill />
                                  </IconContext.Provider>
                                }
                                title=''
                                onClick={() => {
                                  setOrder(
                                    _.orderBy(order, 'reportOrder', 'asc'),
                                  );
                                }}
                              />
                              <Buttons.ButtonIcon
                                icon={
                                  <IconContext.Provider
                                    value={{color: '#ffffff'}}
                                  >
                                    <BsFillArrowDownCircleFill />
                                  </IconContext.Provider>
                                }
                                title=''
                                onClick={() => {
                                  setOrder(
                                    _.orderBy(order, 'reportOrder', 'desc'),
                                  );
                                }}
                              />
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className='text-xs'>
                        {order.map((item, index) => (
                          <tr
                            onMouseEnter={() => {
                              setTxtDisable(false);
                            }}
                            onMouseLeave={() => {
                              setTxtDisable(true);
                            }}
                          >
                            <td>{`${index + 1}. ${
                              item.panelName + ' - ' + item.panelCode
                            }`}</td>
                            <td style={{width: 150}}>
                              {txtDisable ? (
                                <span
                                  className={`leading-4 p-2  focus:outline-none focus:ring  block w-full shadow-sm sm:text-base  border-2 rounded-md`}
                                >
                                  {item.reportOrder}
                                </span>
                              ) : (
                                <Form.Input
                                  type='number'
                                  disabled={txtDisable}
                                  placeholder={item.reportOrder}
                                  onChange={seq => {
                                    order[index].reportOrder = parseInt(seq);
                                  }}
                                />
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>

                  {/*footer*/}
                  <div className='flex items-center justify-end p-2 border-t border-solid border-gray-300 rounded-b'>
                    <button
                      className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1'
                      type='button'
                      style={{transition: 'all .15s ease'}}
                      onClick={() => {
                        onClose && onClose();
                        // setShowModal(false)
                      }}
                    >
                      Close
                    </button>
                    <button
                      className='bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1'
                      type='button'
                      style={{transition: 'all .15s ease'}}
                      onClick={() => {
                        //setShowModal(false)
                        onClick && onClick(order);
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
  },
);
