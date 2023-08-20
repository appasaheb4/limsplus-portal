import React from 'react';
import {Icons} from '@/library/components';

interface ManualImportTabsProps {
  isImport: boolean;
  onClick: (flag: boolean) => void;
}

export const ManualImportTabs = ({
  isImport,
  onClick,
}: ManualImportTabsProps) => {
  return (
    <div className='flex mb-2'>
      <ul className='flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 cursor-pointer gap-1'>
        <li>
          <div
            className={`inline-flex items-center justify-center p-3 border-b-2 gap-1 ${
              !isImport
                ? 'text-blue-600  border-blue-600 active'
                : 'border-transparent hover:text-gray-600 hover:border-gray-300'
            }   `}
            onClick={() => onClick(false)}
          >
            <Icons.RIcon
              nameIcon='AiOutlineUnorderedList'
              propsIcon={{size: 24}}
            />
            Manual
          </div>
        </li>
        <li>
          <div
            className={`inline-flex items-center justify-center p-3 border-b-2 gap-1 ${
              isImport
                ? 'text-blue-600  border-blue-600 active'
                : 'border-transparent hover:text-gray-600 hover:border-gray-300'
            }`}
            onClick={() => onClick(true)}
          >
            <Icons.RIcon nameIcon='CiImport' propsIcon={{size: 24}} />
            Import
          </div>
        </li>
      </ul>
    </div>
  );
};
