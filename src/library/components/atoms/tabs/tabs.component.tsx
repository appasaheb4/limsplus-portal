import React, {useState} from 'react';
import {Icons} from '@/library/components';

interface TabsProps {
  tabs: Array<any>;
  onClick: (item: string) => void;
}

export const Tabs = ({tabs, onClick}: TabsProps) => {
  const [selected, setSelected] = useState(tabs[0].title);
  return (
    <div className='flex mb-2'>
      <ul className='flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 cursor-pointer gap-1'>
        {tabs.map((item, index) => (
          <li key={index}>
            <div
              className={`inline-flex items-center justify-center p-3 border-b-2 gap-1 ${
                item.title === selected
                  ? 'text-blue-600  border-blue-600 active'
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300'
              }   `}
              onClick={() => {
                setSelected(item.title);
                onClick(item.title);
              }}
            >
              <Icons.RIcon nameIcon={item.icon} propsIcon={{size: 24}} />
              {item.title}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
