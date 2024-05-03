import React from 'react';

const BoxCard = () => {
  const data = [
    {
      name: 'REGISTRATIONS',
      color: 'green',
      detail: [
        { name: 'PATIENTS', price: '₹2,893' },
        { name: 'SAMPLES', price: '₹2,893' },
        { name: 'PANELS', price: '₹2,893' },
        { name: 'TESTS', price: '₹2,893' },
        { name: 'ANALYTES', price: '₹2,893' },
      ],
    },
    {
      name: 'ACCESSIONING',
      color: 'purple',
      detail: [
        { name: 'DUE', price: '₹2,893' },
        { name: 'RECEIVED', price: '₹2,893' },
        { name: 'NOT RECEIVED', price: '₹2,893' },
        { name: 'DONE', price: '₹2,893' },
        { name: 'PENDING', price: '₹2,893' },
      ],
    },
    {
      name: 'DEPARTMENTS',
      color: 'yellow',
      detail: [
        { name: 'DUE', price: '₹2,893' },
        { name: 'RECEIVED', price: '₹2,893' },
        { name: 'NOT RECEIVED', price: '₹2,893' },
        { name: 'DONE', price: '₹2,893' },
        { name: 'PENDING', price: '₹2,893' },
      ],
    },
    {
      name: 'PANEL APPROVAL',
      color: 'pink',
      detail: [
        { name: 'DUE', price: '₹2,893' },
        { name: 'RECEIVED', price: '₹2,893' },
        { name: 'NOT RECEIVED', price: '₹2,893' },
        { name: 'DONE', price: '₹2,893' },
        { name: 'PENDING', price: '₹2,893' },
      ],
    },
    {
      name: 'DELIVERY QUEUE',
      color: 'gray',
      detail: [
        { name: 'DUE', price: '₹2,893' },
        { name: 'RECEIVED', price: '₹2,893' },
        { name: 'NOT RECEIVED', price: '₹2,893' },
        { name: 'DONE', price: '₹2,893' },
        { name: 'PENDING', price: '₹2,893' },
      ],
    },
  ];
  return (
    <div className='grid grid-cols-3 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 mb-4'>
      {data.map((item, index) => (
        <div
          key={index}
          className={`relative mb-4 flex flex-col rounded-lg bg-${item.color}-200 text-gray-700 text-sm shadow-md transition-transform transform hover:scale-105`}
        >
          <div className='flex flex-wrap items-center gap-1 border-t-2 border-b border-gray-300 rounded-t-lg px-4 py-3 font-semibold'>
            <div className='text-lg font-bold'>{item.name}</div>
          </div>

          <div className='px-4'>
            <ul className='list-none mt-2'>
              {item.detail.map((val: any, _: number) => (
                <li className='mb-4 border-b border-gray-300' key={_}>
                  <div className='flex items-center justify-between'>
                    <p className='font-semibold text-sm'>{val.name}</p>
                    <p className='font-semibold text-sm'>{val.price}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(BoxCard);
