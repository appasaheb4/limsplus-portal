import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { Container } from 'reactstrap';
import { observer } from 'mobx-react';
import { Form, Buttons, Icons, Tooltip } from '@/library/components';
import dayjs from 'dayjs';

interface ModalRecallProps {
  visible: boolean;
  data?: Array<any>;
  onRecall: (item: any) => void;
  onClose: () => void;
}

export const ModalRecall = observer(
  ({ visible = false, data = [], onRecall, onClose }: ModalRecallProps) => {
    const [selectedRowId, setSelectedRowId] = useState('');
    const [showModal, setShowModal] = React.useState(false);
    const arrRows = [
      { title: 'Lab Id', dataField: 'labId' },
      { title: 'Name', dataField: 'name' },
      { title: 'Panel', dataField: 'panelCode' },
      { title: 'Approval Date', dataField: 'approvalDate' },
      // { title: 'Test', dataField: 'testCode' },
      // { title: 'Analyte', dataField: 'analyteCode' },
      { title: 'Entered By', dataField: 'enteredBy' },
      { title: 'Action', dataField: 'action' },
    ];

    useEffect(() => {
      setShowModal(visible);
    }, [visible]);

    return (
      <Container>
        {showModal && (
          <>
            <div className='justify-center items-center   fixed inset-0 z-50 outline-none focus:outline-none'>
              <div className='relative w-auto my-6 mx-auto max-w-3xl'>
                {/*content*/}
                <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                  {/*header*/}
                  <div></div>
                  <div className='flex  flex-col  justify-between p-2 border-b border-solid border-gray-300 rounded-t'>
                    <div className='flex justify-between'>
                      <h4 className='font-semibold text-lg mt-4'>Recall</h4>
                      <Form.InputDateTime
                        label='From Date'
                        placeholder={'Date Expire'}
                        // hasError={!!errors.dateExpire}
                        value={''}
                        minDate={new Date()}
                        onChange={dateExpire => {}}
                      />
                      <Form.InputDateTime
                        label='To Date'
                        placeholder={'Date Expire'}
                        // hasError={!!errors.dateExpire}
                        value={''}
                        minDate={new Date()}
                        onChange={dateExpire => {}}
                      />
                      <Form.Input
                        label='Patient Name'
                        type='text'
                        placeholder='Search Patient Name'
                        value={''}
                        onChange={ageFrom => {}}
                      />
                    </div>
                  </div>
                  {/*body*/}
                  <div
                    className='relative p-2 flex-auto'
                    style={{ height: '50vh', overflowX: 'scroll' }}
                  >
                    <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                      <thead className='text-xs text-white uppercase '>
                        <tr>
                          {arrRows.map((item: any) => (
                            <th scope='col' className='p-2'>
                              {item?.title}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {data?.map(item => (
                          <>
                            <tr
                              className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                              key={item.id}
                            >
                              {arrRows.map((thI, i) => (
                                <>
                                  {thI?.dataField === 'action' ? (
                                    <td
                                      className='flex p-2  items-center justify-center'
                                      key={i}
                                    >
                                      <Icons.RIcon
                                        nameIcon='FaRecycle'
                                        onClick={() => {
                                          onRecall(item);
                                          setShowModal(false);
                                        }}
                                        tooltip='ReCall'
                                      />
                                      <Tooltip
                                        tooltipText={
                                          selectedRowId == item._id
                                            ? 'Collapse'
                                            : 'Expand'
                                        }
                                      >
                                        <Icons.IconContext
                                          color='#000'
                                          size='20'
                                          onClick={() => {
                                            setSelectedRowId(
                                              selectedRowId == item._id
                                                ? ''
                                                : item._id,
                                            );
                                          }}
                                        >
                                          {Icons.getIconTag(
                                            selectedRowId === item.id
                                              ? Icons.Iconai.AiFillMinusCircle
                                              : Icons.Iconai.AiFillPlusCircle,
                                          )}
                                        </Icons.IconContext>
                                      </Tooltip>
                                    </td>
                                  ) : thI?.dataField === 'approvalDate' ? (
                                    <td className='p-2' key={i}>
                                      {dayjs(item[thI?.dataField]).format(
                                        'DD-MM-YYYY HH:mm:ss',
                                      )}
                                    </td>
                                  ) : (
                                    <td className='p-2' key={i}>
                                      {/* Render other fields */}
                                      {item[thI?.dataField]}
                                    </td>
                                  )}
                                </>
                              ))}
                            </tr>
                            {selectedRowId == item._id && (
                              <tr key={`${item._id}-details`}>
                                <td colSpan={arrRows.length}>
                                  <div>
                                    <p>Analyte Name: {item.analyteName}</p>
                                    <p>Analytecode: {item.analyteCode}</p>
                                    <p>Result: {item.result}</p>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {/*footer*/}
                  <div className='flex items-center justify-end p-2 border-t border-solid border-gray-300 rounded-b'>
                    <button
                      className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1'
                      type='button'
                      style={{ transition: 'all .15s ease' }}
                      onClick={() => {
                        setShowModal(false);
                        onClose();
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
  },
);
