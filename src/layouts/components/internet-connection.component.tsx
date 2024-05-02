import { stores } from '@/stores';
import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import * as Assets from '@/library/assets';

const NoInternetConnection = ({ children }) => {
  const [isOnline, setOnline] = useState(true);
  // buz working local db
  useEffect(() => {
    setOnline(navigator.onLine);
  }, []);

  window.addEventListener('online', () => {
    setOnline(true);
  });

  window.addEventListener('offline', () => {
    setOnline(false);
  });
  if (isOnline) {
    return children;
  } else {
    return (
      <>
        <Container>
          <>
            <div
              className='justify-center items-center  overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none z-50'
              style={{ top: '180px' }}
            >
              <div className='relative w-auto my-6 mx-auto max-w-3xl '>
                <div
                  className={`border-0 rounded-lg shadow-lg relative flex flex-col w-full ${
                    stores.appStore.applicationSetting.theme === 'dark'
                      ? 'dark:bg-boxdark'
                      : 'bg-white'
                  }  outline-none focus:outline-none`}
                >
                  <div>
                    <button className='p-1  border-0 text-black opacity-1 ml-6 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'></button>
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
                          height: '150px',
                          marginTop: '-20px',
                        }}
                        alt='lims plus'
                      />
                    </div>
                  </div>

                  <div className='relative p-6 flex flex-row gap-2'>
                    <span className='text-3xl dark:text-white text-black text-center'>
                      Backend is not responding, Kindly check network
                      connectivity or contact System Administrator!!!
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className='opacity-50 fixed inset-0 z-40 bg-black'></div>
          </>
        </Container>
      </>
    );
  }
};

export default NoInternetConnection;
