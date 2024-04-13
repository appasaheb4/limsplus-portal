import React from 'react';
import { observer } from 'mobx-react';

import { ArrowUp, Users } from 'react-feather';
import { useStores } from '@/stores';

const Statistics = observer(() => {
  const { userStore } = useStores();
  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 mb-4'>
      <div className='col-span-1 md:col-span-1 lg:col-span-1'>
        <div className='bg-white shadow-md rounded-md overflow-hidden transform transition-transform hover:scale-105'>
          <div className='p-4'>
            <div className='flex items-center'>
              <div className='bg-primary text-white rounded-full flex items-center justify-center h-10 w-10'>
                <Users className='text-lg' />
              </div>
              <div className='ml-4'>
                <p className='text-gray-500 text-[1rem]'>No of User</p>
                <h4 className='text-xl font-semibold'>
                  {userStore.userListCount}
                </h4>
              </div>
            </div>
            <div className='mt-4 flex justify-between'>
              <div className='text-green-500 font-semibold'>+40%</div>
              <div className='text-gray-500 text-xs'>This month</div>
            </div>
          </div>
        </div>
      </div>
      <div className='col-span-1 md:col-span-1 lg:col-span-1'>
        <div className='bg-white shadow-md rounded-md overflow-hidden transform transition-transform hover:scale-105'>
          <div className='p-4'>
            <div className='flex items-center'>
              <div className='bg-primary text-white rounded-full flex items-center justify-center h-10 w-10'>
                <Users className='text-lg' />
              </div>
              <div className='ml-4'>
                <p className='text-gray-500 text-[1rem]'>No of Patients</p>
                <h4 className='text-xl font-semibold'>1,02,890</h4>
              </div>
            </div>
            <div className='mt-4 flex justify-between'>
              <div className='text-green-500 font-semibold'>+40%</div>
              <div className='text-gray-500 text-xs'>This month</div>
            </div>
          </div>
        </div>
      </div>

      <div className='col-span-1 md:col-span-1 lg:col-span-1'>
        <div className='bg-white shadow-md rounded-md overflow-hidden transform transition-transform hover:scale-105'>
          <div className='p-4'>
            <div className='flex items-center'>
              <div className='bg-primary text-white rounded-full flex items-center justify-center h-10 w-10'>
                <Users className='text-lg' />
              </div>
              <div className='ml-4'>
                <p className='text-gray-500 text-[1rem]'> No of Sample</p>
                <h4 className='text-xl font-semibold'>1,02,890</h4>
              </div>
            </div>
            <div className='mt-4 flex justify-between'>
              <div className='text-green-500 font-semibold'>+40%</div>
              <div className='text-gray-500 text-xs'>This month</div>
            </div>
          </div>
        </div>
      </div>
      <div className='col-span-1 md:col-span-1 lg:col-span-1'>
        <div className='bg-white shadow-md rounded-md overflow-hidden transform transition-transform hover:scale-105'>
          <div className='p-4'>
            <div className='flex items-center'>
              <div className='bg-primary text-white rounded-full flex items-center justify-center h-10 w-10'>
                <Users className='text-lg' />
              </div>
              <div className='ml-4'>
                <p className='text-gray-500 text-[1rem]'> No of Panels</p>
                <h4 className='text-xl font-semibold'>1,02,890</h4>
              </div>
            </div>
            <div className='mt-4 flex justify-between'>
              <div className='text-green-500 font-semibold'>+40%</div>
              <div className='text-gray-500 text-xs'>This month</div>
            </div>
          </div>
        </div>
      </div>
      <div className='col-span-1 md:col-span-1 lg:col-span-1'>
        <div className='bg-white shadow-md rounded-md overflow-hidden transform transition-transform hover:scale-105'>
          <div className='p-4'>
            <div className='flex items-center'>
              <div className='bg-primary text-white rounded-full flex items-center justify-center h-10 w-10'>
                <Users className='text-lg' />
              </div>
              <div className='ml-4'>
                <p className='text-gray-500 text-[1rem]'> No of Tests</p>
                <h4 className='text-xl font-semibold'>1,02,890</h4>
              </div>
            </div>
            <div className='mt-4 flex justify-between'>
              <div className='text-green-500 font-semibold'>+40%</div>
              <div className='text-gray-500 text-xs'>This month</div>
            </div>
          </div>
        </div>
      </div>
      <div className='col-span-1 md:col-span-1 lg:col-span-1'>
        <div className='bg-white shadow-md rounded-md overflow-hidden transform transition-transform hover:scale-105'>
          <div className='p-4'>
            <div className='flex items-center'>
              <div className='bg-primary text-white rounded-full flex items-center justify-center h-10 w-10'>
                <Users className='text-lg' />
              </div>
              <div className='ml-4'>
                <p className='text-gray-500 text-[1rem]'>No of Analytes</p>
                <h4 className='text-xl font-semibold'>1,02,890</h4>
              </div>
            </div>
            <div className='mt-4 flex justify-between'>
              <div className='text-green-500 font-semibold'>+40%</div>
              <div className='text-gray-500 text-xs'>This month</div>
            </div>
          </div>
        </div>
      </div>
      <div className='col-span-1 md:col-span-1 lg:col-span-1'>
        <div className='bg-white shadow-md rounded-md overflow-hidden transform transition-transform hover:scale-105'>
          <div className='p-4'>
            <div className='flex items-center'>
              <div className='bg-primary text-white rounded-full flex items-center justify-center h-10 w-10'>
                <Users className='text-lg' />
              </div>
              <div className='ml-4'>
                <p className='text-gray-500 text-[1rem]'> Gross Sale</p>
                <h4 className='text-xl font-semibold'>1,02,890</h4>
              </div>
            </div>
            <div className='mt-4 flex justify-between'>
              <div className='text-green-500 font-semibold'>+40%</div>
              <div className='text-gray-500 text-xs'>This month</div>
            </div>
          </div>
        </div>
      </div>
      <div className='col-span-1 md:col-span-1 lg:col-span-1'>
        <div className='bg-white shadow-md rounded-md overflow-hidden transform transition-transform hover:scale-105'>
          <div className='p-4'>
            <div className='flex items-center'>
              <div className='bg-primary text-white rounded-full flex items-center justify-center h-10 w-10'>
                <Users className='text-lg' />
              </div>
              <div className='ml-4'>
                <p className='text-gray-500 text-[1rem]'>Net Sale</p>
                <h4 className='text-xl font-semibold'>1,02,890</h4>
              </div>
            </div>
            <div className='mt-4 flex justify-between'>
              <div className='text-green-500 font-semibold'>+40%</div>
              <div className='text-gray-500 text-xs'>This month</div>
            </div>
          </div>
        </div>
      </div>
      <div className='col-span-1 md:col-span-1 lg:col-span-1'>
        <div className='bg-white shadow-md rounded-md overflow-hidden transform transition-transform hover:scale-105'>
          <div className='p-4'>
            <div className='flex items-center'>
              <div className='bg-primary text-white rounded-full flex items-center justify-center h-10 w-10'>
                <Users className='text-lg' />
              </div>
              <div className='ml-4'>
                <p className='text-gray-500 text-[1rem]'>Discount</p>
                <h4 className='text-xl font-semibold'>1,02,890</h4>
              </div>
            </div>
            <div className='mt-4 flex justify-between'>
              <div className='text-green-500 font-semibold'>+40%</div>
              <div className='text-gray-500 text-xs'>This month</div>
            </div>
          </div>
        </div>
      </div>
      <div className='col-span-1 md:col-span-1 lg:col-span-1'>
        <div className='bg-white shadow-md rounded-md overflow-hidden transform transition-transform hover:scale-105'>
          <div className='p-4'>
            <div className='flex items-center'>
              <div className='bg-primary text-white rounded-full flex items-center justify-center h-10 w-10'>
                <Users className='text-lg' />
              </div>
              <div className='ml-4'>
                <p className='text-gray-500 text-[1rem]'>Discount %</p>
                <h4 className='text-xl font-semibold'>1,02,890</h4>
              </div>
            </div>
            <div className='mt-4 flex justify-between'>
              <div className='text-green-500 font-semibold'>+40%</div>
              <div className='text-gray-500 text-xs'>This month</div>
            </div>
          </div>
        </div>
      </div>
      <div className='col-span-1 md:col-span-1 lg:col-span-1'>
        <div className='bg-white shadow-md rounded-md overflow-hidden transform transition-transform hover:scale-105'>
          <div className='p-4'>
            <div className='flex items-center'>
              <div className='bg-primary text-white rounded-full flex items-center justify-center h-10 w-10'>
                <Users className='text-lg' />
              </div>
              <div className='ml-4'>
                <p className='text-gray-500 text-[.9rem]'>
                  Revenue Per/Patient
                </p>
                <h4 className='text-xl font-semibold'>1,02,890</h4>
              </div>
            </div>
            <div className='mt-4 flex justify-between'>
              <div className='text-green-500 font-semibold'>+40%</div>
              <div className='text-gray-500 text-xs'>This month</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Statistics;
