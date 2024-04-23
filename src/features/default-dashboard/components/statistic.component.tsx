import React from 'react';
import { observer } from 'mobx-react';

import { ArrowUp, Users } from 'react-feather';
import { useStores } from '@/stores';

const Statistics = observer(() => {
  const data = [
    {
      name: 'No of Patients',
      price: '1,02,890',
      percentage: '+40%',
      filterValue: 'This month',
    },
    {
      name: 'No of Sample',
      price: '1,02,890',
      percentage: '+40%',
      filterValue: 'This month',
    },
    {
      name: 'No of Panels',
      price: '1,02,890',
      percentage: '+40%',
      filterValue: 'This month',
    },
    {
      name: 'No of Tests',
      price: '1,02,890',
      percentage: '+40%',
      filterValue: 'This month',
    },
    {
      name: 'No of Analytes',
      price: '1,02,890',
      percentage: '+40%',
      filterValue: 'This month',
    },
    {
      name: 'Gross Sale',
      price: '1,02,890',
      percentage: '+40%',
      filterValue: 'This month',
    },
    {
      name: 'Net Sale',
      price: '1,02,890',
      percentage: '+40%',
      filterValue: 'This month',
    },
    {
      name: 'Discount',
      price: '1,02,890',
      percentage: '+40%',
      filterValue: 'This month',
    },
    {
      name: 'Discount %',
      price: '1,02,890',
      percentage: '+40%',
      filterValue: 'This month',
    },
    {
      name: 'Revenue Per/Patient',
      price: '1,02,890',
      percentage: '+40%',
      filterValue: 'This month',
    },
  ];
  return (
    <div className='grid grid-cols-3 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 mb-4'>
      {data.map((item, index) => (
        <div className='col-span-1 md:col-span-1 lg:col-span-1' key={index}>
          <div className='bg-white shadow-md rounded-md overflow-hidden transform transition-transform hover:scale-105'>
            <div className='p-4'>
              <div className='flex items-center'>
                <div>
                  <p className='text-gray-500 text-[1rem]'>{item.name}</p>
                  <h4 className='text-xl font-semibold'>{item.price}</h4>
                </div>
              </div>
              <div className='mt-4 flex justify-between'>
                <div className='text-green-500 font-semibold'>
                  {item.percentage}
                </div>
                <div className='text-gray-500 text-xs'>{item.filterValue}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

export default Statistics;
