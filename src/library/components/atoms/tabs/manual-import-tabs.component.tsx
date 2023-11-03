import React from 'react';
import { Icons } from '@/library/components';

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
      <ul className='flex flex-wrap -mb-px text-sm font-medium text-center  cursor-pointer gap-1'>
        <li>
          <div
            className={`inline-flex items-center justify-center p-3 border-b-2 gap-1 ${
              !isImport
                ? 'dark:border-white active'
                : 'border-transparent hover:text-[#27A4FE] hover:border-gray-300'
            }   `}
            onClick={() => onClick(false)}
          >
            <Icons.RIcon
              nameIcon='AiOutlineUnorderedList'
              propsIcon={{ size: 24 }}
            />
            Manual Entry
          </div>
        </li>
        <li>
          <div
            className={`inline-flex items-center justify-center p-3 border-b-2 gap-1 ${
              isImport
                ? 'dark:border-white active'
                : 'border-transparent hover:text-[#27A4FE] hover:border-gray-300'
            }`}
            onClick={() => onClick(true)}
          >
            <Icons.RIcon nameIcon='CiImport' propsIcon={{ size: 24 }} />
            Import from file
          </div>
        </li>
      </ul>
    </div>
  );
};
