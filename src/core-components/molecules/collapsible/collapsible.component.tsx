import React, {useState} from 'react';

interface CollapsibleProps {
  label: string;
  children: React.ReactNode;
}
export const Collapsible = ({label, children}: CollapsibleProps) => {
  const [open, setOPen] = useState(false);

  const toggle = () => {
    setOPen(!open);
  };
  return (
    <div className='flex flex-col'>
      <button
        className='
        flex
        items-center
        w-full
        p-1
        my-1
        text-base
         text-white
          text-left
        bg-gray-400
        border-0
        transition
        focus:outline-none
        rounded-sm
      '
        type='button'
        onClick={toggle}
      >
        {label?.toUpperCase()}
      </button>
      {open && <div className='p-2 bg-gray-300 -my-3 mb-1'>{children}</div>}
    </div>
  );
};
