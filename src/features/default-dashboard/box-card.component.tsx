import React from 'react';

const BoxCard = () => {
  return (
    <div className='grid grid-cols-3 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 mb-4'>
      <div className='relative mb-4 bg-gradient-to-br from-blue-200 to-blue-300 flex flex-col rounded-lg  text-gray-700 text-sm shadow-md transition-transform transform hover:scale-105'>
        <div className='flex flex-wrap items-center gap-1 border-t-2 border-b border-gray-300 rounded-t-lg px-4 py-3 font-semibold'>
          <div className='text-lg font-bold'>REGISTRATIONS </div>
        </div>
        <div className='px-4'>
          <ul className='list-none mt-2'>
            <li className='mb-4 border-b border-gray-300'>
              <div className='flex items-center justify-between'>
                <p className='font-semibold text-sm'>PATIENTS</p>
                <p className='font-semibold text-sm'>₹2,893</p>
              </div>
            </li>
            <li className='mb-4 border-b border-gray-300'>
              <div className='flex items-center justify-between'>
                <p className='font-semibold text-sm'>SAMPLES</p>
                <p className='font-semibold text-sm'>₹4,289</p>
              </div>
            </li>
            <li className='mb-4 border-b border-gray-300'>
              <div className='flex items-center justify-between'>
                <p className='font-semibold text-sm'>PANELS</p>
                <p className='font-semibold text-sm'>₹6,347</p>
              </div>
            </li>
            <li className='mb-4 border-b border-gray-300'>
              <div className='flex items-center justify-between'>
                <p className='font-semibold text-sm'>TESTS</p>
                <p className='font-semibold text-sm'>₹3,894</p>
              </div>
            </li>
            <li className='mb-4 border-b border-gray-300'>
              <div className='flex items-center justify-between'>
                <p className='font-semibold text-sm'>ANALYTES</p>
                <p className='font-semibold text-sm'>₹2,679</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className='relative mb-4 flex flex-col rounded-lg bg-green-200 text-gray-700 text-sm shadow-md transition-transform transform hover:scale-105'>
        <div className='flex flex-wrap items-center gap-1 border-t-2 border-b border-gray-300 rounded-t-lg px-4 py-3 font-semibold'>
          <div className='text-lg font-bold'>ACCESSIONING</div>
        </div>
        <div className='px-4'>
          <ul className='list-none mt-2'>
            <li className='mb-4 border-b border-gray-300'>
              <div className='flex items-center justify-between'>
                <p className='font-semibold text-sm'>DUE</p>
                <p className='font-semibold text-sm'>₹2,893</p>
              </div>
            </li>
            <li className='mb-4 border-b border-gray-300'>
              <div className='flex items-center justify-between'>
                <p className='font-semibold text-sm'>RECEIVED</p>
                <p className='font-semibold text-sm'>₹4,289</p>
              </div>
            </li>
            <li className='mb-4 border-b border-gray-300'>
              <div className='flex items-center justify-between'>
                <p className='font-semibold text-sm'>NOT RECEIVED</p>
                <p className='font-semibold text-sm'>₹6,347</p>
              </div>
            </li>
            <li className='mb-4 border-b border-gray-300'>
              <div className='flex items-center justify-between'>
                <p className='font-semibold text-sm'>DONE</p>
                <p className='font-semibold text-sm'>₹3,894</p>
              </div>
            </li>
            <li className='mb-4 border-b border-gray-300'>
              <div className='flex items-center justify-between'>
                <p className='font-semibold text-sm'>PENDING</p>
                <p className='font-semibold text-sm'>₹2,679</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className='relative mb-4 flex flex-col rounded-lg bg-yellow-200 text-gray-700 text-sm shadow-md transition-transform transform hover:scale-105'>
        <div className='flex flex-wrap items-center gap-1 border-t-2 border-b border-gray-300 rounded-t-lg px-4 py-3 font-semibold'>
          <div className='text-lg font-bold'>DEPARTMENTS</div>
        </div>
        <div className='px-4'>
          <ul className='list-none mt-2'>
            <li className='mb-4 border-b border-gray-300'>
              <div className='flex items-center justify-between'>
                <p className='font-semibold text-sm'>DUE</p>
                <p className='font-semibold text-sm'>₹2,893</p>
              </div>
            </li>
            <li className='mb-4 border-b border-gray-300'>
              <div className='flex items-center justify-between'>
                <p className='font-semibold text-sm'>RECEIVED</p>
                <p className='font-semibold text-sm'>₹4,289</p>
              </div>
            </li>
            <li className='mb-4 border-b border-gray-300'>
              <div className='flex items-center justify-between'>
                <p className='font-semibold text-sm'>NOT RECEIVED</p>
                <p className='font-semibold text-sm'>₹6,347</p>
              </div>
            </li>
            <li className='mb-4 border-b border-gray-300'>
              <div className='flex items-center justify-between'>
                <p className='font-semibold text-sm'>DONE</p>
                <p className='font-semibold text-sm'>₹3,894</p>
              </div>
            </li>
            <li className='mb-4 border-b border-gray-300'>
              <div className='flex items-center justify-between'>
                <p className='font-semibold text-sm'>PENDING</p>
                <p className='font-semibold text-sm'>₹2,679</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className='relative mb-4 flex flex-col rounded-lg bg-pink-200 text-gray-700 text-sm shadow-md transition-transform transform hover:scale-105'>
        <div className='flex flex-wrap items-center gap-1 border-t-2 border-b border-gray-300 rounded-t-lg px-4 py-3 font-semibold'>
          <div className='text-lg font-bold'>PANEL APPROVAL</div>
        </div>
        <div className='px-4'>
          <ul className='list-none mt-2'>
            <li className='mb-4 border-b border-gray-300'>
              <div className='flex items-center justify-between'>
                <p className='font-semibold text-sm'>DUE</p>
                <p className='font-semibold text-sm'>₹2,893</p>
              </div>
            </li>
            <li className='mb-4 border-b border-gray-300'>
              <div className='flex items-center justify-between'>
                <p className='font-semibold text-sm'>RECEIVED</p>
                <p className='font-semibold text-sm'>₹4,289</p>
              </div>
            </li>
            <li className='mb-4 border-b border-gray-300'>
              <div className='flex items-center justify-between'>
                <p className='font-semibold text-sm'>NOT RECEIVED</p>
                <p className='font-semibold text-sm'>₹6,347</p>
              </div>
            </li>
            <li className='mb-4 border-b border-gray-300'>
              <div className='flex items-center justify-between'>
                <p className='font-semibold text-sm'>DONE</p>
                <p className='font-semibold text-sm'>₹3,894</p>
              </div>
            </li>
            <li className='mb-4 border-b border-gray-300'>
              <div className='flex items-center justify-between'>
                <p className='font-semibold text-sm'>PENDING</p>
                <p className='font-semibold text-sm'>₹2,679</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className='relative mb-4 flex flex-col rounded-lg bg-purple-200 text-gray-700 text-sm shadow-md transition-transform transform hover:scale-105'>
        <div className='flex flex-wrap items-center gap-1 border-t-2 border-b border-gray-300 rounded-t-lg px-4 py-3 font-semibold'>
          <div className='text-lg font-bold'>DELIVERY QUEUE</div>
        </div>
        <div className='px-4'>
          <ul className='list-none mt-2'>
            <li className='mb-4 border-b border-gray-300'>
              <div className='flex items-center justify-between'>
                <p className='font-semibold text-sm'>DUE</p>
                <p className='font-semibold text-sm'>₹2,893</p>
              </div>
            </li>
            <li className='mb-4 border-b border-gray-300'>
              <div className='flex items-center justify-between'>
                <p className='font-semibold text-sm'>RECEIVED</p>
                <p className='font-semibold text-sm'>₹4,289</p>
              </div>
            </li>
            <li className='mb-4 border-b border-gray-300'>
              <div className='flex items-center justify-between'>
                <p className='font-semibold text-sm'>NOT RECEIVED</p>
                <p className='font-semibold text-sm'>₹6,347</p>
              </div>
            </li>
            <li className='mb-4 border-b border-gray-300'>
              <div className='flex items-center justify-between'>
                <p className='font-semibold text-sm'>DONE</p>
                <p className='font-semibold text-sm'>₹3,894</p>
              </div>
            </li>
            <li className='mb-4 border-b border-gray-300'>
              <div className='flex items-center justify-between'>
                <p className='font-semibold text-sm'>PENDING</p>
                <p className='font-semibold text-sm'>₹2,679</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BoxCard;
