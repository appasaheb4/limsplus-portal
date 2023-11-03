import React, { useState } from 'react';
import { Icons } from '@/library/components';

interface TabsProps {
  tabs: Array<any>;
  onClick: (item: string) => void;
}

export const Tabs = ({ tabs, onClick }: TabsProps) => {
  const [selected, setSelected] = useState(tabs[0].title);
  return (
    <div className='flex mb-2'>
      <ul className='flex flex-wrap -mb-px text-sm font-medium text-center  cursor-pointer gap-1'>
        {tabs.map((item, index) => (
          <li key={index}>
            <div
              className={`inline-flex items-center justify-center p-3 border-b-2 gap-1 ${
                item.title === selected
                  ? 'dark:border-white active'
                  : 'border-transparent hover:text-[#27A4FE] hover:border-gray-300'
              }   `}
              onClick={() => {
                setSelected(item.title);
                onClick(item.title);
              }}
            >
              <Icons.RIcon nameIcon={item.icon} propsIcon={{ size: 24 }} />
              <span>{item.title}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
