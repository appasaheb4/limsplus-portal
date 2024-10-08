/* eslint-disable  */
import React, { useEffect } from 'react';
import { Container } from 'reactstrap';
import { Icons, Buttons } from '../../..';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

interface ModalProps {
  show?: boolean;
  title?: string;
  data?: any[];
  onClick: (data: any, item: any, index: number) => void;
  onClose: () => void;
}

export const ModalSessionAllowed = (props: ModalProps) => {
  const [showModal, setShowModal] = React.useState(props.show);

  useEffect(() => {
    setShowModal(props.show);
  }, [props.show]);

  return (
    <Container>
      {showModal && (
        <>
          <div className='justify-center items-center  overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
            <div className='relative w-auto my-6 mx-auto max-w-3xl'>
              <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                <div className='flex items-start justify-between p-3 border-b border-solid border-gray-300 rounded-t'>
                  <h3 className='text-3xl font-semibold'>
                    {props.title || 'Session Allowed'}
                  </h3>
                  <button
                    className='p-1  border-0 text-black opacity-1 ml-6 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                    onClick={() => {
                      setShowModal(false);
                      props.onClose && props.onClose();
                    }}
                  >
                    <span className=' text-black h-6 w-6 text-2xl block outline-none focus:outline-none'>
                      ×
                    </span>
                  </button>
                </div>
                <div className='relative p-2 flex-auto'>
                  <div className='grid grid-flow-row grid-cols-3  gap-4'>
                    {props.data?.length === 0 && (
                      <div className='flex flex-col p-2  items-center'>
                        <label>Extra session not found</label>
                      </div>
                    )}
                    {props.data?.map((item, index) => (
                      <div
                        className='flex-col flex p-2  items-center rounded-md bg-gray-400'
                        key={index}
                      >
                        <Icons.IconContext
                          color='#000000'
                          size='80'
                          key={index}
                        >
                          {Icons.getIconTag(Icons.IconRi.RiComputerFill)}
                        </Icons.IconContext>
                        <div className='flex flex-col p-2 items-center text-center'>
                          <h6>Device: {item.systemInfo?.device}</h6>
                          <h6>Ip: {item.systemInfo?.ipInfo?.ip}</h6>
                          {item.systemInfo?.ipInfo?.city && (
                            <h6>City: {item.systemInfo?.ipInfo?.city}</h6>
                          )}
                          <h6>
                            {dayjs(
                              dayjs(item.dateOfEntry).format(
                                'YYYY-MM-DD h:mm:ss a',
                              ),
                            ).fromNow()}
                          </h6>
                          {/* <h6> {item?.dateOfEntry}</h6> */}
                        </div>
                        <Buttons.Button
                          size='medium'
                          type='solid'
                          onClick={() => {
                            props.onClick &&
                              props.onClick(props.data, item, index);
                          }}
                        >
                          Logout
                        </Buttons.Button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className='flex items-center justify-end p-3 border-t border-solid border-gray-300 rounded-b'>
                  <button
                    className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1'
                    type='button'
                    style={{ transition: 'all .15s ease' }}
                    onClick={() => {
                      setShowModal(false);
                      props.onClose && props.onClose();
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
